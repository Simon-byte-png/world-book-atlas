// 从 Open Library 抓取真实书封，下载到 public/covers/{slug}.jpg，并生成清单。
// 因当前网络出口只放行部分主机：
//   - Open Library 搜索 JSON 走 allorigins 代理（重试）
//   - 封面图走 images.weserv.nl 代理（可缩放裁剪）
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { books } from '../src/data/books.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '../public/covers')
const MANIFEST = path.join(__dirname, '../src/data/covers-manifest.json')
fs.mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function proxJson(target, tries = 5) {
  for (let i = 0; i < tries; i++) {
    try {
      const u = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(target)
      const r = await fetch(u, { signal: AbortSignal.timeout(22000) })
      if (r.status === 200) {
        const t = await r.text()
        if (t.trim().startsWith('{')) return JSON.parse(t)
      }
    } catch {}
    await sleep(600)
  }
  return null
}

async function findCoverId(book) {
  const base = 'https://openlibrary.org/search.json?limit=5&fields=cover_i,title,author_name&'
  const queries = [
    `title=${encodeURIComponent(book.en)}&author=${encodeURIComponent(book.enAuthor)}`,
    `title=${encodeURIComponent(book.en)}`,
    `q=${encodeURIComponent(book.en + ' ' + book.enAuthor)}`,
  ]
  for (const q of queries) {
    const j = await proxJson(base + q)
    if (j && j.docs) {
      const hit = j.docs.find((d) => d.cover_i)
      if (hit) return hit.cover_i
    }
  }
  return null
}

async function download(coverId, dest, tries = 4) {
  const src = `covers.openlibrary.org/b/id/${coverId}-L.jpg`
  const u =
    'https://images.weserv.nl/?url=' +
    encodeURIComponent(src) +
    '&w=400&h=600&fit=cover&we&output=jpg&q=82'
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(u, { signal: AbortSignal.timeout(25000) })
      if (r.status === 200) {
        const buf = Buffer.from(await r.arrayBuffer())
        if (buf.length > 2500) {
          fs.writeFileSync(dest, buf)
          return true
        }
      }
    } catch {}
    await sleep(500)
  }
  return false
}

async function worker(list, done) {
  for (const book of list) {
    const dest = path.join(OUT, `${book.slug}.jpg`)
    if (fs.existsSync(dest)) {
      done.ok.push(book.slug)
      continue
    }
    const id = await findCoverId(book)
    if (!id) {
      done.fail.push(`${book.title} (无封面ID)`)
      continue
    }
    const ok = await download(id, dest)
    if (ok) {
      done.ok.push(book.slug)
      console.log('✓', book.title)
    } else {
      done.fail.push(`${book.title} (下载失败)`)
    }
  }
}

const CONC = 5
const done = { ok: [], fail: [] }
const chunks = Array.from({ length: CONC }, () => [])
books.forEach((b, i) => chunks[i % CONC].push(b))
await Promise.all(chunks.map((c) => worker(c, done)))

fs.writeFileSync(MANIFEST, JSON.stringify(done.ok.sort(), null, 0))
console.log(`\n完成：成功 ${done.ok.length} / ${books.length}，失败 ${done.fail.length}`)
if (done.fail.length) console.log('未获取：\n  ' + done.fail.join('\n  '))
