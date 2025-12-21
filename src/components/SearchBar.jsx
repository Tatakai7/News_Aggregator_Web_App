import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("")

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="flex justify-center my-8 px-4">
      <div className="w-full max-w-2xl flex items-center bg-card border border-border rounded-full shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
        <span className="pl-4 text-muted-foreground">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search breaking news, topics, and more..."
          className="flex-1 px-4 py-3 bg-transparent outline-none text-foreground placeholder-muted-foreground"
        />
        <button onClick={handleSearch} className="btn-primary mr-2">
          Search
        </button>
      </div>
    </div>
  )
}

export default SearchBar;
