import { useState, useEffect, useCallback } from "react"
import CategoryFilter from "../components/CategoryFilter"
import NewsCard from "../components/NewsCard"
import SearchBar from "../components/SearchBar"

const API_KEY = process.env.REACT_APP_NEWS_API_KEY

const HomePage = () => {
  const [articles, setArticles] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("Technology")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = query
        ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
        : `https://newsapi.org/v2/top-headlines?category=${selectedCategory.toLowerCase()}&apiKey=${API_KEY}`
      const response = await fetch(endpoint)
      const data = await response.json()
      if (data.status === "error") {
        throw new Error(data.message)
      }
      setArticles(data.articles)
    } catch (error) {
      setError(error.message)
      console.error("Error fetching news:", error)
    }
    setLoading(false)
  }, [query, selectedCategory])

  useEffect(() => {
    fetchNews()
    const interval = setInterval(fetchNews, 300000)
    return () => clearInterval(interval)
  }, [fetchNews])

  const handleBookmark = (article) => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || []
    if (!bookmarks.some((bookmark) => bookmark.url === article.url)) {
      localStorage.setItem("bookmarks", JSON.stringify([...bookmarks, article]))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center mb-2">Latest Stories</h2>
          <p className="text-center text-muted-foreground">Stay informed with the latest news from around the world</p>
        </div>

        <SearchBar onSearch={setQuery} />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-muted border-t-secondary rounded-full"></div>
              </div>
              <p className="mt-4 text-muted-foreground">Loading fresh stories...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <p className="text-red-600 dark:text-red-200 font-medium">Unable to load articles</p>
            <p className="text-red-500 dark:text-red-300 text-sm mt-1">{error}</p>
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} onBookmark={handleBookmark} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl text-muted-foreground">No articles found</p>
            <p className="text-muted-foreground mt-2">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage;
