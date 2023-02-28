import { IProduct, IProductObject } from './shared/Interfaces/product';

export const PRODUCTS: IProduct[] = [
  {
    id: 1,
    userId: 1,
    name: 'Product 1',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/ps5_wb6syv.webp',
    description: 'This is the description of Product 1',
    price: 19.99,
    countInStock: 10,
    brandId: 1,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 2,
    userId: 1,
    name: 'Product 2',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/Galaxy-S23-Ultra_lp9l3q.png',
    description: 'This is the description of Product 2',
    price: 29.99,
    countInStock: 20,
    brandId: 2,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 3,
    userId: 1,
    name: 'Product 3',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/iphone14-pro-max_rclytu.jpg',
    description: 'This is the description of Product 3',
    price: 39.99,
    countInStock: 30,
    brandId: 3,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 4,
    userId: 1,
    name: 'Product 4',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/logitech-mx3_lqmhth.jpg',
    description: 'This is the description of Product 4',
    price: 49.99,
    countInStock: 40,
    brandId: 4,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 5,
    userId: 1,
    name: 'Product 5',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145661/samples/ecommerce/airpods-g3_jk6ian.jpg',
    description: 'This is the description of Product 5',
    price: 59.99,
    countInStock: 50,
    brandId: 5,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 6,
    userId: 1,
    name: 'Product 6',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/playstation_ahrpeh.jpg',
    description: 'This is the description of Product 6',
    price: 69.99,
    countInStock: 60,
    brandId: 1,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 7,
    userId: 1,
    name: 'Product 7',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/phone_nibiyh.jpg',
    description: 'This is the description of Product 7',
    price: 79.99,
    countInStock: 70,
    brandId: 2,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 8,
    userId: 1,
    name: 'Product 8',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/mouse_hmuueu.jpg',
    description: 'This is the description of Product 8',
    price: 89.99,
    countInStock: 80,
    brandId: 3,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 9,
    userId: 1,
    name: 'Product 9',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/canon-90d_ydrlj7.jpg',
    description: 'This is the description of Product 9',
    price: 99.99,
    countInStock: 90,
    brandId: 4,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
  {
    id: 10,
    userId: 1,
    name: 'Product 10',
    image:
      'https://res.cloudinary.com/webapp-assets/image/upload/v1677145662/samples/ecommerce/google-assistant_yw534q.jpg',
    description: 'This is the description of Product 10',
    price: 109.99,
    countInStock: 100,
    brandId: 5,
    createdAt: '2023-02-23T10:36:57.830Z',
    updatedAt: '2023-02-23T10:36:57.830Z',
  },
];

export const PRODUCTOBJ: IProductObject = {
  id: 1,
  userId: 1,
  name: 'Product 1',
  image:
    'https://res.cloudinary.com/webapp-assets/image/upload/v1677145663/samples/ecommerce/ps5_wb6syv.webp',
  description: 'This is the description of Product 1',
  price: 19.99,
  countInStock: 10,
  brandName: 'Brand 1',
  categories: [
    {
      categoryId: 1,
      categoryName: 'Category 1',
    },
    {
      categoryId: 2,
      categoryName: 'Category 2',
    },
  ],
  reviews: [
    {
      reviewId: 1,
      rating: 4,
      comment: 'This is a review of Product 1',
    },
    {
      reviewId: 2,
      rating: 5,
      comment: 'This is a review of Product 2',
    },
  ],
  createdAt: '2023-02-23T10:36:57.830Z',
  updatedAt: '2023-02-23T10:36:57.830Z',
};
