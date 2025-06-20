import { useFriends } from '../context/FriendContext';
import FriendList from '../components/friends/FriendList';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { friends, loading } = useFriends();
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {user?.username}!
      </h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Friends</h2>
        {loading ? <LoadingSpinner /> : <FriendList friends={friends} />}
      </div>
    </div>
  );
}