const store = require('data-store')({ path: process.cwd() + '/config.json' })

function getProxySettings () {
  if (store.get("proxy")) { // Bool, indicates if proxy is enabled by config
    
  }
}

module.exports = {
  getProxySettings
}