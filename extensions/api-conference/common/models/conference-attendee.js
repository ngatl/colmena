'use strict';

module.exports = function(ConferenceAttendee) {

  ConferenceAttendee.isSponsor = item => item.tags ? (item.tags.indexOf('sponsor') > -1) : false

};
