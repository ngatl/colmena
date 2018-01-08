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

};
