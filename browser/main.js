const puppeteer = require('puppeteer-core')
const store = require('data-store')({ path: process.cwd() + '/config.json' });
const fs = require('fs')

async function checkBrowser() {
  if (!store.get('browser')) {
    return await downloadBrowser()
  }
}

async function downloadBrowser() {
  fs.mkdirSync('./browser-bin')

  const browserFetcher = puppeteer.createBrowserFetcher({
    path: "./browser-bin/"
  })

  const rev = await browserFetcher.download('961656')

  store.set('browser', rev.folderPath)
}

async function start (profile) {
  await checkBrowser()

  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ["--enable-automation"],
    userDataDir: `./profiles/${profile}`,
    executablePath: `${store.get('browser')}\\chrome-win\\chrome.exe`,
    defaultViewport: null
  })

  browser.on('targetcreated', async target => {
    const p = await (target.page())
    if (p) p.setUserAgent('Fake')
  })

  const page = await browser.newPage()
  await page.goto('https://google.com')
}

module.exports = { start }