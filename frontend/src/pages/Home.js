import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Monetize Your Biological Data with BioCoin
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          The world's first decentralized marketplace for biological data, starting with the microbiome.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/dashboard"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/research"
            className="bg-white border-2 border-green-500 text-green-500 hover:bg-green-50 font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            For Researchers
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Data Ownership</h3>
            <p>Maintain complete control of your biological data while earning tokens when it's accessed for research.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Fair Value Distribution</h3>
            <p>Unlike traditional models, BioCoin ensures data providers receive the majority (70%) of access fees.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">AI-Driven Valuation</h3>
            <p>Advanced AI algorithms provide objective pricing for your biological data assets.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold mb-3">1. Connect Your Data</h3>
              <p>Link your microbiome test results from supported providers or upload your raw data directly.</p>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
              {/* Placeholder for illustration */}
              <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Data Connection Illustration</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center mb-12">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8 md:order-2">
              <h3 className="text-2xl font-semibold mb-3">2. Receive AI Valuation</h3>
              <p>Our advanced AI analyzes your microbiome data and assigns a fair market value based on uniqueness and research relevance.</p>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm md:order-1">
              {/* Placeholder for illustration */}
              <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">AI Valuation Illustration</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-semibold mb-3">3. Earn BioCoin Tokens</h3>
              <p>When researchers access your data, you automatically receive BioCoin tokens as compensation, with complete transparency.</p>
            </div>
            <div className="md:w-1/2 bg-white p-4 rounded-lg shadow-sm">
              {/* Placeholder for illustration */}
              <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-gray-500">Token Rewards Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-bold mb-6">Ready to Monetize Your Biological Data?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already earning BioCoin tokens by contributing to scientific research.
        </p>
        <Link
          to="/dashboard"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-300 text-lg"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Home; 