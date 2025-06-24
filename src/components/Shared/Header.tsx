import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ClipLoader } from 'react-spinners';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('ref'));
  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('import.meta.VITE_BACKEND_URL/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      navigate('/auth/sign-in');
    } catch (error) {
      console.error('Logout failed', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-gray-100 border-gray-200 px-2 md:px-6 py-3 ">
      {/* Logo + Name */}
      <div className="flex items-center gap-3 text-gray-900 font-semibold">
        <img src="/RC.png" width={55} height={55} alt="reviewcui" />
        <h2 className="text-lg header-title font-bold leading-tight tracking-[-0.015em]">
          <Link to="/">MindMate</Link>
        </h2>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-gray-700 text-sm">
        <Link to="/" className="hover:text-black hover:font-semibold">
          Home
        </Link>

        {user && (
          <>
            <Link
              to="/profile"
              className="hover:text-black hover:font-semibold"
            >
              Profile
            </Link>
            <Link to="/chat" className="hover:text-black hover:font-semibold">
              Chat
            </Link>
          </>
        )}
      </nav>

      {/* Sign In Button (Desktop) */}
      {!user ? (
        <Link
          className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer"
          to={
            searchParams.get('ref')
              ? `/auth/sign-in?ref=${searchParams.get('ref')}`
              : '/auth/sign-in'
          }
        >
          Get Started
        </Link>
      ) : (
        <button
          className="hidden md:block bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer flex items-center justify-center"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : 'Logout'}
        </button>
      )}

      {/* Mobile Menu Button */}
      <div className="relative z-50 md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="absolute z-50 top-20 left-0 w-full bg-white border-t border-gray-200 shadow-md md:hidden">
          <nav className="flex flex-col items-start px-8 border py-4 space-y-4 text-gray-700 text-sm">
            <Link to="/" className="hover:text-black">
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  className="hover:text-black hover:font-semibold"
                >
                  Profile
                </Link>
                <Link
                  to="/chat"
                  className="hover:text-black hover:font-semibold"
                >
                  Chat
                </Link>
              </>
            )}

            {!user ? (
              <button className=" bg-gray-900 hover:-translate-y-1 duration-200  w-full mt-4 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer">
                <Link
                  to={
                    searchParams.get('ref')
                      ? `/auth/sign-in?ref=${searchParams.get('ref')}`
                      : '/auth/sign-in'
                  }
                >
                  Get Started
                </Link>
              </button>
            ) : (
              <button
                className="w-full bg-gray-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition cursor-pointer flex items-center justify-center"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? <ClipLoader size={18} color="#fff" /> : 'Logout'}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
