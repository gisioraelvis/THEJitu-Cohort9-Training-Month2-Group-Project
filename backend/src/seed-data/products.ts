import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";

interface IProductSeed {
  name: string;
  image: string;
  description: string;
  brandId: string;
  categoryId: string;
  price: number;
  countInStock: number;
}

const products: IProductSeed[] = [
  {
    name: "iPhone 11",
    image: "https://www.example.com/iphone11.jpg",
    description: "The latest iPhone with a dual-camera system.",
    brandId: "1",
    categoryId: "1",
    price: 799,
    countInStock: 100,
  },
  {
    name: "iPhone 11",
    image: "https://www.example.com/iphone11.jpg",
    description: "The latest iPhone with a dual-camera system.",
    brandId: "1",
    categoryId: "1",
    price: 799,
    countInStock: 100,
  },
  {
    name: "Samsung Galaxy S21",
    image: "https://www.example.com/samsunggalaxys21.jpg",
    description:
      "The latest Samsung phone with a powerful camera and 5G support.",
    brandId: "2",
    categoryId: "1",
    price: 999,
    countInStock: 80,
  },
  {
    name: "Google Pixel 6",
    image: "https://www.example.com/googlepixel6.jpg",
    description:
      "The latest Google phone with a fantastic camera and smooth software experience.",
    brandId: "3",
    categoryId: "1",
    price: 899,
    countInStock: 50,
  },
  {
    name: "MacBook Pro 16-inch",
    image: "https://www.example.com/macbookpro16.jpg",
    description:
      "The latest MacBook Pro with a large 16-inch display and powerful performance.",
    brandId: "4",
    categoryId: "2",
    price: 1999,
    countInStock: 30,
  },
  {
    name: "Dell XPS 13",
    image: "https://www.example.com/dellxps13.jpg",
    description: "A high-performance laptop with a stunning 13-inch display.",
    brandId: "5",
    categoryId: "2",
    price: 1399,
    countInStock: 60,
  },
  {
    name: "Microsoft Surface Book 3",
    image: "https://www.example.com/surfacebook3.jpg",
    description:
      "The latest Surface Book with a detachable design and powerful performance.",
    brandId: "6",
    categoryId: "2",
    price: 1599,
    countInStock: 40,
  },
  {
    name: "iPad Pro 12.9-inch",
    image: "https://www.example.com/ipadpro129.jpg",
    description:
      "The latest iPad Pro with a large 12.9-inch display and powerful performance.",
    brandId: "7",
    categoryId: "3",
    price: 999,
    countInStock: 70,
  },
  {
    name: "Samsung Galaxy Tab S7",
    image: "https://www.example.com/samsunggalaxytabs7.jpg",
    description: "A high-performance tablet with a large 11-inch display.",
    brandId: "8",
    categoryId: "3",
    price: 699,
    countInStock: 50,
  },
  {
    name: "Amazon Kindle Oasis",
    image: "https://www.example.com/amazonkindleoasis.jpg",
    description:
      "A high-performance e-reader with a large 7.5-inch display and a built-in light.",
    brandId: "9",
    categoryId: "3",
    price: 349,
    countInStock: 30,
  },
];

export const seedProducts = async () => {
  const dbUtils = new DatabaseUtils();

  try {
    await dbUtils.exec("usp_DeleteAllProducts", {});
    for (const product of products) {
      await dbUtils.exec("usp_CreateProduct", {
        userId: 1,
        name: product.name,
        image: product.image,
        description: product.description,
        price: product.price,
        countInStock: product.countInStock,
      });
    }

    CreateLog.info(`${products.length} products seeded`);
  } catch (error) {
    CreateLog.error(error);
    process.exit(1);
  }
};

interface ICategorySeed {
  name: string;
}

const categories: ICategorySeed[] = [
  {
    name: "Smartphones",
  },
  {
    name: "Laptops",
  },
  {
    name: "Tablets",
  },
  {
    name: "Televisions",
  },
  {
    name: "Smartwatches",
  },
  {
    name: "Audio Devices",
  },
  {
    name: "Gaming Consoles",
  },
  {
    name: "Accessories",
  },
];

export const seedCategories = async () => {
  const dbUtils = new DatabaseUtils();

  try {
    await dbUtils.exec("usp_DeleteAllCategories", {});
    for (const category of categories) {
      await dbUtils.exec("usp_CreateCategory", {
        name: category.name,
      });
    }

    CreateLog.info(`${categories.length} categories seeded`);
  } catch (error) {
    CreateLog.error(error);
    process.exit(1);
  }
};

interface IBrandSeed {
  name: string;
}

const brands: IBrandSeed[] = [
  {
    name: "Apple",
  },
  {
    name: "Microsoft",
  },
  {
    name: "Samsung",
  },
  {
    name: "Google",
  },
  {
    name: "Huawei",
  },
  {
    name: "LG",
  },
  {
    name: "Sony",
  },
  {
    name: "Nokia",
  },
  {
    name: "Motorola",
  },
  {
    name: "Xioami",
  },
];

export const seedBrands = async () => {
  const dbUtils = new DatabaseUtils();

  try {
    await dbUtils.exec("usp_DeleteAllBrands", {});
    for (const brand of brands) {
      await dbUtils.exec("usp_CreateBrand", {
        name: brand.name,
      });
    }
    CreateLog.info(`${brands.length} brands seeded`);
  } catch (error) {
    CreateLog.error(error);
    process.exit(1);
  }
};

// Seed the database, sequentially
(async () => {
  await seedBrands();
  await seedCategories();
  await seedProducts();
  process.exit();
})();
