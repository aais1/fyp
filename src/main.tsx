import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

// Layouts
import ChatLayout from './layouts/ChatLayout';

// Pages
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Search from './pages/Search';
import FacultyProfile from './pages/FacultyProfile';
import VerifyOTP from './pages/auth/verify-otp';
import Profile from './pages/Profile';

// Components
import { AuthContextProvider } from './contexts/AuthContext';
import NotFound from './components/ErrorBoundaries/NotFound';
import Protected from './components/Protected';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import ChatArea from './pages/ChatArea';
import MainLayout from './layouts/MainLayout';

// Router configuration
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
      </Route>
      {/* Public Routes */}
      <Route path="auth/sign-in" element={<SignIn />} />
      <Route path="auth/sign-up" element={<SignUp />} />
      <Route path="auth/verify-otp" element={<VerifyOTP />} />

      {/* Chat Layout with Protected Routes under '/chat' */}
      <Route
        path="chat"
        element={
          <Protected>
            <ChatLayout />
          </Protected>
        }
      >
        <Route path="" element={<ChatArea />} />
        <Route path="search" element={<Search />} />
      </Route>

      {/* Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

// Render the application with Context and Router
createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <Analytics />
    <Toaster position="top-right" />
    <RouterProvider router={router} />
  </AuthContextProvider>
);
