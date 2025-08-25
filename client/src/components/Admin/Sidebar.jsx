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
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ active, setActive }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { user, setUser } = useAuth();

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

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <motion.div
      className={`min-h-[91vh] bg-primary  text-primary-content flex flex-col
        ${collapsed ? 'w-20' : 'w-64'}`}
      initial={false}
      animate={{
        width: collapsed ? 80 : 256
      }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={`flex items-center justify-between p-4 border-b border-primary-focus`}>
        <AnimatePresence>
          {(!collapsed || hovered) && (
            <motion.h1
              className="text-xl font-bold whitespace-nowrap"
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}
            >
              <span className="text-accent">Admin</span> Panel
            </motion.h1>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-full hover:bg-primary-focus transition-colors"
        >
          {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
        </button>
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
                  ${active === item.id ? 'bg-primary-focus shadow-lg' : 'hover:bg-primary-focus/80'}
                  ${collapsed ? 'justify-center' : 'px-4'}`}
              >
                <span className={`${active === item.id ? 'text-accent' : 'text-primary-content/80'}`}>
                  {item.icon}
                </span>
                <AnimatePresence>
                  {(!collapsed || hovered) && (
                    <motion.span
                      className={`ml-3 whitespace-nowrap ${collapsed && hovered ? 'absolute left-16 bg-primary-focus px-3 py-2 rounded-md shadow-lg z-50' : ''}`}
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

      <div className="p-4 border-t border-primary-focus">
        <div className="flex items-center p-3 rounded-lg mb-4 bg-primary-focus/50">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            <span className="font-bold text-accent-content">
              {user?.name?.charAt(0) || 'A'}
            </span>
          </div>
          <AnimatePresence>
            {(!collapsed || hovered) && (
              <motion.div
                className="ml-3 overflow-hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
              >
                <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                <p className="text-xs text-primary-content/70 truncate">{user?.email || 'admin@example.com'}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg transition-all duration-200 hover:bg-error/20 text-error-content"
        >
          <FiLogOut size={20} className="text-error" />
          <AnimatePresence>
            {(!collapsed || hovered) && (
              <motion.span
                className="ml-3 whitespace-nowrap"
                initial="closed"
                animate="open"
                exit="closed"
                variants={itemVariants}
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Sidebar;