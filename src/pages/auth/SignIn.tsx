import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:3069/auth/sign-in', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Login successful! Redirecting...');
        setUser(data.user);
        setTimeout(() => navigate('/chat'), 2000);
      } else {
        toast.error(data.message || 'Invalid email or password');
      }
    } catch {
      toast.error('Something went wrong.Try Again Later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex">
        <div className="hidden lg:flex bg-[#d3d3d3] rounded-tr-2xl rounded-br-2xl items-center justify-center h-screen flex-1">
          <img
            src="//assets.api.uizard.io/api/cdn/stream/7b63b700-42c3-436c-826a-f40b4f3a5154.png"
            alt="Login"
          />
        </div>
        <div className="flex relative flex-col flex-1 items-center justify-center h-screen">
          <h1 className="text-5xl font-bold mb-6">Log in</h1>

          <form
            onSubmit={handleLogin}
            className="bg-white w-full md:w-2xl p-6 md:p-8 flex-col items-center justify-center"
          >
            <label className="block text-gray-700 font-medium">
              Enter email address
            </label>
            <input
              type="email"
              placeholder="example@student.cui.edu.pk"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-2 mb-4 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />

            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="*******"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-2 mb-6 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              required
            />

            <button
              type="submit"
              className={`w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg transition flex justify-center items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Sign In'}
            </button>

            <div className="h-[1px] my-4 bg-[#d3d3d3]"></div>
            <p>
              New Here?{' '}
              <Link
                to="/auth/sign-up"
                className="hover:underline hover:font-semibold"
              >
                Register Here!
              </Link>
            </p>
          </form>
          <div className="mt-4 absolute top-4 left-4 md:left-8 block">
            <Link
              to="/"
              className="flex items-center text-gray-800 hover:text-black hover:underline"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/home.png"
                alt="Home"
                className="w-6 h-6 mr-2"
              />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
