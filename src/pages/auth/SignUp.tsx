import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const navigate = useNavigate();

  // Yup Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(4, 'Name must be at least 4 characters')
      .max(20, 'Name must be at most 20 characters')
      .required('Name is required'),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Invalid email format'
      )
      .required('Email is required'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  // Submit Handler
  const handleSignUp = async (
    values: SignUpValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + '/auth/send-otp',
        values
      );

      console.log(response.data + '123123');

      if (response.status === 200) {
        toast.success('Please verify your email.');
        navigate('/auth/verify-otp', {
          state: {
            email: values.email,
            name: values.name,
            password: values.password,
          },
        });
      } else {
        toast.error(response.data.message || 'Unexpected response.');
      }
    } catch (error: any) {
      // Handle 300 status inside the error block
      if (error.response && error.response.status === 300) {
        toast.error(error.response.data.message);
        // navigate('/auth/verify-otp', { state: { email: values.email } });
      } else {
        console.log(error);
        toast.error('Server error. Please try again.');
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="flex">
      <div className="flex flex-col flex-1 items-center justify-center h-screen">
        <h1 className="text-5xl font-bold mb-6">Register</h1>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white w-full md:w-2xl p-6 md:p-8 flex-col items-center justify-center">
              {/* Name Field */}
              <label className="block text-gray-700 font-medium">
                Full Name
              </label>
              <Field
                type="text"
                name="name"
                className="w-full px-4 py-3 mt-2 mb-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              {/* Email Field */}
              <label className="block text-gray-700 font-medium">
                Email Address
              </label>
              <Field
                type="email"
                name="email"
                className="w-full px-4 py-3 mt-2 mb-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              {/* Password Field */}
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <Field
                type="password"
                name="password"
                className="w-full px-4 py-3 mt-2 mb-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              {/* Confirm Password Field */}
              <label className="block text-gray-700 font-medium">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 mt-2 mb-1 border rounded-lg focus:ring focus:ring-blue-300 outline-none"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mb-2"
              />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-black cursor-pointer text-white py-3 rounded-lg transition"
              >
                {isSubmitting ? (
                  <ClipLoader color="#ffffff" size={20} />
                ) : (
                  'Sign Up'
                )}
              </button>
            </Form>
          )}
        </Formik>

        {/* Sign In Link */}
        <div className="h-[1px] my-4 bg-[#d3d3d3]"></div>
        <p>
          Already have an account?{' '}
          <Link
            to="/auth/sign-in"
            className="hover:underline hover:font-semibold"
          >
            Sign In Here!
          </Link>
        </p>
      </div>

      {/* Image Section */}
      <div className="hidden lg:flex bg-[#d3d3d3] rounded-tl-2xl rounded-bl-2xl items-center justify-center h-screen flex-1">
        <img
          src="//assets.api.uizard.io/api/cdn/stream/7b63b700-42c3-436c-826a-f40b4f3a5154.png"
          alt="Sign Up"
        />
      </div>
    </div>
  );
};

export default SignUp;
