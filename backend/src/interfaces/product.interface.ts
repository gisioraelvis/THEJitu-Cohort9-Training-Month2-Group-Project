export interface Brand {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  userId: string;
  name: string;
  image: string;
  description: string;
  brands: Brand[];
  categories: Category[];
  reviews: Review[];
  price: number;
  countInStock: number;
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
  brandName: string;
  categoryId: number;
  categoryName: string;
  reviewId: number;
  rating: number;
  comment: string;
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
