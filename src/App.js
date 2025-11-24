import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { lazy, Suspense } from "react"
import Navbar from "./components/Navbar"
import LoadingFallback from "./components/LoadingFallback"
import ErrorBoundary from "./components/ErrorBoundary"

const HomePage = lazy(() => import("./pages/HomePage"))
const BookmarksPage = lazy(() => import("./pages/BookmarksPage"))

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="bg-background text-foreground min-h-screen">
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/bookmarks" element={<BookmarksPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App;
