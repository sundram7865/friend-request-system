import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useMutualFriends from '../hooks/useMutualFriends';
import useFriendActions from '../hooks/useFriendActions';
import { useState } from 'react';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function Profile() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();
  const { mutualFriends, loading, error } = useMutualFriends(userId);
  const { sendRequest, blockUser } = useFriendActions();
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState(null);

  const isCurrentUser = currentUser?._id === userId;

  const handleFriendAction = async (action) => {
    setActionLoading(true);
    setActionError(null);
    const { success, error } = action === 'add' 
      ? await sendRequest(userId)
      : await blockUser(userId);
    setActionLoading(false);
    if (!success) setActionError(error);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={currentUser?.avatar || 'https://i.pravatar.cc/150?img=3'}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{currentUser?.username}</h1>
            <p className="text-gray-500">{currentUser?.email}</p>
          </div>
        </div>

        {!isCurrentUser && (
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => handleFriendAction('add')}
              disabled={actionLoading}
              className={`px-4 py-2 rounded-md text-white ${
                actionLoading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {actionLoading ? 'Sending...' : 'Add Friend'}
            </button>
            <button
              onClick={() => handleFriendAction('block')}
              disabled={actionLoading}
              className={`px-4 py-2 rounded-md ${
                actionLoading ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Block User
            </button>
          </div>
        )}

        {actionError && (
          <div className="text-red-500 text-sm mb-4">
            {actionError}
          </div>
        )}

        {!isCurrentUser && (
          <div className="mt-6">
            <h3 className="font-medium mb-2">Mutual Friends</h3>
            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-red-500 text-sm">{error}</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {mutualFriends.length > 0 ? (
                  mutualFriends.map(friend => (
                    <div key={friend._id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                      <img
                        src={friend.avatar || 'https://i.pravatar.cc/150?img=3'}
                        alt={friend.username}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="text-sm">{friend.username}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No mutual friends</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}