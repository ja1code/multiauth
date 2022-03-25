const browser = require('./browser/main')

const profile = process.argv[2]

try {
  browser.start(profile || 'demo')
} catch (error) {
  console.log(error)
  process.abort()
}