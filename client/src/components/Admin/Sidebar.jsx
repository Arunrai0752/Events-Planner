import React, { useState } from 'react';
import {
  FiHome,
  FiCalendar,
  FiPackage,
  FiUsers,
  FiHelpCircle,
  FiMessageSquare,
  FiChevronLeft,
  FiChevronRight,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

const Sidebar = ({ active, setActive }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const menuItems = [
    { id: 'overview', icon: <FiHome size={20} />, label: 'Overview' },
    { id: 'booking', icon: <FiCalendar size={20} />, label: 'Booking' },
    { id: 'package', icon: <FiPackage size={20} />, label: 'Packages' },
    { id: 'customer', icon: <FiUsers size={20} />, label: 'Customers' },
    { id: 'query', icon: <FiHelpCircle size={20} />, label: 'Queries' },
    { id: 'feedback', icon: <FiMessageSquare size={20} />, label: 'Feedback' },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div 
      className={`h-[90.7vh]  bg-pink-900 text-white transition-all duration-300 ease-in-out 
        ${collapsed ? 'w-20' : 'w-64'} 
        ${hovered && collapsed ? 'shadow-xl' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex items-center justify-between p-4 border-b border-gray-700 ${collapsed ? 'px-2' : 'px-4'}`}>
        {!collapsed && (
          <h1 className="text-xl font-bold whitespace-nowrap">
            <span className="text-blue-400">Admin</span>Panel
          </h1>
        )}
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
      </div>

     
      <nav className="p-2 mt-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
                  ${active === item.id ? 'bg-blue-600 shadow-md' : 'hover:bg-gray-700'}
                  ${collapsed ? 'justify-center px-0' : 'px-3'}`}
              >
                <span className={`${active === item.id ? 'text-white' : 'text-gray-300'}`}>
                  {item.icon}
                </span>
                {(!collapsed || hovered) && (
                  <span className={`ml-3 whitespace-nowrap ${collapsed && hovered ? 'absolute left-12 bg-gray-800 px-3 py-2 rounded-md shadow-lg' : ''}`}>
                    {item.label}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

    
    </div>
  );
};

export default Sidebar;