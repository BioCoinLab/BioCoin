import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import AnalyticsDashboard from '../components/Dashboard/AnalyticsDashboard';
import { useThemeContext } from '../contexts/ThemeContext';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const toast = useToast();
  const { theme } = useThemeContext();
  
  // Mock data for demonstration
  const userData = {
    totalEarnings: 125.75,
    dataPoints: 3,
    pendingRequests: 2,
    recentTransactions: [
      { id: 1, date: '2023-02-15', amount: 45.25, researcher: 'Microbiome Research Institute' },
      { id: 2, date: '2023-02-10', amount: 32.50, researcher: 'BioGenetics Labs' },
      { id: 3, date: '2023-01-28', amount: 48.00, researcher: 'Global Health Initiative' },
    ],
  };

  const connectWallet = () => {
    // In a real implementation, this would connect to a Solana wallet
    setIsConnected(true);
    toast.success('Wallet connected successfully!');
  };

  const connectData = () => {
    // In a real implementation, this would open a modal to connect data sources
    toast.info('Initiating connection to your microbiome data sources...');
    
    // Simulate an async operation
    setTimeout(() => {
      toast.success('Successfully connected to 1 data source!');
    }, 2000);
  };

  const approveRequest = () => {
    toast.info('Processing your approval...');
    
    // Simulate an async operation
    setTimeout(() => {
      toast.success('Request approved! You will receive BioCoin tokens once the transaction is processed.');
    }, 1500);
  };

  const rejectRequest = () => {
    toast.info('Processing your rejection...');
    
    // Simulate an async operation
    setTimeout(() => {
      toast.warning('Request rejected. The researcher will not have access to your data.');
    }, 1500);
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your BioCoin contributions and earnings
          </p>
        </div>
        
        {!isConnected ? (
          <button
            onClick={connectWallet}
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-full transition-colors"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="mt-4 md:mt-0 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 py-2 px-6 rounded-full">
            Wallet Connected
          </div>
        )}
      </div>

      {isConnected ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Total Earnings</h2>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">${userData.totalEarnings}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">From {userData.dataPoints} contributions</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Data Contributions</h2>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{userData.dataPoints}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Helping advance research</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Pending Requests</h2>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{userData.pendingRequests}</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">From research institutions</p>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Connect your wallet to view your dashboard and start earning BioCoin.
              </p>
            </div>
          </div>
        </div>
      )}

      {isConnected && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Transactions</h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-8">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Researcher</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {userData.recentTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{tx.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">${tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{tx.researcher}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* New Analytics Dashboard Component */}
          <AnalyticsDashboard userTransactions={userData.recentTransactions} />
        </>
      )}
    </div>
  );
};

export default Dashboard; 