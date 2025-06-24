import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center px-6">
      {/* Rubber Duck GIF */}
      <iframe
        src="https://giphy.com/embed/12zV7u6Bh0vHpu"
        width="300"
        height="200"
        frameBorder="0"
        className="giphy-embed mb-6"
        style={{ pointerEvents: 'none' }}
        allowFullScreen
      ></iframe>

      {/* Error Text */}
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-2xl text-gray-700 font-semibold mt-4">
        Oops! My rubber duck couldn't find this page. 🦆
      </h2>
      <p className="text-gray-600 mt-2">
        It seems like you're lost in the internet ocean. Maybe try searching
        again?
      </p>

      {/* Back Home Button */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-gray-900 text-white text-lg rounded-lg shadow-lg hover:bg-gray-800 transition-all"
      >
        🏠 Take Me Home
      </Link>
    </div>
  );
};

export default NotFound;
