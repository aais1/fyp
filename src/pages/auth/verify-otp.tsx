import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const name = location.state?.name || '';
  const password = location.state?.password || '';

  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [resendTime, setResendTime] = useState<number>(60);
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resendLoading, setResendLoading] = useState<boolean>(false);

  // Countdown Timer for Resend OTP
  useEffect(() => {
    if (resendTime > 0) {
      const timer = setInterval(() => setResendTime(resendTime - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [resendTime]);

  // Handle OTP Input
  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (value !== '' && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };

  // Send OTP to email (Resend)
  const handleSendOTP = async () => {
    if (!email) {
      setMessage('Email not found. Please sign up again.');
      return;
    }

    setResendLoading(true);
    try {
      console.log(email, name, password);
      await axios.post(import.meta.env.VITE_BACKEND_URL + '/auth/send-otp', {
        email,
        name,
        password,
      });
      setMessage('OTP resent successfully!');
      setResendTime(60);
    } catch {
      setMessage('Failed to resend OTP. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  // Verify OTP & Create User
  const handleVerify = async () => {
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setMessage('Please enter a valid 4-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'import.meta.VITE_BACKEND_URL/auth/verify-otp',
        {
          email,
          otp: otpCode,
        }
      );

      if (response.status === 200) {
        toast.success('Account created successfully! Please log in.');
        navigate('/auth/sign-in');
      } else {
        toast.error(response.data.message || 'Failed to verify OTP.');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">Verify OTP</h1>

      <div className="bg-white w-full max-w-md p-8 shadow-lg rounded-lg">
        <p className="text-gray-600 text-center mb-4">
          Enter the 4-digit code sent to <strong>{email}</strong>
        </p>

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-2xl border rounded-lg focus:ring focus:ring-blue-300 outline-none"
            />
          ))}
        </div>

        {/* Verify Button with Loading */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className={`w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg mt-6 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Verify OTP'}
        </button>

        {message && <p className="text-center text-red-500 mt-4">{message}</p>}

        {/* Resend OTP */}
        <p className="text-center text-gray-600 mt-4">
          Didn’t receive the code?
          {resendTime > 0 ? (
            <span className="text-gray-500">Resend in {resendTime}s</span>
          ) : (
            <button
              onClick={handleSendOTP}
              disabled={resendLoading}
              className={`text-blue-500 hover:underline font-semibold ${
                resendLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
          )}
        </p>

        {/* Back to Login */}
        <p className="text-center text-gray-600 mt-4">
          <Link
            to="/auth/sign-in"
            className="text-blue-500 hover:underline font-semibold"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
