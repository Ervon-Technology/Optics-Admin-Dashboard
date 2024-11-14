'use client';
import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { toast } from 'react-toastify';
import { Search, Download, Filter } from 'lucide-react';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { format } from 'date-fns';

// Card and Layout Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700",
    destructive: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Transaction Filter Component
const FilterForm = ({ onFilter, retailers, onReset }) => {
  const [filterParams, setFilterParams] = useState({
    month: '',
    startDate: '',
    endDate: '',
    retailer: ''
  });

  const handleChange = (e) => {
    setFilterParams((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filterParams);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-6 flex-wrap">
      <div>
        <label className="block text-sm font-medium mb-2">Month</label>
        <input
          type="month"
          name="month"
          value={filterParams.month}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Start Date</label>
        <input
          type="date"
          name="startDate"
          value={filterParams.startDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">End Date</label>
        <input
          type="date"
          name="endDate"
          value={filterParams.endDate}
          onChange={handleChange}
          className="p-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Retailer</label>
        <select
          name="retailer"
          value={filterParams.retailer}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="">Select Retailer</option>
          {retailers.map((retailer) => (
            <option key={retailer.id} value={retailer.id}>
              {retailer.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 mt-4">
        <Button variant="secondary" onClick={onReset}>
          Reset Filters
        </Button>
        <Button type="submit">Apply Filters</Button>
      </div>
    </form>
  );
};

// Main Transactions Component
const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [retailers, setRetailers] = useState([]);
  const [filterParams, setFilterParams] = useState({
    month: '',
    startDate: '',
    endDate: '',
    retailer: ''
  });

  // Sample data - In a real-world scenario, these would come from an API.
  useEffect(() => {
    const fetchRetailers = async () => {
      // Simulate API call
      setRetailers([
        { id: '1', name: 'Retailer A' },
        { id: '2', name: 'Retailer B' },
        { id: '3', name: 'Retailer C' },
      ]);
    };
    const fetchTransactions = async () => {
      // Simulate API call
      const fetchedTransactions = [
        { id: 1, date: '2024-11-01', retailer: 'Retailer A', amount: 120.50, product: 'Goggle Frame X' },
        { id: 2, date: '2024-11-03', retailer: 'Retailer B', amount: 220.00, product: 'Goggle Frame Y' },
        { id: 3, date: '2024-11-10', retailer: 'Retailer C', amount: 320.75, product: 'Goggle Frame Z' },
        { id: 4, date: '2024-11-15', retailer: 'Retailer A', amount: 450.20, product: 'Goggle Frame A' },
        { id: 5, date: '2024-11-20', retailer: 'Retailer B', amount: 180.10, product: 'Goggle Frame B' },
      ];
      setTransactions(fetchedTransactions);
      setFilteredTransactions(fetchedTransactions);
    };

    fetchRetailers();
    fetchTransactions();
  }, []);

  // Apply filters to transactions
  const applyFilters = (params) => {
    let filtered = [...transactions];
    const { month, startDate, endDate, retailer } = params;

    if (month) {
      filtered = filtered.filter((transaction) =>
        transaction.date.startsWith(month)
      );
    }

    if (startDate && endDate) {
      filtered = filtered.filter(
        (transaction) =>
          new Date(transaction.date) >= new Date(startDate) &&
          new Date(transaction.date) <= new Date(endDate)
      );
    }

    if (retailer) {
      filtered = filtered.filter((transaction) =>
        transaction.retailer === retailers.find((r) => r.id === retailer)?.name
      );
    }

    setFilteredTransactions(filtered);
    setFilterParams(params);
  };

  // Reset filters
  const resetFilters = () => {
    setFilterParams({ month: '', startDate: '', endDate: '', retailer: '' });
    setFilteredTransactions(transactions);
  };

  return (
    <DefaultLayout>
      <Card className="max-w-7xl mx-auto my-8 p-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-900">Transactions</h3>
            <div className="flex gap-2">
              <CSVLink
                data={filteredTransactions}
                filename="transactions_report.csv"
                className="no-underline"
              >
                <Button variant="secondary">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </CSVLink>
              <Button variant="secondary">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <FilterForm onFilter={applyFilters} retailers={retailers} onReset={resetFilters} />

          <div className="overflow-x-auto mt-6">
            <table className="w-full text-left table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-6">Date</th>
                  <th className="py-3 px-6">Retailer</th>
                  <th className="py-3 px-6">Product</th>
                  <th className="py-3 px-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-4 text-center text-gray-500">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">
                        {format(new Date(transaction.date), 'yyyy-MM-dd')}
                      </td>
                      <td className="py-3 px-6">{transaction.retailer}</td>
                      <td className="py-3 px-6">{transaction.product}</td>
                      <td className="py-3 px-6">{transaction.amount.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </DefaultLayout>
  );
};

export default TransactionsPage;
