import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { NotificationProvider } from './context/NotificationContext';
import { FriendProvider } from './context/FriendContext';
import useSocketEvents from './hooks/useSocketEvents';
import AuthLayout from './components/auth/AuthLayout';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Friends from './pages/Friends';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

// Component to handle socket events
function SocketHandler() {
  useSocketEvents();
  return null;
}

// Layout for authenticated routes
function AuthenticatedLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SocketHandler />
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

// Protected route wrapper
function ProtectedRoute() {
  const { user } = useAuth();
  return user ? <AuthenticatedLayout /> : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <NotificationProvider>
          <FriendProvider>
            <Routes>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/friends" element={<Friends />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </FriendProvider>
        </NotificationProvider>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;