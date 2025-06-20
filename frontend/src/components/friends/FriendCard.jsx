import { motion } from 'framer-motion';

export default function FriendCard({ friend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center space-x-3">
        <img
          src={friend.avatar || 'https://i.pravatar.cc/150?img=3'}
          alt={friend.username}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="font-medium">{friend.username}</h3>
          <p className="text-sm text-gray-500">Last active: 2h ago</p>
        </div>
      </div>
    </motion.div>
  );
}