const { createServer } = require('http')
const { Nuxt, Builder } = require('nuxt')

const app = require('./app')
const config = require('./nuxt.config.js')
const nuxt = new Nuxt(config)

const { HOST = '0.0.0.0', PORT = 3000 } = process.env
const server = createServer(app)

// Force HTTPS and non-www redirect
app.use((req, res, next) => {
  const host = req.headers.host
  if (req.headers['x-forwarded-proto'] !== 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${host.replace('www.', '')}${req.url}`)
  } else if (host.match(/^www\..*/i)) {
    return res.redirect(301, `https://${host.replace(/^www\./i, '')}${req.url}`)
  }
  return next()
})

// Start Nuxt.js
nuxt.ready().then(() => {
  if (process.env.NODE_ENV === 'development') {
    new Builder(nuxt).build().then(listen)
  } else {
    listen()
  }
})

function listen() {
  server.listen(PORT, HOST)
  console.log(`Server listening on ${HOST}:${PORT}`)
}
