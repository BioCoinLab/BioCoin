import { useState, useMemo } from 'react';

/**
 * Custom hook for processing and analyzing data for dashboards
 * @param {Array} data - Raw data array to analyze
 * @param {Object} options - Configuration options for the analysis
 * @returns {Object} Processed analytics and methods to filter/sort
 */
export const useAnalytics = (data, options = {}) => {
  const [timeRange, setTimeRange] = useState(options.defaultTimeRange || 'month');
  const [sortBy, setSortBy] = useState(options.defaultSortBy || 'date');
  const [sortDirection, setSortDirection] = useState(options.defaultSortDirection || 'desc');
  
  // Filter data based on time range
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    
    const now = new Date();
    let startDate;
    
    switch(timeRange) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case 'all':
      default:
        return [...data]; // Return all data
    }
    
    // Filter data where date is after startDate
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });
  }, [data, timeRange]);
  
  // Sort filtered data
  const sortedData = useMemo(() => {
    if (!filteredData.length) return [];
    
    return [...filteredData].sort((a, b) => {
      // Handle different types of values
      const valueA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const valueB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
      
      // Handle dates specially
      if (sortBy === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // For other fields
      if (sortDirection === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortDirection]);
  
  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!sortedData.length) return {};
    
    const stats = {
      count: sortedData.length,
    };
    
    // Check if data has numeric amounts to calculate totals
    if (sortedData.some(item => typeof item.amount === 'number')) {
      stats.totalAmount = sortedData.reduce((sum, item) => sum + (item.amount || 0), 0);
      stats.averageAmount = stats.totalAmount / stats.count;
    }
    
    // Get most recent item
    stats.mostRecent = sortedData[0];
    
    // Group by category if data has categories
    if (sortedData.some(item => item.category)) {
      stats.byCategory = sortedData.reduce((acc, item) => {
        const category = item.category || 'Uncategorized';
        
        if (!acc[category]) {
          acc[category] = {
            count: 0,
            totalAmount: 0,
          };
        }
        
        acc[category].count++;
        acc[category].totalAmount += (item.amount || 0);
        
        return acc;
      }, {});
    }
    
    return stats;
  }, [sortedData]);
  
  // Change the time range
  const changeTimeRange = (newRange) => {
    setTimeRange(newRange);
  };
  
  // Change sorting
  const changeSorting = (newSortBy, newDirection) => {
    setSortBy(newSortBy);
    if (newDirection) {
      setSortDirection(newDirection);
    } else {
      // Toggle direction if same field clicked again
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    }
  };
  
  return {
    data: sortedData,
    stats: summaryStats,
    timeRange,
    sortBy,
    sortDirection,
    changeTimeRange,
    changeSorting,
  };
}; 