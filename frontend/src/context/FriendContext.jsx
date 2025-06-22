import { createContext, useContext, useState } from 'react';

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = () => setTimeout(() => setError(null), 5000);

  return (
    <FriendContext.Provider
      value={{
        friends,
        requests,
        loading,
        error,
        setFriends,
        setRequests,
        setLoading,
        setError,
        clearError
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export const useFriends = () => {
  const context = useContext(FriendContext);
  if (!context) throw new Error('useFriends must be used within FriendProvider');
  return context;
};