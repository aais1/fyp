export interface FacultyCardProps {
  _id: string;
  name: string;
  profileImage: string;
  profileLink: string;
  designation: string;
  hecApproved: boolean;
  interest: string;
  department: string;
  rating: number;
  totalReviews: number;
}

export interface Review {
  _id?: string;
  userId: string;
  user: string;
  date: string;
  rating: number;
  comment: string;
  likes: number;
  replies: number;
  userImage: string;
  anonymous?: boolean;
}

export interface Faculty {
  _id: string;
  name: string;
  profileImage: string;
  profileLink: string;
  designation: string;
  department: string;
  hecApproved: boolean;
  interest: string;
  totalReviews: number;
  rating: string;
  ratingDistribution: Record<number, number>;
  reviews: Review[];
}

export type UserProfile = {
  _id: string;
  name: string;
  email: string;
};
