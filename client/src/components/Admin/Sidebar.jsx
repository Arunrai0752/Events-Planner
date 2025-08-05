import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FiLogOut,
  FiCoffee,
  FiMap
} from 'react-icons/fi';
import { MdOutlineRestaurant, MdOutlineMeetingRoom } from 'react-icons/md';

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
    { id: 'cateringService', icon: <MdOutlineRestaurant size={20} />, label: 'Catering Service' },
    { id: 'banquetHall', icon: <MdOutlineMeetingRoom size={20} />, label: 'Banquet Hall' },
  ];


  const itemVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    },
    closed: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 }
    }
  };


  const ha = async () => {
    const res = await api.get("/auth/logout");
    navigate("/");
  };

  return (
    <motion.div
      className={`min-h-[91vh] bg-gradient-to-b from-pink-800 to-pink-900 text-white flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}`}
      initial={false}
      animate={{
        width: collapsed ? 80 : 256
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex items-center justify-between p-4 border-b border-pink-700`}>
        <AnimatePresence>
          {(!collapsed || hovered) && (
            <motion.h1
              className="text-xl font-bold whitespace-nowrap"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <span className="text-blue-300">Admin</span> Panel
            </motion.h1>
          )}
        </AnimatePresence>

      </div>

      <nav className="p-2 mt-4 flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <motion.li
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center w-full p-3 rounded-lg transition-all duration-200
                  ${active === item.id ? 'bg-pink-600 shadow-lg' : 'hover:bg-pink-700'}
                  ${collapsed ? 'justify-center' : 'px-4'}`}
              >
                <span className={`${active === item.id ? 'text-white' : 'text-pink-200'}`}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {(!collapsed || hovered) && (
                    <motion.span
                      className={`ml-3 whitespace-nowrap ${collapsed && hovered ? 'absolute left-16 bg-pink-800 px-3 py-2 rounded-md shadow-lg z-50' : ''}`}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={itemVariants}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.li>
          ))}
        </ul>
      </nav>

      <div>

        <button className='w-full py-5 border-t-1 border-gray-500'>
          LogOut
        </button>
      </div>


    </motion.div>
  );
};

export default Sidebar;