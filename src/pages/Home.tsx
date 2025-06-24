import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div
        className="relative bg-cover z-0 bg-center min-h-[250px] md:min-h-[300px] px-6 py-10 md:py-20 flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            'url(https://assets.api.uizard.io/api/cdn/stream/0c2ad4f9-cf8d-4bd2-93da-995a9ed144c0.png)',
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative text-center text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Find & Rate Your Mental Health Companion
          </h1>
          <p className="mt-2 text-lg md:text-xl opacity-90">
            Enhance your well-being with personalized AI support
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-2 py-4 md:px-8 md:py-6 md:pb-12">
        <div className="flex flex-col py-12 items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
            How MindMate Can Help
          </h1>

          {/* Search Bar */}
          {/* <form
            onSubmit={handleSearchSubmit}
            className="mt-6 flex md:w-[60%] w-full items-center gap-4"
          >
            <input
              type="text"
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search for mental health topics..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-indigo-600 transition"
            >
              Search
            </button>
          </form> */}

          {/* "Get Started" Button for Logged In Users */}
          {user && (
            <Link to="/chat">
              <button className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-green-600 transition">
                Get Started
              </button>
            </Link>
          )}
        </div>

        {/* Cards displaying features of MindMate AI Bot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {/* Card 1 */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-6 text-gray-700">
              <i className="fas fa-heart"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Emotional Support
            </h3>
            <p className="text-sm text-gray-600">
              Engage in empathetic conversations to help you manage stress,
              anxiety, and emotions.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-6 text-gray-700">
              <i className="fas fa-chart-line"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Mood Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Track your daily moods and activities, helping you understand
              emotional patterns over time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-6 text-gray-700">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Crisis Detection
            </h3>
            <p className="text-sm text-gray-600">
              Detect signs of distress and provide escalation to professional
              help when needed.
            </p>
          </div>

          {/* Card 4 */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-6 text-gray-700">
              <i className="fas fa-hand-holding-heart"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Self-Care Recommendations
            </h3>
            <p className="text-sm text-gray-600">
              Get personalized self-care suggestions based on your emotional
              history and needs.
            </p>
          </div>

          {/* Card 5 */}
          <div className="border border-gray-300 rounded-lg p-8 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
            <div className="text-4xl mb-6 text-gray-700">
              <i className="fas fa-comments"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              24/7 Availability
            </h3>
            <p className="text-sm text-gray-600">
              Always available to provide emotional support and guidance,
              anytime you need it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
