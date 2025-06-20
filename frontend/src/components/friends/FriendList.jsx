import { useFriends } from '../../context/FriendContext';
import FriendCard from './FriendCard';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function FriendList() {
  const { friends, loading } = useFriends();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
}