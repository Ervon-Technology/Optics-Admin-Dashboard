'use client'
// pages/RetailerRatings.js
import React, { useState, useEffect } from 'react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';

// StarRating component to display ratings with stars
const StarRating = ({ rating }) => {
  const stars = Array(5).fill(false).map((_, i) => i < rating);
  return (
    <div className="flex">
      {stars.map((star, index) => (
        <span key={index} className={`text-yellow-400 ${star ? 'text-yellow-500' : ''}`}>
          ★
        </span>
      ))}
    </div>
  );
};

const RetailerRatings = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbackPerPage] = useState(5);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Mock data simulating API call
    const mockFeedback = [
      { retailer: 'Optics World', rating: 4.5, feedback: 'Great product and service!', date: '2024-10-15' },
      { retailer: 'Vision Pro', rating: 3.8, feedback: 'Good quality, but delivery was delayed.', date: '2024-09-28' },
      { retailer: 'Lens Hub', rating: 5.0, feedback: 'Excellent service and fast shipping!', date: '2024-11-01' },
      { retailer: 'Eye See You', rating: 4.0, feedback: 'Decent experience, but could improve customer support.', date: '2024-08-20' },
      { retailer: 'Clear Vision', rating: 2.5, feedback: 'The product was faulty and support was unhelpful.', date: '2024-10-10' },
      // Add more feedback data to simulate a larger dataset
    ];
    setFeedbackData(mockFeedback);
    setSortedData(mockFeedback);
  }, []);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = () => {
    const sorted = [...sortedData].sort((a, b) => new Date(b.date) - new Date(a.date));
    setSortedData(sorted);
  };

  const getFilteredData = () => {
    const filtered = sortedData.filter((item) =>
      item.retailer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === 'all') return filtered;
    return filtered.filter((item) => {
      if (filter === 'high') return item.rating >= 4;
      if (filter === 'medium') return item.rating >= 3 && item.rating < 4;
      if (filter === 'low') return item.rating < 3;
    });
  };

  // Pagination Logic
  const indexOfLastFeedback = currentPage * feedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbackPerPage;
  const currentFeedback = getFilteredData().slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(getFilteredData().length / feedbackPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <DefaultLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Retailer Ratings and Feedback</h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search retailers..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Filter and Sorting Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <select
              value={filter}
              onChange={handleFilterChange}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Ratings</option>
              <option value="high">4 and above</option>
              <option value="medium">3-4</option>
              <option value="low">Below 3</option>
            </select>
            <button
              onClick={handleSort}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Sort by Newest
            </button>
          </div>
        </div>

        {/* Feedback List */}
        <div className="bg-white shadow rounded-lg p-6">
          {currentFeedback.map((item, index) => (
            <div key={index} className="mb-6 p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{item.retailer}</h3>
              <div className="flex items-center text-sm text-gray-600">
                <StarRating rating={item.rating} />
                <span className="ml-2">({item.rating})</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{item.feedback}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="px-4 py-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            className="px-4 py-2 border rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RetailerRatings;
