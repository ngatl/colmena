const axios = require('axios')
const crypto = require('crypto')

const gravatar = require('./gravatar')

const baseUrl = 'https://graph.facebook.com'

const fields = [
  'id',
  'first_name',
  'last_name',
  'picture',
  'email',
]

const api = (path, token, params = '') => `${baseUrl}/${path}?access_token=${token}${params}`

const normalize = profile => ({
  externalId: profile.id,
  externalType: 'facebook',
  email: profile.email,
  firstName: profile.first_name,
  lastName: profile.last_name,
  avatar: profile.picture.data.is_silhouette ? gravatar(profile.email) : profile.picture.data.url,
  password: crypto.randomBytes(32).toString('hex'),
})

const login = token => {
  console.log('token', token)
  return axios
    .get(api('me', token, `&fields=${fields.join(',')}`))
    .then(res => normalize(res.data))
    .catch(err => {
      console.log('Facebook Auth error:')
      console.log(err)
      return Promise.reject(err.response.data.error)
    })
}

module.exports = {
  login,
}
