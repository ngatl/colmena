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


module.exports = function(ConferenceAttendee) {

  disabledMethods.forEach(method => ConferenceAttendee.disableRemoteMethodByName(method))

  ConferenceAttendee.isSponsor = item => item.tags ? (item.tags.indexOf('sponsor') > -1) : false

};
