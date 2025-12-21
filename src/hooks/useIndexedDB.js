import { useState, useEffect, useRef, useCallback } from 'react';

const useIndexedDB = () => {
  const [isReady, setIsReady] = useState(false);
  const dbRef = useRef(null);

  useEffect(() => {
    const request = indexedDB.open('BookmarksDB', 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('bookmarks')) {
        db.createObjectStore('bookmarks', { keyPath: 'url' });
      }
    };

    request.onsuccess = (event) => {
      dbRef.current = event.target.result;
      setIsReady(true);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
    };
  }, []);

  const addBookmark = useCallback(async (article) => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return reject(new Error('DB not ready'));
      const transaction = dbRef.current.transaction(['bookmarks'], 'readwrite');
      const store = transaction.objectStore('bookmarks');
      const request = store.add(article);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }, []);

  const removeBookmark = useCallback(async (url) => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return reject(new Error('DB not ready'));
      const transaction = dbRef.current.transaction(['bookmarks'], 'readwrite');
      const store = transaction.objectStore('bookmarks');
      const request = store.delete(url);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }, []);

  const getBookmarks = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return reject(new Error('DB not ready'));
      const transaction = dbRef.current.transaction(['bookmarks'], 'readonly');
      const store = transaction.objectStore('bookmarks');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }, []);

  const isBookmarked = useCallback(async (url) => {
    return new Promise((resolve, reject) => {
      if (!dbRef.current) return reject(new Error('DB not ready'));
      const transaction = dbRef.current.transaction(['bookmarks'], 'readonly');
      const store = transaction.objectStore('bookmarks');
      const request = store.get(url);
      request.onsuccess = () => resolve(!!request.result);
      request.onerror = () => reject(request.error);
    });
  }, []);

  return { addBookmark, removeBookmark, getBookmarks, isBookmarked, isReady };
};

export default useIndexedDB;
