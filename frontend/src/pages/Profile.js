import React, { useState } from 'react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');
  
  // Mock user data for demonstration
  const userData = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    walletAddress: '8ZJ6BLiXSxQVXzpGLnwdeM3UqwPK3MbJGX9iMaYCTUTU',
    joinDate: 'January 15, 2023',
    dataContributions: 3,
    totalEarnings: 125.75,
    dataSettings: {
      allowAnonymousResearch: true,
      allowCommercialUse: false,
      requireApproval: true,
      shareHealthInsights: true,
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 md:pr-8">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <div className="text-center mb-4">
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-green-500 text-2xl font-bold">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-xl font-semibold">{userData.name}</h2>
              <p className="text-gray-500 text-sm">Member since {userData.joinDate}</p>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Data Contributions:</span>
                <span className="font-medium">{userData.dataContributions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Earnings:</span>
                <span className="font-medium">{userData.totalEarnings} BIO</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              className={`w-full text-left px-6 py-3 font-medium ${
                activeTab === 'account' ? 'bg-green-50 text-green-500 border-l-4 border-green-500' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('account')}
            >
              Account Settings
            </button>
            <button
              className={`w-full text-left px-6 py-3 font-medium ${
                activeTab === 'data' ? 'bg-green-50 text-green-500 border-l-4 border-green-500' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('data')}
            >
              Data Management
            </button>
            <button
              className={`w-full text-left px-6 py-3 font-medium ${
                activeTab === 'wallet' ? 'bg-green-50 text-green-500 border-l-4 border-green-500' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('wallet')}
            >
              Wallet & Payments
            </button>
            <button
              className={`w-full text-left px-6 py-3 font-medium ${
                activeTab === 'privacy' ? 'bg-green-50 text-green-500 border-l-4 border-green-500' : 'text-gray-700'
              }`}
              onClick={() => setActiveTab('privacy')}
            >
              Privacy & Consent
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Account Settings Tab */}
            {activeTab === 'account' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                <form>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded"
                        defaultValue={userData.name}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        className="w-full p-2 border rounded"
                        defaultValue={userData.email}
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                    <div className="flex">
                      <input
                        type="text"
                        className="w-full p-2 border rounded-l bg-gray-50"
                        value={userData.walletAddress}
                        readOnly
                      />
                      <button
                        type="button"
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 rounded-r"
                        onClick={() => navigator.clipboard.writeText(userData.walletAddress)}
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <button
                      type="button"
                      className="text-green-500 hover:text-green-600 font-medium"
                    >
                      Change Password
                    </button>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notification Preferences</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input type="checkbox" id="emailNotif" className="mr-2" defaultChecked />
                        <label htmlFor="emailNotif">Email notifications for data access requests</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="paymentNotif" className="mr-2" defaultChecked />
                        <label htmlFor="paymentNotif">Email notifications for payments received</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="marketingNotif" className="mr-2" />
                        <label htmlFor="marketingNotif">Marketing and promotional emails</label>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <button
                      type="button"
                      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Data Management Tab */}
            {activeTab === 'data' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Data Management</h2>
                <div className="mb-8">
                  <h3 className="text-lg font-medium mb-4">Your Microbiome Data</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Gut Microbiome Profile</h4>
                        <p className="text-sm text-gray-500">Uploaded on January 20, 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-600">View</button>
                        <button className="text-red-500 hover:text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Oral Microbiome Profile</h4>
                        <p className="text-sm text-gray-500">Uploaded on February 5, 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-600">View</button>
                        <button className="text-red-500 hover:text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Skin Microbiome Profile</h4>
                        <p className="text-sm text-gray-500">Uploaded on March 12, 2023</p>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-500 hover:text-blue-600">View</button>
                        <button className="text-red-500 hover:text-red-600">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Connect New Data</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:border-green-500 transition duration-300">
                      <div className="text-3xl mb-2">🧪</div>
                      <h4 className="font-medium mb-1">Upload Raw Data</h4>
                      <p className="text-sm text-gray-500">Upload your own microbiome test results</p>
                    </button>
                    <button className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:border-green-500 transition duration-300">
                      <div className="text-3xl mb-2">🔄</div>
                      <h4 className="font-medium mb-1">Connect Provider</h4>
                      <p className="text-sm text-gray-500">Link to your testing provider account</p>
                    </button>
                    <button className="bg-white border border-gray-200 p-4 rounded-lg text-center hover:border-green-500 transition duration-300">
                      <div className="text-3xl mb-2">📱</div>
                      <h4 className="font-medium mb-1">Use BioCoin App</h4>
                      <p className="text-sm text-gray-500">Collect samples using our mobile app</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Wallet & Payments Tab */}
            {activeTab === 'wallet' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Wallet & Payments</h2>
                <div className="bg-gray-50 p-6 rounded-lg mb-8">
                  <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <div>
                      <h3 className="text-lg font-medium">Your BioCoin Balance</h3>
                      <p className="text-sm text-gray-500">Available for withdrawal or research access</p>
                    </div>
                    <div className="text-3xl font-bold text-green-500">{userData.totalEarnings} BIO</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300">
                      Withdraw
                    </button>
                    <button className="bg-white border border-green-500 text-green-500 hover:bg-green-50 font-medium py-2 px-4 rounded transition duration-300">
                      Buy More BIO
                    </button>
                  </div>
                </div>

                <h3 className="text-lg font-medium mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-3 px-4 text-left">Date</th>
                        <th className="py-3 px-4 text-left">Description</th>
                        <th className="py-3 px-4 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">Mar 15, 2023</td>
                        <td className="py-3 px-4">Data access payment from Microbiome Research Institute</td>
                        <td className="py-3 px-4 text-right text-green-500">+45.25 BIO</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">Feb 28, 2023</td>
                        <td className="py-3 px-4">Data access payment from BioGenetics Labs</td>
                        <td className="py-3 px-4 text-right text-green-500">+32.50 BIO</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">Feb 10, 2023</td>
                        <td className="py-3 px-4">Withdrawal to external wallet</td>
                        <td className="py-3 px-4 text-right text-red-500">-50.00 BIO</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">Jan 22, 2023</td>
                        <td className="py-3 px-4">Data access payment from Global Health Initiative</td>
                        <td className="py-3 px-4 text-right text-green-500">+48.00 BIO</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Privacy & Consent Tab */}
            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Privacy & Consent Settings</h2>
                <p className="text-gray-600 mb-6">
                  Control how your biological data is used and who can access it. Your privacy is our priority.
                </p>

                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <input
                          type="checkbox"
                          id="anonymousResearch"
                          defaultChecked={userData.dataSettings.allowAnonymousResearch}
                        />
                      </div>
                      <div>
                        <label htmlFor="anonymousResearch" className="font-medium block mb-1">
                          Allow Anonymous Research Use
                        </label>
                        <p className="text-sm text-gray-500">
                          Your data can be used for scientific research in an anonymized form without requiring
                          explicit approval for each use.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <input
                          type="checkbox"
                          id="commercialUse"
                          defaultChecked={userData.dataSettings.allowCommercialUse}
                        />
                      </div>
                      <div>
                        <label htmlFor="commercialUse" className="font-medium block mb-1">
                          Allow Commercial Use
                        </label>
                        <p className="text-sm text-gray-500">
                          Your data can be used by commercial entities such as pharmaceutical companies for
                          product development.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <input
                          type="checkbox"
                          id="requireApproval"
                          defaultChecked={userData.dataSettings.requireApproval}
                        />
                      </div>
                      <div>
                        <label htmlFor="requireApproval" className="font-medium block mb-1">
                          Require Explicit Approval
                        </label>
                        <p className="text-sm text-gray-500">
                          You will be notified and must approve each request to access your data before it is granted.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <input
                          type="checkbox"
                          id="shareInsights"
                          defaultChecked={userData.dataSettings.shareHealthInsights}
                        />
                      </div>
                      <div>
                        <label htmlFor="shareInsights" className="font-medium block mb-1">
                          Receive Health Insights
                        </label>
                        <p className="text-sm text-gray-500">
                          Receive personalized health insights and recommendations based on your microbiome data
                          and research findings.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-right">
                  <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition duration-300"
                  >
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 