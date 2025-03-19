/**
 * Utility functions for exporting data in different formats
 */

/**
 * Export data as CSV
 * @param {Array} data - Array of objects to export
 * @param {String} filename - Name for the downloaded file
 */
export const exportAsCSV = (data, filename = 'export.csv') => {
  if (!data || !data.length) return;

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]);
  
  // Create CSV rows
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        // Handle values with commas by wrapping in quotes
        const cell = row[header] || '';
        return typeof cell === 'string' && cell.includes(',') 
          ? `"${cell}"` 
          : cell;
      }).join(',')
    )
  ];
  
  // Create blob and download
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  downloadFile(blob, filename);
};

/**
 * Export data as JSON
 * @param {Array|Object} data - Data to export
 * @param {String} filename - Name for the downloaded file
 */
export const exportAsJSON = (data, filename = 'export.json') => {
  if (!data) return;
  
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  
  downloadFile(blob, filename);
};

/**
 * Export data as plain text
 * @param {String} text - Text content to export
 * @param {String} filename - Name for the downloaded file
 */
export const exportAsText = (text, filename = 'export.txt') => {
  if (!text) return;
  
  const blob = new Blob([text], { type: 'text/plain' });
  downloadFile(blob, filename);
};

/**
 * Helper function to download a file
 * @param {Blob} blob - Blob to download
 * @param {String} filename - Name for the downloaded file
 */
const downloadFile = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}; 