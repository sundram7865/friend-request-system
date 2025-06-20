import { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import { motion } from 'framer-motion';
import Logo from '../assets/images/logo.svg';

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <img src={Logo} alt="App Logo" className="h-12 mb-4" />
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
        <div className="text-sm text-center">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-primary hover:text-indigo-700">
            Register here
          </Link>
        </div>
      </div>
    </motion.div>
  );
}