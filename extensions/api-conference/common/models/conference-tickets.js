'use strict'
const { get } = require('lodash')
const CryptoJS = require('crypto-js')
const config = require('config')
const Promise = require('bluebird')

const disabledMethods = [
  'create',
  'createChangeStream',
  'deleteById',
  'exists',
  'findOne',
  'patchOrCreate',

  'prototype.patchAttributes',
  'prototype.exists',

  'replaceById',
  'replaceOrCreate',
  'update',
  'upsert',
  'upsertWithWhere',
]

const lastPart = (str) => str.split('/').slice('-1')[0]

const generatePin = (input) => {
  let generated = Math.pow(input, 5)
  generated = generated.toString().replace(/0/g, 9).substring(3, 7)
  return parseInt(generated, 10)
}

const normalize = ticket => {
  const id = ticket.id
  const conferenceRegistrationId = lastPart(get(ticket, 'relationships.registration.links.related'))
  const conferenceReleaseId = lastPart(get(ticket, 'relationships.release.links.related'))
  if (conferenceReleaseId && conferenceReleaseId === 'pribzn5zfui') {
    ticket.attributes.email = 'sponsor@ng-atl.org'
    ticket.attributes.pin = generatePin(ticket.attributes.number)
  }
  const result = Object.assign({}, { id, conferenceRegistrationId, conferenceReleaseId }, ticket.attributes)
  return result
}

const getHash = id => CryptoJS.SHA256( id + config.get('ngatl.salt') ).toString()

module.exports = function(ConferenceTicket) {

  disabledMethods.forEach(method => ConferenceTicket.disableRemoteMethodByName(method))

  ConferenceTicket.sync = () => ConferenceTicket.app.models.TitoApi.tickets()
    .then(res => res[0])
    .then(res => Promise.all(res.map(ticket => ConferenceTicket.upsert(normalize(ticket)))))
    .then(res => ({ count: res.length }))
    .catch(err => console.log(err))

  ConferenceTicket.remoteMethod('sync', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/sync', verb: 'get' },
  })

  const findOrCreate = attendee => ConferenceTicket.app.models.ConferenceAttendee
    .upsertWithWhere({ email: attendee.email }, attendee)
    .catch(err => console.log('findOrCreate err', err))

  const normalizeAttendee = att => ({
    company: att['company-name'],
    email: att.email.toLowerCase(),
    name: att.name,
    tags: att.tags,
    pin: att.pin,
    phone: att['phone-number'],
  })

  const createAccessToken = attendee => {
    const token = {
      id: getHash(attendee.id),
      userId: attendee.id,
      principalType: 'ConferenceAttendee',
      ttl: -1,
    }
    return ConferenceTicket.app.models.SystemAccessToken
      .upsert(token)
      .then((token) => {
        attendee['token'] = token
        return attendee
      })
  }

  ConferenceTicket.prototype.extract = function() {
    return findOrCreate(normalizeAttendee(this))
      .then(attendee => {
        this.updateAttribute('conferenceAttendeeId', attendee.id)
        return attendee
      })
      .then(attendee => createAccessToken(attendee))
      .catch(err => console.log('extract err', err))
  }

  ConferenceTicket.remoteMethod('prototype.extract', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/extract', verb: 'get' },
  })


  ConferenceTicket.extractAll = () => ConferenceTicket
    .find()
    .then(items => items
      .filter(item => item.email)
    )
    .then(items => Promise.each(items, item => item.extract()))

  ConferenceTicket.remoteMethod('extractAll', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/extractAll', verb: 'get' },
  })

  ConferenceTicket.prototype.claim = function(confirm) {
    const { ConferenceAttendee } = ConferenceTicket.app.models
    return ConferenceAttendee.findById(this.conferenceAttendeeId)
      .then(attendee => {
        if (confirm && confirm !== getHash(attendee.id)) {
          return Promise.reject('Confirmation code failed!')
        }
        if (!confirm || this.claimed) {
          return Promise.resolve({ claimed: this.claimed || false, confirm, attendee, newClaim: false })
        }
        return this.updateAttribute('claimed', new Date())
          .then(() => Promise.resolve({ claimed: this.claimed, confirm, attendee, newClaim: true }))
      })
  }

  ConferenceTicket.remoteMethod('prototype.claim', {
    accepts: { arg: 'confirm', type: 'string', required: false },
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/claim', verb: 'get' },
  })

  ConferenceTicket.prototype.unclaim = function() {
    const { ConferenceAttendee } = ConferenceTicket.app.models
    return ConferenceAttendee.findById(this.conferenceAttendeeId)
      .then(attendee => {
        return this.updateAttribute('claimed', false)
          .then(() => Promise.resolve({ claimed: this.claimed, attendee, unClaimed: true }))
      })
  }

  ConferenceTicket.remoteMethod('prototype.unclaim', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/unclaim', verb: 'get' },
  })

}
