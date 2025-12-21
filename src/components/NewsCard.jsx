import { useState, useEffect } from "react";

const NewsCard = ({ article, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
    const isAlreadyBookmarked = bookmarks.some((bookmark) => bookmark.url === article.url)
    setIsBookmarked(isAlreadyBookmarked)
  }, [article.url])

  const handleBookmark = () => {
    onBookmark(article)
    setIsBookmarked(!isBookmarked)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <div className="news-card flex flex-col h-full">
      <div className="relative overflow-hidden bg-linear-to-br from-muted to-border h-48">
        {article.urlToImage ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 bg-linear-to-br from-muted to-border animate-pulse"></div>
            )}
            <img
              src={article.urlToImage || "/placeholder.svg"}
              alt={article.title}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover hover:scale-105 transition-transform duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full bg-linear-to-br from-secondary to-accent opacity-20 flex items-center justify-center">
            <span className="text-4xl">📰</span>
          </div>
        )}
        {article.source?.name && (
          <div className="absolute top-3 left-3 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold">
            {article.source.name}
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <p className="text-xs text-muted-foreground mb-2">{formatDate(article.publishedAt)}</p>
        <h2 className="text-lg font-bold mb-2 line-clamp-3 hover:text-secondary transition-colors">{article.title}</h2>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
          {article.description || "No description available"}
        </p>

        <div className="flex gap-2 mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center btn-primary text-sm"
          >
            Read Full
          </a>
          <button
            onClick={handleBookmark}
            className={`flex-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
              isBookmarked ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-border"
            }`}
          >
            {isBookmarked ? "★" : "☆"} Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsCard;
