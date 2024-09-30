// src/middleware/expirationMiddleware.js
const EXPIRATION_TIME = 3600000; // TTL in milliseconds (e.g., 1 hour)

export const expirationMiddleware = (store) => (next) => (action) => {
  const now = Date.now();
  const persistedTimestamp = parseInt(localStorage.getItem('persistedTimestamp'), 10);

  if (persistedTimestamp && now - persistedTimestamp > EXPIRATION_TIME) {
    localStorage.removeItem('persist:root');
    localStorage.removeItem('persistedTimestamp');
    store.dispatch({ type: 'RESET_PERSISTED_STATE' });
  }

  next(action);
};
