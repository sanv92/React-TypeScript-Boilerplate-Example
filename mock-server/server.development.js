const express = require('express')
const jsonServer = require('json-server')
const { createProxyMiddleware } = require('http-proxy-middleware')

const { MOCK_PORT, BACKEND_PORT } = process.env

const router = express.Router()
const serverDevelopment = jsonServer.create()

const v1Router = jsonServer.router('./mock-server/db.json')
const v2Router = jsonServer.router('./mock-server/db-v2.json')

router.use('/mock/api', v1Router)
router.use('/mock/api/v2', v2Router)
router.use(
  '/api/*',
  createProxyMiddleware({ target: `http://localhost:${BACKEND_PORT}`, changeOrigin: true }),
)

serverDevelopment.use('/', router)

console.log('MOCK_PORT: ', MOCK_PORT)
console.log('BACKEND_PORT: ', BACKEND_PORT)
serverDevelopment.listen(MOCK_PORT)
