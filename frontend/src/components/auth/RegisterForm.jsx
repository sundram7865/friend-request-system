import { useState } from 'react';
import useAuthActions from '../../hooks/useAuthActions';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  const { register } = useAuthActions();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const { success, error } = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });

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
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          minLength={3}
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
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
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>

      <div className="text-sm text-center">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-indigo-600">
          Sign in
        </Link>
      </div>
    </form>
  );
}