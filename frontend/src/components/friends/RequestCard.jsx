import useFriendActions from '../../hooks/useFriendActions';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function RequestCard({ request, isSent = false }) {
  const { respondToRequest, cancelRequest } = useFriendActions();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleAction = async (action) => {
    setProcessing(true);
    setError(null);
    const { success, error } = isSent 
      ? await cancelRequest(request._id)
      : await respondToRequest(request._id, action);
    setProcessing(false);
    if (!success) setError(error);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-4 rounded-lg shadow mb-3"
    >
      {error && (
        <div className="text-red-500 text-sm mb-2 flex justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-xs">×</button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img
            src={isSent ? request.receiver.avatar : request.sender.avatar}
            alt={isSent ? request.receiver.username : request.sender.username}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-medium">
              {isSent ? request.receiver.username : request.sender.username}
            </h3>
            <p className="text-xs text-gray-500">
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {isSent ? (
            <button
              onClick={() => handleAction('cancel')}
              disabled={processing}
              className={`px-3 py-1 text-sm rounded-md ${
                processing ? 'bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {processing ? 'Canceling...' : 'Cancel'}
            </button>
          ) : (
            <>
              <button
                onClick={() => handleAction('accept')}
                disabled={processing}
                className={`px-3 py-1 text-sm rounded-md text-white ${
                  processing ? 'bg-green-400' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                Accept
              </button>
              <button
                onClick={() => handleAction('reject')}
                disabled={processing}
                className={`px-3 py-1 text-sm rounded-md ${
                  processing ? 'bg-gray-200' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Reject
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}