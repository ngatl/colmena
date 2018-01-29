const Promise = require('bluebird')

const config = require('config')
const log = require('@colmena/logger')
const path = require('path')
const prequire = require('parent-require')

const parentRequire = moduleName => prequire(moduleName)

const getModuleList = () => config.get('colmena.modules')
const getActiveModules = () =>
  Object.keys(getModuleList()).filter(module => getModuleList()[module])
const getModules = () => getActiveModules()

/**
 * Clear all data.
 *
 * @return {Promise} Returns a promise that resolves once all data has been removed.
 */
const dbMigrate = db => {
  log.gray('[db-migrate] Starting')
  return db
    .automigrate()
    .then(() => log.gray('[db-migrate] Finished'))
    .catch(err => {
      log.red.b('[db-migrate] Failed', err)
      throw err
    })
}

/**
 * Update database schemas.
 *
 * @return {Promise} Returns a promise that resolves once the database schema has been updated.
 */
const dbUpdate = db => {
  log.gray('[db-update] Starting')
  return db
    .autoupdate()
    .then(() => log.gray('[db-update] Finished'))
    .catch(err => {
      log.red.b('[db-update] Failed', err)
      throw err
    })
}

const getAppConfigs = () =>
  getModules().map(moduleName => parentRequire(moduleName))

const getAppFileList = prop =>
  getAppConfigs()
    .filter(app => app[prop])
    .map(app => app[prop].map(file => `${app.name}/${file}`))
    .reduce((res, item) => res.concat(item), [])

const loadModulePath = (moduleName, file) => path.join(moduleName, file)

const loadModules = config => {
  getModules().forEach(moduleName => {
    const module = parentRequire(moduleName)
    log.white.b(
      `[loopback-modules] Registering models from module: ${moduleName}`
    )

    if (module.models) {
      config = Object.assign(config, module.models)
    }

    if (module.modelSources) {
      config['_meta']['sources'] = [
        ...config['_meta']['sources'],
        ...module.modelSources.map(item => loadModulePath(moduleName, item)),
      ]
    }
    if (module.mixinSources) {
      config['_meta']['mixins'] = [
        ...config['_meta']['mixins'],
        ...module.mixinSources.map(item => loadModulePath(moduleName, item)),
      ]
    }
  })

  return config
}

const getDomain = (app, domain) => app.models.SystemDomain.findById('default')

const importDomainFileByUrl = (domain, url, fileName) =>
  domain
    .importFileByUrl(url, fileName)
    .then(() => log.gray('[sample-files]', `Import url ${url}`))

const importSampleFileSet = (app, set) => {
  const importToDomain = (domainName, files) =>
    getDomain(app, domainName).then(domain =>
      files.map(file => importDomainFileByUrl(domain, file.url, file.fileName))
    )

  const domains = Object.keys(set)
  const promises = domains.map(domainName => {
    const files = set[domainName]
    log.gray('[sample-files]', `${files.length} files for domain`, domainName)

    return importToDomain(domainName, files)
  })
  return Promise.all(promises)
}

const importDataIntoModel = (Model, data) =>
  Model.create(data)
    .then(res =>
      log.gray('[sample-data]', `${res.length} items for model`, Model.name)
    )
    .catch(err => {
      log.red('[sample-data]', err)
    })

const importSampleDataSet = (app, set) =>
  Promise.all(
    Object.keys(set).map(modelName => {
      const Model = app.models[modelName]
      if (Model) {
        return importDataIntoModel(Model, set[modelName])
      }
      log.warn(`Model ${modelName} does not exist. Skipping import.`)
    })
  )

const importSampleData = app =>
  Promise.resolve(getAppFileList('sampleData'))
    .then(items => items.map(item => parentRequire(item)))
    .then(sets => Promise.each(sets, set => importSampleDataSet(app, set)))

const importSampleFiles = app =>
  Promise.resolve(getAppFileList('sampleFiles'))
    .then(items => items.map(item => parentRequire(item)))
    .then(sets => Promise.each(sets, set => importSampleFileSet(app, set)))

module.exports = {
  dbMigrate,
  dbUpdate,
  getAppConfigs,
  getAppFileList,
  getModules,
  importSampleData,
  importSampleFiles,
  loadModules,
}
