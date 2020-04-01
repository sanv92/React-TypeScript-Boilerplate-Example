const path = require('path')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const { MOCK_PORT, BACKEND_PORT } = process.env
const DIST = (__dirname, '..', 'dist')

app.use(express.static(path.join(DIST), { index: false, extensions: ['html'] }))
app.use(
  '/api/*',
  createProxyMiddleware({ target: `http://localhost:${BACKEND_PORT}`, changeOrigin: true }),
)

app.get('*', (req, res) => {
  res.sendfile(path.join(DIST, 'index.html'))
})

console.log('MOCK_PORT: ', MOCK_PORT)
console.log('BACKEND_PORT: ', BACKEND_PORT)
app.listen(MOCK_PORT)
