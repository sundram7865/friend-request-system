import { useFriends } from '../context/FriendContext';
import FriendList from '../components/friends/FriendList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import EmptyState from '../components/ui/EmptyState';

export default function Friends() {
  const { friends, loading, error } = useFriends();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Friends</h1>
        <span className="text-gray-500">{friends.length} friends</span>
      </div>

      {friends.length === 0 ? (
        <EmptyState 
          title="No friends yet"
          description="Start by sending friend requests to connect with others"
          actionText="Find Friends"
          actionLink="/dashboard"
        />
      ) : (
        <FriendList friends={friends} />
      )}
    </div>
  );
}