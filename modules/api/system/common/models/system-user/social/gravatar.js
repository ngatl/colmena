const crypto = require('crypto')

const gravatarUrl = 'http://www.gravatar.com/avatar/'
const gravatarSize = 170
const md5 = str => crypto.createHash('md5').update(str).digest('hex')
const gravatar = email => email ? `${gravatarUrl}${md5(email)}?s=${gravatarSize}` : ''

module.exports = gravatar
