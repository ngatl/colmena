'use strict';

module.exports = function(ConferenceAttendee) {

  ConferenceAttendee.isSponsor = item => item.tags ? (item.tags.indexOf('sponsor') > -1) : false

  ConferenceAttendee.observe('before save', (ctx, next) => {
    if (ctx.instance && !ctx.instance.username && ctx.instance.email) {
      ctx.instance.username = ctx.instance.email
    }
    next()
  })
};
