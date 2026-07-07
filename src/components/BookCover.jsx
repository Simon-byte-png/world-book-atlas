import { useState } from 'react'
import { theme, cn, yearLabel } from '../data/books'
import manifest from '../data/covers-manifest.json'

const HAVE = new Set(manifest)

// 优先使用从 Open Library 抓取的真实封面；缺失或加载失败时回退到设计封面
export default function BookCover({ book, size = 'md' }) {
  const [failed, setFailed] = useState(false)
  const t = theme(book.genre)
  const cls = `cover cover-${size}`

  if (HAVE.has(book.slug) && !failed) {
    return (
      <div className={`${cls} cover-photo`}>
        <img
          src={`./covers/${book.slug}.jpg`}
          alt={book.title}
          loading="lazy"
          onError={() => setFailed(true)}
        />
        {book.nobel && <span className="cover-badge" title={`诺贝尔文学奖 ${book.nobel}`}>🏅</span>}
      </div>
    )
  }

  return (
    <div className={cls} style={{ background: `linear-gradient(150deg, ${t.from}, ${t.to})`, color: t.ink }}>
      <span className="cover-spine" />
      <div className="cover-top">
        <span className="cover-genre">{book.genre}</span>
        {book.nobel && <span className="cover-nobel" title={`诺贝尔文学奖 ${book.nobel}`}>🏅</span>}
      </div>
      <div className="cover-title">{book.title}</div>
      <div className="cover-rule" />
      <div className="cover-foot">
        <span className="cover-author">{book.author}</span>
        <span className="cover-year">{yearLabel(book.year)} · {cn(book.country)}</span>
      </div>
    </div>
  )
}
