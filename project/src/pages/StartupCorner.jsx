import React from 'react'

function StartupCorner() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Startup Corner</h1>
      <p className="mb-4">Connect with startups and explore entrepreneurial opportunities.</p>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Featured Startups</h2>
        <p className="text-gray-600 dark:text-gray-300">
          No startups to display at the moment. Check back soon!
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Investor Connect</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Looking for investment opportunities? Join our investor network to connect with promising startups.
        </p>
      </div>
    </div>
  )
}

export default StartupCorner
//update