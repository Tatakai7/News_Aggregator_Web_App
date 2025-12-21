import { useState, useEffect } from "react"
import NewsCard from "../components/NewsCard"
import { useBookmarks } from "../contexts/BookmarkContext"

const BookmarksPage = () => {
  const { bookmarks, removeBookmark, loading } = useBookmarks()
  const [bookmarkedArticles, setBookmarkedArticles] = useState([])

  useEffect(() => {
    setBookmarkedArticles(bookmarks)
  }, [bookmarks])

  const handleRemoveBookmark = async (article) => {
    await removeBookmark(article.url)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Saved Articles</h1>
          <p className="text-muted-foreground">Your curated collection of important stories</p>
        </div>

        {bookmarkedArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedArticles.map((article, index) => (
              <NewsCard key={index} article={article} onBookmark={removeBookmark} />
            ))}
          </div>
        ) : (
          <div className="bg-card border border-border rounded-xl p-12 text-center">
            <p className="text-3xl mb-3">✨</p>
            <p className="text-2xl font-semibold text-foreground mb-2">No Bookmarks Yet</p>
            <p className="text-muted-foreground">Start saving articles to keep them for later reading</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default BookmarksPage;
