'use strict';

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


const normalize = item => {
  const id = item.id;

  return Object.assign({} , { id }, item.attributes)
};

module.exports = function(ConferenceRelease) {

  disabledMethods.forEach(method => ConferenceRelease.disableRemoteMethodByName(method))

  ConferenceRelease.sync = () => ConferenceRelease.app.models.TitoApi.releases()
    .then(res => res[0])
    .then(res => Promise.all(res.map(release => ConferenceRelease.upsert(normalize(release)))))
    .then(res => ({ count: res.length }))
    .catch(err => console.log(err))

  ConferenceRelease.remoteMethod('sync', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/sync', verb: 'get' },
  })

};
