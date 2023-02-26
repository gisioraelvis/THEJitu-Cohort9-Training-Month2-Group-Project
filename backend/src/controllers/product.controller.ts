import { Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import { DatabaseUtils } from "../utils/db.util";
import { CreateLog } from "../utils/logger.util";
import { IRequestWithUser } from "../interfaces/request-with-user.interface";
import dotenv from "dotenv";
import { IProduct, IProductObject } from "../interfaces/product.interface";
dotenv.config({ path: __dirname + "/../../.env" });

import {
  ProductCreateDto,
  ProductGetDto,
  ProductUpdateDto,
} from "../dtos/product.dto";

const dbUtils = new DatabaseUtils();

/**
 * @desc    Fetch all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await dbUtils.query("SELECT * FROM products");

    if (products.recordset.length > 0) {
      return res.status(200).json(products.recordset);
    }

    // if no products found return empty array
    if (products.recordset.length === 0) {
      return res.status(200).json(products.recordset);
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Fetch single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  try {
    const product = await dbUtils.exec("usp_FindProductById", {
      productId,
    });

    function reduceProducts(products: IProduct[]): IProductObject {
      const reduced: IProductObject = {
        id: products[0].id,
        userId: products[0].userId,
        name: products[0].name,
        image: products[0].image,
        description: products[0].description,
        price: products[0].price,
        countInStock: products[0].countInStock,
        brandName: products[0].brandName,
        categories: [],
        reviews: [],
        createdAt: products[0].createdAt,
        updatedAt: products[0].updatedAt,
      };

      products.forEach((product) => {
        const category = {
          categoryId: product.categoryId,
          categoryName: product.categoryName,
        };
        if (
          !reduced.categories.some((c) => c.categoryId === category.categoryId)
        ) {
          reduced.categories.push(category);
        }

        const review = {
          reviewId: product.reviewId,
          rating: product.rating,
          comment: product.comment,
        };
        if (!reduced.reviews.some((r) => r.reviewId === review.reviewId)) {
          reduced.reviews.push(review);
        }
      });

      return reduced;
    }

    if (product.recordset.length > 0) {
      return res.status(200).json(reduceProducts(product.recordset));
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Create a product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req: Request, res: Response) => {
  const { error } = ProductCreateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const {
    userId,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  try {
    const product = await dbUtils.exec("usp_CreateProduct", {
      userId,
      name,
      price,
      description,
      image,
      countInStock,
    });

    if (product.recordset.length > 0) {
      return res.status(201).json(product.recordset[0]);
    } else {
      return res.status(400).json({ message: "Product creation failed" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = async (req: IRequestWithUser, res: Response) => {
  const { error } = ProductUpdateDto.validate(req.body);
  if (error) {
    return res.status(422).json(error.details[0].message);
  }

  const productId = req.params.id as string;

  const { id: userId } = req.user as IUser;

  const { name, price, description, image, countInStock } = req.body;

  try {
    const product = await dbUtils.exec("usp_FindProductById", { productId });

    if (product.recordset.length > 0) {
      const updatedProduct = await dbUtils.exec("usp_UpdateProduct", {
        id: productId,
        userId,
        name,
        price,
        description,
        image,
        countInStock,
      });

      if (updatedProduct.recordset.length > 0) {
        return res.status(200).json({
          message: "Product updated",
          updatedProduct: updatedProduct.recordset[0],
        });
      } else {
        return res.status(400).json({ message: "Product update failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Product with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

/**
 * @desc    Delete a product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as string;

  try {
    const product = await dbUtils.exec("usp_FindProductById", { productId });

    if (product.recordset.length > 0) {
      const deletedProduct = await dbUtils.exec("usp_DeleteProductById", {
        id: productId,
      });

      if (
        deletedProduct.recordsets.length === 0 ||
        deletedProduct.recordset === undefined
      ) {
        return res.status(200).json({
          message: "Product deleted",
        });
      } else {
        return res.status(400).json({ message: "Product delete failed" });
      }
    } else {
      return res
        .status(404)
        .json({ message: "Product with the given id does not exist" });
    }
  } catch (error: any) {
    res.status(500).json(error.message);
    CreateLog.error(error);
  }
};

// TODO: create review controller
// /**
//  * @desc    Create new review
//  * @route   POST /api/products/:id/reviews
//  * @access  Private
//  */

// export const createProductReview = async (
//   req: IRequestWithUser,
//   res: Response
// ) => {
//   const { error } = ProductReviewDto.validate(req.body);
//   if (error) {
//     return res.status(422).json(error.details[0].message);
//   }

//   const productId = req.params.id as string;

//   const { id: userId } = req.user as IUser;

//   const { rating, comment } = req.body;

//   try {
//     const product = await dbUtils.exec("usp_FindProductById", { productId });

//     if (product.recordset.length > 0) {
//       const alreadyReviewed = product.recordset[0].reviews.find(
//         (r: any) => r.user.toString() === userId.toString()
//       );

//       if (alreadyReviewed) {
//         return res.status(400).json({ message: "Product already reviewed" });
//       }

//       const review = {
//         name: req.user.name,
//         rating: Number(rating),
//         comment,
//         user: userId,
//       };

//       product.recordset[0].reviews.push(review);

//       product.recordset[0].numReviews = product.recordset[0].reviews.length;

//       product.recordset[0].rating =
//         product.recordset[0].reviews.reduce(
//           (acc: any, item: any) => item.rating + acc,
//           0
//         ) / product.recordset[0].reviews.length;

//       const updatedProduct = await dbUtils.exec("usp_UpdateProduct", {
//         id: productId,
//         userId,
//         name: product.recordset[0].name,
//         price: product.recordset[0].price,
//         description: product.recordset[0].description,
//         image: product.recordset[0].image,
//         countInStock: product.recordset[0].countInStock,
//       });

//       if (updatedProduct.recordset.length > 0) {
//         return res.status(201).json({ message: "Review added" });
//       } else {
//         return res.status(400).json({ message: "Review add failed" });
//       }
//     } else {
//       return res
//         .status(404)
//         .json({ message: "Product with the given id does not exist" });
//     }
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };

// /**
//  * @desc    Get top rated products
//  * @route   GET /api/products/top
//  * @access  Public
//  */
// export const getTopProductsByRating = async (req: Request, res: Response) => {
//   try {
//     const products = await dbUtils.exec(
//       "usp_TopRatedProductsWeightedRating",
//       {}
//     );
//     CreateLog.debug(products);

//     // TODO: Implement pagination

//     if (products.recordset.length > 0) {
//       return res.status(200).json(products.recordset);
//     } else {
//       return res.status(404).json({ message: "No products found" });
//     }
//   } catch (error: any) {
//     res.status(500).json(error.message);
//     CreateLog.error(error);
//   }
// };
