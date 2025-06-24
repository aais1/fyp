import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const FacultyProfileSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 md:p-6 mt-6">
      <div className="md:w-[75vw] mx-auto">
        <div className="flex md:flex-row flex-col justify-between w-full items-start gap-1 md:gap-4">
          {/* Skeleton for faculty image */}
          <div className="flex justify-start space-x-2 md:space-x-4">
            <Skeleton circle width={80} height={80} />
            <div>
              <div className="flex md:items-center items-start md:flex-row flex-col gap-x-4">
                {/* Skeleton for faculty name */}
                <Skeleton width={200} height={30} />
                {/* Skeleton for HEC approved */}
                <Skeleton width={100} height={15} />
              </div>
              {/* Skeleton for department and designation */}
              <Skeleton width={150} height={15} />
              {/* Skeleton for research interest */}
              <Skeleton width={250} height={15} />
              {/* Skeleton for profile link */}
              <Skeleton width={150} height={15} />
            </div>
          </div>

          {/* Skeleton for rating */}
          <Skeleton width={100} height={40} className="mt-4" />
        </div>

        {/* Skeleton for review submission and distribution */}
        <div className="my-4">
          <Skeleton width={200} height={20} />
          <Skeleton width={200} height={10} />
          <Skeleton width={200} height={10} />
        </div>

        {/* Skeleton for user review */}
        <div className="border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            <Skeleton width={100} height={20} />
          </h2>
          <div className="flex justify-between items-start mt-4">
            <div className="flex flex-col w-[calc(100vw-60px)]">
              {/* Skeleton for review text */}
              <Skeleton count={2} />
              <div className="mt-3">
                <Skeleton width={100} height={25} />
              </div>
            </div>
          </div>
        </div>

        {/* Skeleton for other reviews */}
        <h2 className="text-lg font-semibold mt-6">
          <Skeleton width={150} height={20} />
        </h2>
        <div className="border-b py-4 max-w-full flex gap-4">
          <Skeleton circle width={40} height={40} />
          <div className="w-[calc(100%-55px)]">
            <Skeleton width={200} height={20} />
            <div className="flex items-center">
              <Skeleton width={100} height={15} />
            </div>
            <Skeleton width={300} height={15} />
            <Skeleton width={150} height={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfileSkeleton;
