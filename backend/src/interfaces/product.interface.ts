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
