const isProdMode = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
  cdnUrl: isProdMode ? 'https://cdn.surmon.me' : 'https://cdn.surmon.me',
  baseUrl: isProdMode ? 'https://api.surmon.me/' : 'https://api.surmon.me/',
  socketHost: isProdMode ? 'https://surmon.me' : 'https://surmon.me'
}
