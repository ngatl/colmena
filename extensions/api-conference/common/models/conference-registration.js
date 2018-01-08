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

const normalize = item => {
  const id = item.id
  const conferenceTicketId = lastPart(get(item, 'relationships.tickets.links.related'));

  return Object.assign({} , { id, conferenceTicketId}, item.attributes)
}


module.exports = function(ConferenceRegistration) {

  disabledMethods.forEach(method => ConferenceRegistration.disableRemoteMethodByName(method))

  ConferenceRegistration.sync = () => ConferenceRegistration.app.models.TitoApi.registrations()
    .then(res => res[0])
    .then(res => Promise.all(res.map(registration => ConferenceRegistration.upsert(normalize(registration)))))
    .then(res => ({ count: res.length }))
    .catch(err => console.log(err))

  ConferenceRegistration.remoteMethod('sync', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/sync', verb: 'get' },
  })

};
