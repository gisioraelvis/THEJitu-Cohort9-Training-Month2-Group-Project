export interface IBrand {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICategory {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IProduct {
  id: number;
  userId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
  brandId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IProductObject {
  id: number;
  userId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
  brandName: string;
  categories: { categoryId: number; categoryName: string }[];
  reviews: { reviewId: number; rating: number; comment: string }[];
  createdAt: string;
  updatedAt: string;
}
