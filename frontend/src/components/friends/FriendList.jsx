import { useFriends } from '../../context/FriendContext';
import FriendCard from './FriendCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';

export default function FriendList() {
  const { friends, loading, error } = useFriends();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (friends.length === 0) {
    return <EmptyState 
      title="No friends yet"
      description="Start by sending friend requests to connect with others"
    />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
}