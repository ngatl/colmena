'use strict'

const handler = require('./social/facebook')

module.exports = function modelFnSystemUser(SystemUser) {

  // Create a token for this userId and convert it to a plain object
  const createToken = userId => SystemUser.app.models.SystemAccessToken
    .create({ userId })
    .then(token => token.toObject())

  // Create an access token and merge it with the User object
  const loginUser = user => createToken(user.id)
    .then(token => Object.assign({}, token, { user }))

  const addSystemUserRole = user => user
    .addRole('system-user')
    .then(() => user)


  // Custom findOrCreate method because the LoopBack internal one does not work as expected
  const findOrCreate = profile => SystemUser
    .findOne({where: {email: profile.email}})
    .then(res => res ? res : SystemUser.create(profile))
    .then(user => addSystemUserRole(user))

  SystemUser.loginFacebook = (token) => handler.login(token)
    .then(profile => findOrCreate(profile))
    .then(user => loginUser(user))

  // Enable the Login method for each of the Auth Providers
  SystemUser.remoteMethod('loginFacebook', {
    description: 'Login to the API in using the Facebook Authentication Provider',
    accepts: [ { arg: 'token', type: 'string', required: true } ],
    returns: { arg: 'result', type: 'object', root: true },
    http: { verb: 'get' },
  })

}
