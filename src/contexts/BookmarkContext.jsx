import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useIndexedDB from '../hooks/useIndexedDB';

const BookmarkContext = createContext();

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};

export const BookmarkProvider = ({ children }) => {
  const { addBookmark: addToDB, removeBookmark: removeFromDB, getBookmarks, isBookmarked: checkIsBookmarked, isReady } = useIndexedDB();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      getBookmarks().then(setBookmarks).finally(() => setLoading(false));
    }
  }, [isReady, getBookmarks]);

  const addBookmark = useCallback(async (article) => {
    const isAlreadyBookmarked = await checkIsBookmarked(article.url);
    if (!isAlreadyBookmarked) {
      await addToDB(article);
      setBookmarks(prev => [...prev, article]);
    }
  }, [addToDB, checkIsBookmarked]);

  const removeBookmark = useCallback(async (url) => {
    await removeFromDB(url);
    setBookmarks(prev => prev.filter(bookmark => bookmark.url !== url));
  }, [removeFromDB]);

  const isBookmarked = useCallback(async (url) => {
    return await checkIsBookmarked(url);
  }, [checkIsBookmarked]);

  const value = {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    loading
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};
