import React, { useState } from 'react';
import { exportAsCSV, exportAsJSON } from '../../utils/exportFormats';

/**
 * Analytics Dashboard component for visualizing blockchain and research data
 */
const AnalyticsDashboard = ({ userTransactions, researchContributions }) => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Mock data for demonstration
  const mockTransactions = userTransactions || [
    { id: 1, date: '2025-02-15', amount: 45.25, researcher: 'Microbiome Research Institute', type: 'payment' },
    { id: 2, date: '2025-02-10', amount: 32.50, researcher: 'BioGenetics Labs', type: 'payment' },
    { id: 3, date: '2025-01-28', amount: 48.00, researcher: 'Global Health Initiative', type: 'payment' },
    { id: 4, date: '2025-01-15', amount: 25.75, researcher: 'BioGenetics Labs', type: 'payment' },
    { id: 5, date: '2024-12-22', amount: 60.25, researcher: 'Microbiome Research Institute', type: 'payment' },
  ];
  
  const mockResearch = researchContributions || [
    { id: 1, date: '2025-02-16', type: 'dna', amount: 1, value: 45.25 },
    { id: 2, date: '2025-02-11', type: 'bloodwork', amount: 1, value: 32.50 },
    { id: 3, date: '2025-01-29', type: 'microbiome', amount: 1, value: 48.00 },
    { id: 4, date: '2025-01-16', type: 'bloodwork', amount: 1, value: 25.75 },
    { id: 5, date: '2024-12-23', type: 'microbiome', amount: 1, value: 60.25 },
  ];

  // Calculate analytics data
  const calculateAnalytics = () => {
    // Filter by time range
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
      default:
        startDate = new Date(0); // Beginning of time
    }
    
    const filteredTransactions = mockTransactions.filter(
      tx => new Date(tx.date) >= startDate
    );
    
    const filteredResearch = mockResearch.filter(
      r => new Date(r.date) >= startDate
    );
    
    // Calculate totals
    const totalEarnings = filteredTransactions.reduce(
      (sum, tx) => sum + tx.amount, 
      0
    ).toFixed(2);
    
    const totalContributions = filteredResearch.length;
    
    // Group by researcher for pie chart data
    const researcherData = filteredTransactions.reduce((acc, tx) => {
      acc[tx.researcher] = (acc[tx.researcher] || 0) + tx.amount;
      return acc;
    }, {});
    
    // Group by contribution type
    const contributionTypes = filteredResearch.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {});
    
    return {
      totalEarnings,
      totalContributions,
      researcherData,
      contributionTypes
    };
  };
  
  const analytics = calculateAnalytics();
  
  // Handle export
  const handleExport = (format) => {
    const data = {
      analytics: analytics,
      transactions: mockTransactions,
      researchContributions: mockResearch
    };
    
    if (format === 'csv') {
      exportAsCSV(mockTransactions, 'biocoin_transactions.csv');
    } else {
      exportAsJSON(data, 'biocoin_analytics.json');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Analytics Dashboard</h2>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm"
          >
            <option value="week">Past Week</option>
            <option value="month">Past Month</option>
            <option value="year">Past Year</option>
            <option value="all">All Time</option>
          </select>
          <button
            onClick={() => handleExport('csv')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Export JSON
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Summary Cards */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="text-blue-700 dark:text-blue-300 font-medium mb-2">Earnings</h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">${analytics.totalEarnings}</p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">From {mockTransactions.length} transactions</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h3 className="text-purple-700 dark:text-purple-300 font-medium mb-2">Contributions</h3>
          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">{analytics.totalContributions}</p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">Across {Object.keys(analytics.contributionTypes).length} research types</p>
        </div>
        
        {/* Researcher Distribution */}
        <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">Earnings by Researcher</h3>
          <div className="space-y-2">
            {Object.entries(analytics.researcherData).map(([researcher, amount]) => (
              <div key={researcher} className="flex items-center">
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-4">
                  <div 
                    className="bg-blue-600 h-4 rounded-full"
                    style={{ 
                      width: `${(amount / analytics.totalEarnings) * 100}%`
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {researcher}: ${amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contribution Types */}
        <div className="col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-4">Contribution Types</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(analytics.contributionTypes).map(([type, count]) => (
              <div key={type} className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                <p className="text-gray-500 dark:text-gray-400 capitalize">{type}</p>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-200 mt-1">{count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard; 