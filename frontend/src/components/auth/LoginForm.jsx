import { useState } from 'react';
import useAuthActions from '../../hooks/useAuthActions';

export default function LoginForm() {
  const { login } = useAuthActions();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { success, error } = await login(credentials);
    setLoading(false);
    if (!success) setError(error);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={credentials.email}
          onChange={(e) => setCredentials({...credentials, email: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-indigo-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </div>
    </form>
  );
}