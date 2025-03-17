import React, { createContext, useContext, useState, useCallback } from 'react';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning',
};

// Create context
const ToastContext = createContext(null);

// Default duration for toasts in milliseconds
const DEFAULT_DURATION = 5000;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Add a new toast
  const addToast = useCallback(
    ({ type = TOAST_TYPES.INFO, message, duration = DEFAULT_DURATION }) => {
      const id = Date.now().toString();
      setToasts((prevToasts) => [...prevToasts, { id, type, message }]);

      // Auto-remove toast after duration
      if (duration !== 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    []
  );

  // Remove a toast by ID
  const removeToast = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // Convenience methods for different toast types
  const success = useCallback(
    (message, duration) => addToast({ type: TOAST_TYPES.SUCCESS, message, duration }),
    [addToast]
  );

  const error = useCallback(
    (message, duration) => addToast({ type: TOAST_TYPES.ERROR, message, duration }),
    [addToast]
  );

  const info = useCallback(
    (message, duration) => addToast({ type: TOAST_TYPES.INFO, message, duration }),
    [addToast]
  );

  const warning = useCallback(
    (message, duration) => addToast({ type: TOAST_TYPES.WARNING, message, duration }),
    [addToast]
  );

  return (
    <ToastContext.Provider
      value={{ toasts, addToast, removeToast, success, error, info, warning }}
    >
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook to use the toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastContext; 