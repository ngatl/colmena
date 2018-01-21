'use strict';

module.exports = function(ConferenceAttendee) {

  ConferenceAttendee.isSponsor = item => item.tags ? (item.tags.indexOf('sponsor') > -1) : false

  ConferenceAttendee.observe('before save', (ctx, next) => {
    if (ctx.instance && !ctx.instance.username && ctx.instance.email) {
      ctx.instance.username = ctx.instance.email
    }
    next()
  })

  ConferenceAttendee.prototype.sponsorNotes = function() {
    const notesArray = []
    const condition = {
      include: {
        relation: 'notes',
        scope: {
          include: [
            { relation: 'peer' },
            { relation: 'attendee' },
          ]
        }
      },
      where: {
        sponsor: this.sponsor
      }
    }

    const extractNotes = (notes = []) => notes.forEach(note => notesArray.push(note))

    const getNotes = () => ConferenceAttendee.find(condition)
      .then(attendees => attendees.forEach(attendee => extractNotes(attendee.notes())))
      .then(() => notesArray)

    return this.sponsor ? getNotes() : Promise.reject(new Error('Attendee is not in a Sponsor Group'))
  }

  ConferenceAttendee.remoteMethod('prototype.sponsorNotes', {
    returns: { arg: 'result', type: 'object', root: true },
    http: { path: '/sponsorNotes', verb: 'get' },
  })

};
