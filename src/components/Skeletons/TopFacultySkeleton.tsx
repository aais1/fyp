import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
const TopFacultySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
      {Array(3)
        .fill('')
        .map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm animate-pulse"
          >
            <div className="flex items-center space-x-4">
              {/* Skeleton for profile image */}
              <Skeleton circle width={50} height={50} />
              <div className="flex flex-col w-full justify-center">
                {/* Skeleton for name */}
                <Skeleton width={200} height={20} />
                {/* Skeleton for department */}
                <Skeleton width={150} height={15} />
                {/* Skeleton for rating */}
                <Skeleton width={120} height={15} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TopFacultySkeleton;
