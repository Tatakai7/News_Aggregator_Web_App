import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center group">
            <div className="w-10 h-10 bg-linear-to-br from-secondary to-accent rounded-lg flex items-center justify-center mr-3 group-hover:shadow-lg transition-all duration-200">
              <span className="text-primary-foreground font-bold text-lg">📰</span>
            </div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
              NewsFlow
            </h1>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="nav-link">
              Explore
            </Link>
            <Link to="/bookmarks" className="nav-link">
              Bookmarks
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors">☰</button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
