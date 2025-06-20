import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import { FiX } from 'react-icons/fi';

export default function NotificationCenter() {
  const { notifications, markAsRead } = useNotifications();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.slice(0, 3).map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-3 pr-8 rounded-lg shadow-lg relative ${
              notification.type === 'error'
                ? 'bg-red-100 text-red-800'
                : notification.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <button
              onClick={() => markAsRead(notification.id)}
              className="absolute top-2 right-2"
            >
              <FiX />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}