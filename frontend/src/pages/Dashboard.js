import React, { useState } from 'react';
import { useToast } from '../contexts/ToastContext';

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const toast = useToast();
  
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
    toast.success('Wallet connected successfully! You can now manage your BioCoin assets.');
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your BioCoin Dashboard</h1>

      {!isConnected ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center mb-8">
          <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="mb-6">Connect your Solana wallet to manage your BioCoin assets and data.</p>
          <button
            onClick={connectWallet}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 font-medium mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold">{userData.totalEarnings} BIO</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 font-medium mb-2">Data Points</h3>
              <p className="text-3xl font-bold">{userData.dataPoints}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 font-medium mb-2">Pending Requests</h3>
              <p className="text-3xl font-bold">{userData.pendingRequests}</p>
            </div>
          </div>

          {/* Data Connection */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Your Microbiome Data</h2>
                <p className="text-gray-600 mb-4 md:mb-0">
                  Connect your microbiome test results to start earning BioCoin tokens.
                </p>
              </div>
              <button
                onClick={connectData}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Connect Data Source
              </button>
            </div>
          </div>

          {/* Pending Requests - New Section */}
          {userData.pendingRequests > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-xl font-semibold mb-4">Pending Data Access Requests</h2>
              <div className="border rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <h3 className="font-medium">GutFlora Research Project</h3>
                      <p className="text-sm text-gray-600 mt-1">Requesting access to your microbiome data for a study on gut flora diversity.</p>
                    </div>
                    <div className="flex gap-2 mt-3 md:mt-0">
                      <button 
                        onClick={approveRequest}
                        className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-3 rounded transition"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={rejectRequest}
                        className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-3 rounded transition"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Transactions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Researcher</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{tx.date}</td>
                      <td className="py-3 px-4">{tx.researcher}</td>
                      <td className="py-3 px-4 text-right font-medium">{tx.amount} BIO</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 