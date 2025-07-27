import React, { useState } from 'react';
import { FiSearch, FiMail, FiUser, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const CustomerQuery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

 
  const queries = [
    {
      id: '#QU-1001',
      customer: 'John Doe',
      email: 'john@example.com',
      subject: 'Package customization',
      message: 'Can I customize my tour package?',
      date: '2023-11-15',
      status: 'resolved',
      priority: 'medium'
    },
    {
      id: '#QU-1002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      subject: 'Payment issue',
      message: 'Payment not reflecting in my account',
      date: '2023-12-05',
      status: 'pending',
      priority: 'high'
    },
    {
      id: '#QU-1003',
      customer: 'Robert Johnson',
      email: 'robert@example.com',
      subject: 'Visa requirements',
      message: 'What documents are needed for Thailand visa?',
      date: '2023-11-22',
      status: 'in-progress',
      priority: 'low'
    },
    {
      id: '#QU-1004',
      customer: 'Emily Davis',
      email: 'emily@example.com',
      subject: 'Cancellation policy',
      message: 'What is your cancellation policy?',
      date: '2024-01-10',
      status: 'pending',
      priority: 'medium'
    },
  ];

  // Filter queries based on search and active filter
  const filteredQueries = queries.filter(query => {
    const matchesSearch = query.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         query.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         query.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || query.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'resolved': return <FiCheckCircle className="text-green-500" />;
      case 'in-progress': return <FiClock className="text-blue-500" />;
      case 'pending': return <FiAlertCircle className="text-yellow-500" />;
      default: return <FiMail className="text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority) => {
    const classes = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${classes[priority]}`}>
        {priority}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Queries</h1>
            <p className="text-gray-600">Manage and respond to customer inquiries</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto mt-4 md:mt-0">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search queries..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Queries</p>
                <p className="text-xl font-bold text-gray-800 mt-1">24</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <FiMail size={18} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-xl font-bold text-gray-800 mt-1">8</p>
              </div>
              <div className="p-2 rounded-lg bg-yellow-50 text-yellow-600">
                <FiAlertCircle size={18} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">In Progress</p>
                <p className="text-xl font-bold text-gray-800 mt-1">6</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <FiClock size={18} />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Resolved</p>
                <p className="text-xl font-bold text-gray-800 mt-1">10</p>
              </div>
              <div className="p-2 rounded-lg bg-green-50 text-green-600">
                <FiCheckCircle size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Queries Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Query ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQueries.map((query) => (
                  <tr key={query.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {query.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{query.customer}</div>
                      <div className="text-sm text-gray-500">{query.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{query.subject}</div>
                      <div className="text-sm text-gray-500 line-clamp-1">{query.message}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPriorityBadge(query.priority)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(query.status)}
                        <span className="ml-2 text-sm text-gray-900 capitalize">{query.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {query.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-gray-600 hover:text-gray-900">Reply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerQuery;