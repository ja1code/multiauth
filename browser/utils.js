const fs = require('fs')
const os = require('os')

const store = require('data-store')({ path: process.cwd() + '/config.json' })

async function checkBrowser() {
  if (!store.get('browser') && os.arch !== 'arm64') { // "arm64" lock for mac M1 imediate usage
    return await downloadBrowser()
  } else if (os.arch === "arm64" && !store.get("browser")) {
    console.log("## Mac M1 Message ##")
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

function execPath() {
  const platform = os.platform()
  const arch = os.arch()

  switch (platform) {
    case (platform === "win64" || "win32"):
      return `${store.get('browser')}\\chrome-win\\chrome.exe`
    case (platform === "darwin" && arch !== "arm64"):
      return `${store.get('browser')}/chrome-mac/Chromium/Contents/Chromium`
    case (platform === "darwin" && arch !== "arm64"):
      return store.get('browser')
    default:
      throw new Error("Unsuported platform.")
  }
}

module.exports = {
  checkBrowser,
  downloadBrowser,
  execPath
}