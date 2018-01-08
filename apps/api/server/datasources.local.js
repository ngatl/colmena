'use strict'
const config = require('config')
const log = require('@colmena/logger')

const datasources = {}

if (config.has('mongodb') && config.get('mongodb.url')) {
  log.magenta.b('[data-sources] Configure MongoDB')
  datasources['db'] = {
    name: 'db',
    connector: 'mongodb',
    url: config.get('mongodb.url'),
  }
}

if (config.has('smtp') && config.get('smtp.host') && config.get('smtp.port')) {
  log.magenta.b('[data-sources] Configure SMTP')
  datasources['mail'] = {
    connector: 'mail',
    transports: [
      {
        type: 'smtp',
        host: config.get('smtp.host'),
        port: config.get('smtp.port'),
      },
    ],
  }
}

if (config.has('storage') && config.get('storage.path')) {
  log.magenta.b('[data-sources] Configure Storage')
  datasources['storage'] = {
    name: 'storage',
    connector: 'loopback-component-storage',
    provider: 'filesystem',
    root: config.get('storage.path'),
  }
}

if (config.has('tito') && config.get('tito.token')) {
  log.magenta.b('[data-sources] Configure Tito API')
  datasources['tito'] = {
    name: 'tito',
    connector: 'rest',
    crud: false,
    debug: true,
    options: {
      headers: {
        Accept: 'application/vnd.api+json',
        Authorization: `Token token=${config.get('tito.token')}`
      },
    },
    operations: [{
      template: {
        method: 'GET',
        url: `https://api.tito.io/v2/${config.get('tito.account')}/${config.get('tito.event')}/tickets`,
        responsePath: '$.data',
      },
      functions: {
        tickets: []
      }
    }, {
      template: {
        method: 'GET',
        url: `https://api.tito.io/v2/${config.get('tito.account')}/${config.get('tito.event')}/registrations`,
        responsePath: '$.data',
      },
      functions: {
        registrations: []
      }
    }, {
      template: {
        method: 'GET',
        url: `https://api.tito.io/v2/${config.get('tito.account')}/${config.get('tito.event')}/releases`,
        responsePath: '$.data',
      },
      functions: {
        releases: []
      }
    }]
  }
}

module.exports = datasources
