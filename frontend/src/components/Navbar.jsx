import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiLogOut, FiSearch, FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import Logo from '../assets/images/logo.svg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard">
              <img className="h-8 w-auto" src={Logo} alt="Friendify" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/friends">Friends</NavLink>
            <NavLink to="/requests">Requests</NavLink>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {/* Search (Desktop) */}
            <div className="hidden md:block relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-64"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (!notificationsOpen && unreadCount > 0) markAllAsRead();
                }}
                className="p-1 rounded-full text-gray-600 hover:text-indigo-600 relative"
              >
                <FiBell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg overflow-hidden z-50"
                  >
                    <div className="py-1 max-h-96 overflow-y-auto">
                      <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                        <h3 className="text-lg font-medium">Notifications</h3>
                        <button 
                          onClick={markAllAsRead}
                          className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                          Mark all as read
                        </button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map(notification => (
                          <NotificationItem 
                            key={notification.id} 
                            notification={notification} 
                            onClose={() => setNotificationsOpen(false)}
                          />
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-gray-500">No new notifications</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img 
                  src={user?.avatar || "https://i.pravatar.cc/150?img=3"} 
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="hidden md:inline text-gray-700">{user?.username}</span>
              </button>

              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  >
                    <div className="py-1">
                      <Link 
                        to={`/profile/${user?._id}`} 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        <FiUser className="inline mr-2" /> Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setProfileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FiLogOut className="inline mr-2" /> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 rounded-md text-gray-700 hover:text-indigo-600"
            >
              {mobileMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 mb-2 border border-gray-300 rounded-lg"
              />
              <MobileNavLink to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                Dashboard
              </MobileNavLink>
              <MobileNavLink to="/friends" onClick={() => setMobileMenuOpen(false)}>
                Friends
              </MobileNavLink>
              <MobileNavLink to="/requests" onClick={() => setMobileMenuOpen(false)}>
                Requests
              </MobileNavLink>
              <MobileNavLink to={`/profile/${user?._id}`} onClick={() => setMobileMenuOpen(false)}>
                Profile
              </MobileNavLink>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
              >
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
  >
    {children}
  </Link>
);

const NotificationItem = ({ notification, onClose }) => {
  const { markAsRead } = useNotifications();
  const navigate = useNavigate();

  const handleClick = () => {
    markAsRead(notification.id);
    onClose();
    if (notification.link) navigate(notification.link);
  };

  return (
    <div 
      onClick={handleClick}
      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
        !notification.isRead ? 'bg-blue-50' : ''
      }`}
    >
      <p className="text-sm">{notification.message}</p>
      <p className="text-xs text-gray-500 mt-1">
        {new Date(notification.timestamp).toLocaleTimeString()}
      </p>
    </div>
  );
};

export default Navbar;