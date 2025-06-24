const ProfileSkeleton = () => {
  return (
    <div className="bg-white  text-black flex items-center justify-center p-8">
      <div className="flex bg-gray-50 w-full  max-w-5xl shadow-lg rounded-xl overflow-hidden">
        {/* Left Animation Section */}
        <div className="w-1/2 hidden md:block relative">
          <div className="h-full w-full bg-gray-200 animate-pulse"></div>
        </div>

        {/* Right Profile Skeleton Section */}
        <div className="w-full md:w-1/2 p-10">
          <div className="h-6 bg-gray-300 rounded-lg animate-pulse mb-6"></div>

          <div className="space-y-4">
            {/* Name Field Skeleton */}
            <div>
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
            </div>

            {/* Email Field Skeleton */}
            <div>
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
            </div>

            {/* Modify Password Button Skeleton */}
            <div className="h-8 bg-gray-300 rounded-lg w-1/2 animate-pulse"></div>

            {/* Password Fields Skeleton */}
            <div className="space-y-4">
              <div>
                <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
              </div>

              <div>
                <div className="h-5 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
              </div>

              {/* Show Password Checkbox Skeleton */}
              <div className="flex items-center">
                <div className="h-5 w-5 bg-gray-300 rounded mr-2 animate-pulse"></div>
              </div>
            </div>

            {/* Submit Button Skeleton */}
            <div className="h-12 bg-gray-800 rounded-lg w-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
