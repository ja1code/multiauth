const browser = require('./browser/main')

const profile = process.argv[2]

browser.start(profile || 'profile1')