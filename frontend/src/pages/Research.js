import React, { useState } from 'react';

const Research = () => {
  const [activeTab, setActiveTab] = useState('browse');
  
  // Mock data for demonstration
  const availableData = [
    {
      id: 1,
      title: 'Gut Microbiome Profile - 35M European',
      description: 'Complete gut microbiome profile from a 35-year-old male of European descent with no known health conditions.',
      price: 25,
      uniqueness: 'Medium',
      dataPoints: 1250,
    },
    {
      id: 2,
      title: 'Microbiome Time Series - 28F Asian',
      description: 'Six-month time series of gut microbiome samples from a 28-year-old female of Asian descent following a plant-based diet.',
      price: 45,
      uniqueness: 'High',
      dataPoints: 7500,
    },
    {
      id: 3,
      title: 'Oral Microbiome Profile - 42M African',
      description: 'Detailed oral microbiome profile from a 42-year-old male of African descent with periodontal disease history.',
      price: 30,
      uniqueness: 'High',
      dataPoints: 980,
    },
    {
      id: 4,
      title: 'Skin Microbiome - 31F Hispanic',
      description: 'Skin microbiome samples from five body sites of a 31-year-old female of Hispanic descent with eczema.',
      price: 35,
      uniqueness: 'Medium',
      dataPoints: 2100,
    },
  ];

  const requestAccess = (dataId) => {
    // In a real implementation, this would open a modal to request access
    alert(`Requesting access to data ID: ${dataId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Research Data Marketplace</h1>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'browse'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('browse')}
        >
          Browse Data
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'requests'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('requests')}
        >
          My Requests
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === 'publish'
              ? 'text-green-500 border-b-2 border-green-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('publish')}
        >
          Publish Research
        </button>
      </div>

      {/* Browse Data Tab */}
      {activeTab === 'browse' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Available Biological Data</h2>
            <p className="text-gray-600 mb-4">
              Browse and access anonymized microbiome data for your research. All data is ethically sourced
              with explicit consent from providers.
            </p>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
                <select className="w-full p-2 border rounded">
                  <option>All Types</option>
                  <option>Gut Microbiome</option>
                  <option>Oral Microbiome</option>
                  <option>Skin Microbiome</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select className="w-full p-2 border rounded">
                  <option>Any Price</option>
                  <option>Under 20 BIO</option>
                  <option>20-50 BIO</option>
                  <option>Over 50 BIO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Demographics</label>
                <select className="w-full p-2 border rounded">
                  <option>All Demographics</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>18-30 years</option>
                  <option>31-50 years</option>
                  <option>51+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uniqueness</label>
                <select className="w-full p-2 border rounded">
                  <option>Any</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableData.map((data) => (
              <div key={data.id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{data.title}</h3>
                <p className="text-gray-600 mb-4">{data.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {data.dataPoints} data points
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    Uniqueness: {data.uniqueness}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">{data.price} BIO</span>
                  <button
                    onClick={() => requestAccess(data.id)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Request Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === 'requests' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Data Access Requests</h2>
          <p className="text-gray-600 mb-6">
            Track the status of your data access requests and manage your research projects.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-500 mb-4">You haven't made any data access requests yet.</p>
            <button
              onClick={() => setActiveTab('browse')}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-300"
            >
              Browse Available Data
            </button>
          </div>
        </div>
      )}

      {/* Publish Research Tab */}
      {activeTab === 'publish' && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Publish Your Research</h2>
          <p className="text-gray-600 mb-6">
            Share your research findings with the BioCoin community and gain recognition for your work.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Research Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter the title of your research"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Abstract</label>
                <textarea
                  className="w-full p-2 border rounded"
                  rows="4"
                  placeholder="Provide a brief summary of your research"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Research Paper</label>
                <div className="border-dashed border-2 border-gray-300 p-6 rounded text-center">
                  <p className="text-gray-500 mb-2">Drag and drop your research paper here</p>
                  <p className="text-gray-400 text-sm">Supported formats: PDF, DOCX (Max 10MB)</p>
                  <button
                    type="button"
                    className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300"
                  >
                    Browse Files
                  </button>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
              <div className="text-right">
                <button
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded transition duration-300"
                >
                  Submit Research
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Research; 