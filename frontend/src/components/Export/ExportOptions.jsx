import React from 'react';
import { exportAsCSV, exportAsJSON, exportAsText } from '../../utils/exportFormats';

/**
 * Component that provides export functionality with multiple format options
 */
const ExportOptions = ({ data, filename, title = 'Export Data' }) => {
  // Handle different export formats
  const handleExport = (format) => {
    if (!data) {
      console.error('No data provided for export');
      return;
    }
    
    switch (format) {
      case 'csv':
        exportAsCSV(data, `${filename || 'export'}.csv`);
        break;
      case 'json':
        exportAsJSON(data, `${filename || 'export'}.json`);
        break;
      case 'text':
        // For text export, convert data to a string representation
        const textContent = typeof data === 'string' 
          ? data 
          : JSON.stringify(data, null, 2);
        exportAsText(textContent, `${filename || 'export'}.txt`);
        break;
      default:
        console.error('Unsupported export format:', format);
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleExport('csv')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
          aria-label="Export as CSV"
        >
          CSV
        </button>
        <button
          onClick={() => handleExport('json')}
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors"
          aria-label="Export as JSON"
        >
          JSON
        </button>
        <button
          onClick={() => handleExport('text')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
          aria-label="Export as Text"
        >
          Text
        </button>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        Export your data in multiple formats for use in other applications
      </p>
    </div>
  );
};

export default ExportOptions; 