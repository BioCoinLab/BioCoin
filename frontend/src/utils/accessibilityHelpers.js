/**
 * Accessibility helper functions for better WCAG compliance
 */

/**
 * Add proper keyboard navigation to a custom component
 * @param {Event} e - Keyboard event
 * @param {Function} callback - Function to call on Enter or Space key
 */
export const handleKeyboardEvent = (e, callback) => {
  // Trigger on Enter or Space key
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    callback();
  }
};

/**
 * Format numbers for screen readers
 * @param {Number} value - Number to format
 * @param {String} unit - Optional unit (e.g., 'dollars', 'percent')
 * @returns {String} Screen reader friendly number
 */
export const formatNumberForScreenReaders = (value, unit = '') => {
  if (typeof value !== 'number') return '';
  
  const formattedNumber = value.toLocaleString();
  return unit ? `${formattedNumber} ${unit}` : formattedNumber;
};

/**
 * Create a unique ID for aria-labelledby or other accessibility attributes
 * @param {String} prefix - Prefix for the ID
 * @returns {String} Unique ID
 */
export const generateAccessibleId = (prefix = 'a11y') => {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Announce a message to screen readers using aria-live region
 * @param {String} message - Message to announce
 * @param {String} priority - 'polite' or 'assertive'
 */
export const announceToScreenReader = (message, priority = 'polite') => {
  const announcer = document.getElementById('sr-announcer');
  
  if (!announcer) {
    // Create announcer if it doesn't exist
    const newAnnouncer = document.createElement('div');
    newAnnouncer.id = 'sr-announcer';
    newAnnouncer.className = 'sr-only';
    newAnnouncer.setAttribute('aria-live', priority);
    newAnnouncer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(newAnnouncer);
    
    // Give browser time to register the element before using it
    setTimeout(() => {
      newAnnouncer.textContent = message;
    }, 50);
  } else {
    // Use existing announcer
    announcer.textContent = '';
    // Timeout required to ensure screen readers register the change
    setTimeout(() => {
      announcer.textContent = message;
    }, 50);
  }
};

/**
 * Trap focus within a modal or other container for keyboard navigation
 * @param {HTMLElement} container - The container to trap focus within
 * @returns {Function} Function to remove the trap
 */
export const trapFocus = (container) => {
  if (!container) return () => {};
  
  // Find all focusable elements
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return () => {};
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Focus the first element initially
  firstElement.focus();
  
  // Handle keydown events
  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return;
    
    // Shift + Tab
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } 
    // Tab
    else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };
  
  // Add event listener
  document.addEventListener('keydown', handleKeyDown);
  
  // Return function to remove the trap
  return () => {
    document.removeEventListener('keydown', handleKeyDown);
  };
}; 