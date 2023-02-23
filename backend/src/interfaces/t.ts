// Interface for User
export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Product
export interface Product {
  id?: number;
  userId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Brand
export interface Brand {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Category
export interface Category {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for Review
export interface Review {
  id?: number;
  userId: number;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for ProductBrand
export interface ProductBrand {
  productId: number;
  brandId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for ProductCategory
export interface ProductCategory {
  productId: number;
  categoryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for ProductReview
export interface ProductReview {
  productId: number;
  reviewId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
