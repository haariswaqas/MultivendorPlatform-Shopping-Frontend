import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { 
  UserIcon, 
  LockIcon, 
  LogInIcon 
} from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          login(data.token);
          navigate('/');
        } else {
          setError('Login failed: Invalid credentials');
        }
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 
    flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative Blurred Circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 
        rounded-2xl shadow-2xl p-8 space-y-6">
          <h1 className="text-5xl font-extrabold text-center mb-4 
          bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
            MultiVendorApp
          </h1>
          
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Welcome Back
          </h2>

          {error && (
            <div className="bg-red-600/30 text-white p-4 rounded-lg text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="w-5 h-5 text-white/50" />
              </div>
              <input
                type="email"
                placeholder="Email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg 
                border border-white/20 rounded-full text-white 
                placeholder-white/50 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="w-5 h-5 text-white/50" />
              </div>
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg 
                border border-white/20 rounded-full text-white 
                placeholder-white/50 focus:outline-none 
                focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600/70 backdrop-blur-lg text-white 
              rounded-full hover:bg-blue-600 transition-all duration-300 
              flex items-center justify-center space-x-2
              disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <LogInIcon className="w-5 h-5 mr-2" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-white/75">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-blue-300 hover:text-white 
                transition-colors duration-300"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;