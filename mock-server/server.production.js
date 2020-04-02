const path = require('path')
const express = require('express')
const jsonServer = require('json-server')
const { createProxyMiddleware } = require('http-proxy-middleware')

const PORT = process.env.PORT || 3002
const DIST = path.join(`${__dirname}/../dist`)

const router = express.Router()
const serverDevelopment = jsonServer.create()

const v1Router = jsonServer.router('./mock-server/db.json')
const v2Router = jsonServer.router('./mock-server/db-v2.json')

router.use(
  express.static(path.join(DIST), { index: false, extensions: ['html'] }),
)
router.use('/mock/api', v1Router)
router.use('/mock/api/v2', v2Router)
router.use(
  '/api/*',
  createProxyMiddleware({
    target: `http://localhost:${PORT}`,
    changeOrigin: true,
  }),
)

router.get('*', (req, res) => {
  res.sendFile(`${DIST}/index.html`)
})

serverDevelopment.use('/', router)

console.log('PORT: ', PORT)
serverDevelopment.listen(PORT)
