const puppeteer = require('puppeteer-core')
const utils = require('./utils')

async function start (profile) {
  await utils.checkBrowser()

  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
    userDataDir: `./profiles/${profile}`,
    executablePath: utils.execPath(),
    defaultViewport: null
  })

  browser.on('targetcreated', async target => {
    const p = await (target.page())
    if (p) p.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.82 Safari/537.36')
  })
}

module.exports = { start }