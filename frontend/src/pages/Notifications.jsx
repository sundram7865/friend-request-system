import { useNotifications } from '../context/NotificationContext';
import Notification from '../components/ui/Notification';
import EmptyState from '../components/ui/EmptyState';

export default function Notifications() {
  const { notifications, markAllAsRead } = useNotifications();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        <button
          onClick={markAllAsRead}
          disabled={notifications.length === 0}
          className={`text-sm ${
            notifications.length === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-primary hover:text-indigo-700'
          }`}
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <EmptyState 
          title="No notifications"
          description="Your notifications will appear here"
        />
      ) : (
        <div className="space-y-2">
          {notifications.map(notification => (
            <Notification 
              key={notification.id} 
              notification={notification} 
            />
          ))}
        </div>
      )}
    </div>
  );
}