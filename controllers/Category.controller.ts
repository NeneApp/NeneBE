import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import log from "../utility/logger";
import { IGetCategoryParams, IGetCategoryQuery } from "../dto/Category.dto";
import CategoryModel from "../models/Category.model";

/**
 * @description get all category of products
 * @method GET
 * @route /api/buyers/getAllCategory
 * @access public
 */

export async function getAllCategory(req: Request, res: Response) {
  try {
    const allCategories: any = await ProductModel.find({})
      .populate("category", "name")
      .select("name subCategory");

    if (!allCategories) {
      return res
        .status(401)
        .json({ message: "Something went wrong in fetching categories" });
    }

    return res.status(200).json({
      message: "All categories displayed successfully",
      allCategories,
    });
  } catch (error: any) {
    log.error(error);
    return res.status(500).json({
      message: "An Error Occured",
      error: error,
    });
  }
}

/**
 * @description
 * @method GET
 * @route /api/categories/:categoryName
 * @access public
 */

export const getProductsInCategory = async (
  req: Request<IGetCategoryParams, {}, {}, IGetCategoryQuery>,
  res: Response
) => {
  const categoryName: string = req.params.categoryName;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 8;
  // let filterType: string = req.query.filter;
  let sortField = {};
  let queryField: {};

  if (req.query.orderBy) {
    let sortArray: string[] = req.query.orderBy.split(" ");
    sortArray[0] === "new"
      ? (sortField = { createdAt: sortArray[1] })
      : (sortField = { name: "asc" });
  } else {
    sortField = { name: "asc" };
  }

  try {
    const productCategory = await CategoryModel.findOne({
      name: categoryName,
    });
    if (req.query.filter) {
      let filterType = req.query.filter.split(";");
      switch (filterType[0]) {
        case "prdtType":
          queryField = {
            category: productCategory?.id,
            productType: filterType[1],
          };
          break;

        case "size":
          queryField = {
            category: productCategory?.id,
            "attributes.size": filterType[1],
          };
          break;

        case "height":
          queryField = {
            category: productCategory?.id,
            "atrributes.height": filterType[1],
          };
          break;

        //modify later if collection is to be added as filter parameter
        // case "collections":
        //   queryField = {
        //     category: productCategory?.id,
        //     collections: filterType[1],
        //   };
        //   break;

        default:
          queryField = { category: productCategory?.id };
          break;
      }
    } else {
      queryField = { category: productCategory?.id };
    }

    const queriedProducts = await ProductModel.find(queryField)
      .populate("category", ["name", "_id"])
      // .skip(page * limit)
      // .limit(limit)
      .sort(sortField)
      .exec();

    if (queriedProducts.length === 0) {
      return res
        .status(401)
        .send({ msg: "No product is available in this category" });
    }

    const totalReturnedProducts: number = queriedProducts.length;
    const totalPages: number = Math.ceil(totalReturnedProducts / limit);
    const result: {}[] = queriedProducts.splice(
      page * limit,
      page * limit + limit
    );
    return res.status(200).send({
      results: result,
      currentPage: req.query.page || 1,
      limit,
      totalPages,
      totalReturnedProducts,
    });
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", error });
  }
};
