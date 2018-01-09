'use strict';
const { get }  = require('lodash')

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
];

const lastPart = (str) => str.split('/').slice('-1')[0]

const normalize = ticket => {
  const id = ticket.id
  const conferenceRegistrationId = lastPart(get(ticket, 'relationships.registration.links.related'));
  const conferenceReleaseId = lastPart(get(ticket, 'relationships.release.links.related'));

  return Object.assign({} , { id, conferenceRegistrationId, conferenceReleaseId }, ticket.attributes)
}

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

  const findOrCreate = attendee => {
    const { ConferenceAttendee } = ConferenceTicket.app.models;

    return ConferenceAttendee
      .findOne({where: {email: attendee.email}})
      .then(res => res ? res : ConferenceAttendee.create(attendee))
  }

  const normalizeAttendee = att => ({
    company: att['company-name'],
    email: att.email,
    name: att.name,
    phone: att['phone-number'],
  })

  ConferenceTicket.prototype.extract = function() {
    return Promise.resolve(findOrCreate(normalizeAttendee(this)))
      .then(attendee => {
        this.updateAttribute('conferenceAttendeeId', attendee.id)
        return attendee
      })
  }

  ConferenceTicket.remoteMethod('prototype.extract', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/extract', verb: 'get' },
  })


  ConferenceTicket.extractAll = () => ConferenceTicket
    .find()
    .then(items => items
      .filter(item => item.email)
      .map(item => item.extract())
    )

  ConferenceTicket.remoteMethod('extractAll', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/extractAll', verb: 'get' },
  })

  ConferenceTicket.prototype.claim = function(confirm) {
    const { ConferenceAttendee } = ConferenceTicket.app.models;
    return ConferenceAttendee.findById(this.conferenceAttendeeId)
      .then(attendee => {
        if (!confirm || this.claimed ) {
          return Promise.resolve({ claimed: this.claimed || false, confirm, attendee, newClaim: false })
        }
        return this.updateAttribute('claimed', new Date())
          .then(() => Promise.resolve({ claimed: this.claimed, confirm, attendee, newClaim: true }))
      })
  }

  ConferenceTicket.remoteMethod('prototype.claim', {
    accepts: { arg: 'confirm', type: 'boolean', required: false },
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/claim', verb: 'get' },
  })

};
