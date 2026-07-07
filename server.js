// 极简静态服务器，用于预览已构建的 dist（仅供渲染检查/预览）
import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.join(__dirname, 'dist')
const PORT = process.env.PORT || 5173
const HOST = process.env.HOST || '0.0.0.0'

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
}

http
  .createServer((req, res) => {
    let urlPath = decodeURIComponent(req.url.split('?')[0])
    if (urlPath === '/favicon.ico') {
      res.writeHead(204)
      return res.end()
    }
    if (urlPath === '/') urlPath = '/index.html'
    const filePath = path.join(DIST, urlPath)
    // 防目录穿越
    if (!filePath.startsWith(DIST)) {
      res.writeHead(403)
      return res.end('Forbidden')
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 静态资源缺失返回真正的 404；其余回退到 index.html（SPA 兜底）
        if (path.extname(urlPath)) {
          res.writeHead(404)
          return res.end('Not found')
        }
        return fs.readFile(path.join(DIST, 'index.html'), (e2, html) => {
          res.writeHead(e2 ? 500 : 200, { 'Content-Type': 'text/html; charset=utf-8' })
          res.end(e2 ? 'Error' : html)
        })
      }
      res.writeHead(200, { 'Content-Type': TYPES[path.extname(filePath)] || 'application/octet-stream' })
      res.end(data)
    })
  })
  .listen(PORT, HOST, () => {
    console.log(`serving dist at http://${HOST}:${PORT}`)
  })
