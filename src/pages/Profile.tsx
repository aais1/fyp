import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserProfile } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import ProfileSkeleton from '../components/Skeletons/ProfileSkeleton';

const FunAnimation = () => {
  const boxes = Array.from({ length: 10 }).map((_, index) => (
    <motion.div
      key={index}
      initial={{ scale: 0.5, opacity: 0.5 }}
      animate={{ scale: 1.2, opacity: 0 }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
      className="absolute bg-blue-500 rounded-full"
      style={{
        width: 40,
        height: 40,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    ></motion.div>
  ));

  return <div className="relative h-full w-full overflow-hidden">{boxes}</div>;
};

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = user.token;
      if (!token) {
        setError('Unauthorized. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:3069/data/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data.data);
        formik.setFieldValue('name', data.data.name);
      } catch (err: any) {
        setError(err.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.token]);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(4, 'Must be at least 4 characters')
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters'),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref('password'), undefined],
        'Passwords must match'
      ),
    }),
    onSubmit: async values => {
      const token = user.token;
      if (!token) {
        setError('Unauthorized. Please log in.');
        return;
      }

      // Show updating toast
      toast.promise(
        fetch('http://localhost:3069/data/profile', {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: values.name,
            password: showChangePassword ? values.password : undefined,
          }),
        }).then(async res => {
          if (!res.ok) {
            throw new Error('Failed to update profile');
          }
          const updatedData = await res.json();
          setProfile(updatedData.data);
          setShowChangePassword(false);
          return updatedData;
        }),
        {
          loading: 'Updating profile...',
          success: 'Profile updated successfully! 🎉',
          error: 'Failed to update profile. ❌',
        }
      );
    },
  });

  if (loading) return <ProfileSkeleton />;
  if (error)
    return <div className="text-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="bg-white text-black flex items-center justify-center p-8 min-h-[75vh]">
      <div className="flex bg-gray-50 w-full max-w-5xl shadow-lg rounded-xl overflow-hidden">
        <div className="w-1/2 hidden md:block relative">
          <FunAnimation />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 p-10"
        >
          <h1 className="text-4xl font-extrabold mb-6">👤 User Profile</h1>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <label className="block text-lg font-semibold">Name</label>
              <input
                title="Enter the Name here :)"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label className="block text-lg font-semibold">Email</label>
              <div className="w-full p-3 rounded-lg bg-gray-200 cursor-not-allowed">
                {profile?.email}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowChangePassword(!showChangePassword)}
              className="text-blue-400 underline"
            >
              {showChangePassword
                ? 'Cancel Change Password'
                : 'Modify Password'}
            </button>

            {showChangePassword && (
              <div className="space-y-4">
                <div>
                  <label className="block text-lg font-semibold">
                    New Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800"
                    placeholder="Enter new password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>

                <div>
                  <label className="block text-lg font-semibold">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-gray-800"
                    placeholder="Confirm new password"
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <div className="text-red-500">
                      {formik.errors.confirmPassword}
                    </div>
                  ) : null}
                </div>

                <div className="flex items-center">
                  <input
                    title="Abraa ka dabra on the password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="mr-2"
                  />
                  <span>Show Password</span>
                </div>
              </div>
            )}

            <motion.button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 cursor-pointer"
            >
              Update Profile
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
