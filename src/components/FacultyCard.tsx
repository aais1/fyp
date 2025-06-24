import React from 'react';
import { FacultyCardProps } from '../types';
import { useNavigate } from 'react-router-dom';

const FacultyCard: React.FC<FacultyCardProps> = ({
  _id,
  name,
  profileImage,
  profileLink,
  designation,
  hecApproved,
  interest,
  department,
  rating,
  totalReviews,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex relative w-full items-center bg-white border border-gray-900 cursor-pointer hover:-translate-y-1 transition-all border-opacity-50 duration-200 hover:shadow-xl rounded-lg p-4 shadow-md"
      onClick={() => {
        navigate('/faculty-profile/' + _id);
      }}
    >
      <img
        src={profileImage}
        alt={name}
        className="size-20 rounded-full border-3 border-gray-900"
      />
      <div className="ml-2">
        <a
          href={profileLink}
          target="_blank"
          className="flex justify-between items-center gap-x-2"
          rel="noopener noreferrer"
        >
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          {hecApproved && (
            <p
              title="This Dudee is approved by the HEC Himself 😲"
              className="text-xs absolute -bottom-1 right-1 self-start w-fit my-2 font-bold text-gray-900 border border-gray-900 py-1 px-1 rounded-xl "
            >
              HEC Approved
            </p>
          )}
        </a>
        <p className="text-sm text-gray-600 font-bold line-clamp-1">
          {designation}
        </p>
        <p className="text-xs text-gray-500">{department}</p>
        <p className="text-xs text-gray-500 line-clamp-1">
          Specializes in <span className="font-medium">{interest}</span>
        </p>
        <p className="text-sm font-medium">
          ⭐ {rating} ({totalReviews} reviews)
        </p>
      </div>
    </div>
  );
};

export default FacultyCard;
