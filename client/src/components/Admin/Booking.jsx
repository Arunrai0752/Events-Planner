import React, { useState } from 'react';
import { FiSearch, FiCalendar, FiUser, FiDollarSign, FiFilter } from 'react-icons/fi';

const Booking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample booking data
  const bookings = [
    {
      id: '#BK-1001',
      customer: 'John Doe',
      package: 'Premium Bali',
      date: '2023-11-15',
      status: 'confirmed',
      amount: '$1,200'
    },
    {
      id: '#BK-1002',
      customer: 'Jane Smith',
      package: 'European Tour',
      date: '2023-12-05',
      status: 'pending',
      amount: '$2,500'
    },
    {
      id: '#BK-1003',
      customer: 'Robert Johnson',
      package: 'Thailand Adventure',
      date: '2023-11-22',
      status: 'cancelled',
      amount: '$950'
    },
    {
      id: '#BK-1004',
      customer: 'Emily Davis',
      package: 'Japan Deluxe',
      date: '2024-01-10',
      status: 'confirmed',
      amount: '$3,200'
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         booking.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 bg-base-200 h-screen w-[80vw]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-2xl font-bold text-base-content mb-4 md:mb-0">Booking Management</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-base-content/70" />
              </div>
              <input
                type="text"
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 w-full rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-base-300 focus:ring-2 focus:ring-primary focus:border-primary bg-base-100 text-base-content"
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiFilter className="text-base-content/70" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Total Bookings</p>
                <p className="text-2xl font-bold text-base-content mt-1">124</p>
              </div>
              <div className="p-3 rounded-lg bg-info/20 text-info">
                <FiCalendar size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Active Customers</p>
                <p className="text-2xl font-bold text-base-content mt-1">89</p>
              </div>
              <div className="p-3 rounded-lg bg-success/20 text-success">
                <FiUser size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-base-content/70">Revenue</p>
                <p className="text-2xl font-bold text-base-content mt-1">$42,800</p>
              </div>
              <div className="p-3 rounded-lg bg-accent/20 text-accent">
                <FiDollarSign size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-base-300">
              <thead className="bg-base-200">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Booking ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Package
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-base-content/70 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-base-100 divide-y divide-base-300">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-base-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content">
                      {booking.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/80">
                      {booking.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/80">
                      {booking.package}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/80">
                      {booking.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${booking.status === 'confirmed' ? 'bg-success/20 text-success' : 
                          booking.status === 'pending' ? 'bg-warning/20 text-warning' : 
                          'bg-error/20 text-error'}`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/80">
                      {booking.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-info hover:text-info/80 mr-3">View</button>
                      <button className="text-base-content/70 hover:text-base-content">Edit</button>
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

export default Booking;