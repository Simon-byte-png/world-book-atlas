import { useMemo, useState } from 'react'
import WorldMap from './components/WorldMap.jsx'
import BookCover from './components/BookCover.jsx'
import { books, byCountry, maxCount, ERAS, cn, yearLabel } from './data/books.js'

function Scores({ book }) {
  return (
    <div className="scores">
      <span className="sc sc-score" title="综合评分">综合 {book.score}</span>
      <span className="sc sc-douban" title="豆瓣评分（整理值）">豆瓣 {book.douban}</span>
      {book.nobel && (
        <span className="sc sc-nobel" title={`诺贝尔文学奖 ${book.nobel}`}>🏅 诺奖 {book.nobel}</span>
      )}
    </div>
  )
}

function BookCard({ book, onOpen, showCountry = true }) {
  return (
    <article className="book-card" onClick={() => onOpen(book)}>
      <div className="card-cover">
        <BookCover book={book} size="sm" />
        <span className="rank-tag">#{book.rank}</span>
      </div>
      <div className="book-main">
        <h3 className="book-title">{book.title}</h3>
        {book.original && book.original !== book.title && (
          <p className="book-original">{book.original}</p>
        )}
        <p className="book-meta">
          {book.author}
          {showCountry && <> · {cn(book.country)}</>} · {yearLabel(book.year)} ·{' '}
          <span className="tag">{book.genre}</span>
        </p>
        <p className="book-blurb">{book.blurb}</p>
        <Scores book={book} />
      </div>
    </article>
  )
}

function BookModal({ book, onClose }) {
  if (!book) return null
  return (
    <div className="modal-mask" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-cover">
            <BookCover book={book} size="lg" />
          </div>
          <div className="modal-info">
            <div className="modal-rank">全球第 {book.rank} 名</div>
            <h2 className="modal-title">{book.title}</h2>
            {book.original && book.original !== book.title && (
              <p className="modal-original">{book.original}</p>
            )}
            <div className="modal-facts">
              <div><span className="fk">作者</span><span className="fv">{book.author}</span></div>
              <div><span className="fk">国家</span><span className="fv">{cn(book.country)}</span></div>
              <div><span className="fk">年代</span><span className="fv">{yearLabel(book.year)}</span></div>
              <div><span className="fk">体裁</span><span className="fv">{book.genre}</span></div>
              <div><span className="fk">综合评分</span><span className="fv gold">{book.score}</span></div>
              <div><span className="fk">豆瓣评分</span><span className="fv gold">{book.douban}</span></div>
            </div>
            {book.nobel && (
              <div className="modal-nobel">🏅 作者获诺贝尔文学奖（{book.nobel} 年）</div>
            )}
            <p className="modal-blurb">{book.blurb}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Timeline({ list, onOpen }) {
  const sorted = useMemo(() => list.slice().sort((a, b) => a.year - b.year), [list])
  const groups = ERAS.map((era) => ({
    era,
    items: sorted.filter((b) => b.era === era),
  })).filter((g) => g.items.length)

  return (
    <div className="timeline">
      <div className="tl-intro">
        <h2 className="section-title">好书编年 · 一部横跨三千年的阅读史诗</h2>
        <p className="tl-sub">自公元前的荷马史诗，到当代的诺奖新作，沿时间之河顺流而下。</p>
      </div>
      {groups.map((g) => (
        <section key={g.era} className="tl-era">
          <div className="tl-era-head">
            <span className="tl-era-name">{g.era}</span>
            <span className="tl-era-range">
              {yearLabel(g.items[0].year)} — {yearLabel(g.items[g.items.length - 1].year)} · {g.items.length} 部
            </span>
          </div>
          <div className="tl-line">
            {g.items.map((b) => (
              <div key={b.id} className="tl-item" onClick={() => onOpen(b)}>
                <span className="tl-year">{yearLabel(b.year)}</span>
                <span className="tl-dot" />
                <div className="tl-cover"><BookCover book={b} size="sm" /></div>
                <div className="tl-meta">
                  <h4>{b.title}{b.nobel && <span className="tl-medal">🏅</span>}</h4>
                  <p>{b.author} · {cn(b.country)} · <span className="tag">{b.genre}</span></p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [view, setView] = useState('map') // map | timeline | ranking
  const [openBook, setOpenBook] = useState(null)

  const q = query.trim().toLowerCase()
  const byScore = (a, b) => b.score - a.score

  const searchResults = useMemo(() => {
    if (!q) return []
    return books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          (b.original && b.original.toLowerCase().includes(q)) ||
          (b.en && b.en.toLowerCase().includes(q)) ||
          b.author.toLowerCase().includes(q) ||
          cn(b.country).includes(q) ||
          b.country.toLowerCase().includes(q),
      )
      .sort(byScore)
  }, [q])

  const selectedInfo = selected ? byCountry[selected] : null
  const selectedBooks = selectedInfo ? selectedInfo.books : []
  const searching = q.length > 0

  const switchView = (v) => {
    setView(v)
    setQuery('')
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="logo">◍</span>
          <div>
            <h1>环球书榜</h1>
            <p className="sub">World Book Atlas · 转动地球，检索世界好书</p>
          </div>
        </div>

        <div className="search-box">
          <span className="search-ico">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索书名、作者或国家…"
          />
          {query && <button className="clear" onClick={() => setQuery('')}>×</button>}
        </div>

        <div className="view-toggle">
          <button className={view === 'map' && !searching ? 'on' : ''} onClick={() => switchView('map')}>🌐 地球</button>
          <button className={view === 'timeline' && !searching ? 'on' : ''} onClick={() => switchView('timeline')}>📜 时间线</button>
          <button className={view === 'ranking' && !searching ? 'on' : ''} onClick={() => switchView('ranking')}>🏆 总榜</button>
        </div>
      </header>

      <main className="stage">
        {searching ? (
          <section className="results">
            <h2 className="section-title">搜索「{query}」· {searchResults.length} 个结果</h2>
            <div className="grid">
              {searchResults.map((b) => <BookCard key={b.id} book={b} onOpen={setOpenBook} />)}
              {!searchResults.length && <p className="empty-hint">没有找到匹配的书，换个关键词试试。</p>}
            </div>
          </section>
        ) : view === 'ranking' ? (
          <section className="results">
            <h2 className="section-title">全球好书总榜</h2>
            <div className="grid">
              {books.map((b) => <BookCard key={b.id} book={b} onOpen={setOpenBook} />)}
            </div>
          </section>
        ) : view === 'timeline' ? (
          <section className="results">
            <Timeline list={books} onOpen={setOpenBook} />
          </section>
        ) : (
          <div className="map-stage">
            <div className="map-col">
              <WorldMap byCountry={byCountry} maxCount={maxCount} selected={selected} onSelect={setSelected} />
              <div className="legend">
                <span>收录较少</span>
                <span className="bar" />
                <span>收录较多</span>
                <span className="legend-tip">拖动旋转地球 · 滚轮缩放 · 点击有色国家看书单</span>
              </div>
            </div>

            <aside className="side">
              {selectedInfo ? (
                <>
                  <div className="side-head">
                    <div>
                      <h2>{cn(selected)}</h2>
                      <p className="side-sub">{selected} · 收录 {selectedInfo.count} 本</p>
                    </div>
                    <button className="deselect" onClick={() => setSelected(null)}>返回</button>
                  </div>
                  <div className="side-list">
                    {selectedBooks.map((b) => (
                      <BookCard key={b.id} book={b} onOpen={setOpenBook} showCountry={false} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="side-placeholder">
                  <div className="ph-ico">🌐</div>
                  <h2>转动地球，检索世界</h2>
                  <p>拖动旋转、滚轮缩放。颜色越亮，收录的好书越多，点击即可转到该国并查看经典书单。</p>
                  <div className="ph-top">
                    <h3>全球 Top 6 抢先看</h3>
                    {books.slice(0, 6).map((b) => (
                      <div key={b.id} className="ph-row" onClick={() => setOpenBook(b)}>
                        <span className="ph-rank">#{b.rank}</span>
                        <span className="ph-title">{b.title}</span>
                        <span className="ph-country">{cn(b.country)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        )}
      </main>

      <BookModal book={openBook} onClose={() => setOpenBook(null)} />
    </div>
  )
}
