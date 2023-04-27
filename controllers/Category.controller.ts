import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import CategoryModel from "../models/Category.model";
import log from "../utility/logger";
import { IGetCategoryParams, IGetCategoryQuery } from "../dto/Category.dto";
import { GenCode, GenSlug } from '../utility/VendorUtility';
import {
    IVendorCreateProduct,
    IVendorCategory,
    IVendorAddSub
  } from '../dto/Vendor.dto';

/**
 * @description Vendor Add Category
 * @method POST
 * @route /api/vendors/add_category
 * @access private
 */

export const addCategory = async(req: Request, res: Response) => {
    try{
      const { name } = <IVendorCategory>req.body;
      const category: any = await CategoryModel.findOne({ name });
      if(category){
        return res.status(400).json({
          message: "This Category Exists Already"
        })
      }
      const newCategory = await CategoryModel.create({
        name
      });
      return res.status(200).json({
        message: "Category Added Successfully",
        result: newCategory
      })
    }catch(error){
      log.error(error)
      res.status(400).json({
        message: "Error Adding Category"
      })
    }
  }
  
  /**
   * @description Vendor Create Product
   * @method POST
   * @route /api/vendors/{categoryId}/add_sub_category
   * @access private
   */
  export const addSubCategory = async(req: Request, res: Response) => {
    try{
      const { categoryId } = req.params;
      const { name } = <IVendorAddSub>req.body;
      const category: any = await CategoryModel.findById( categoryId ).exec();
      if(!category){
        return res.status(400).json({
          message: "No Category with Such Id"
        });
      }
      if(category.subCategory.includes(name)){
        return res.status(400).json({
          message: "This Sub Category Exists Already"
        });
      }
      category.subCategory.push(name)
      const savedCategory = await category.save()
      return res.status(200).json({
        message: "Sub Category Added Successfully",
        result: savedCategory
      })
    }catch(error){
      log.error(error)
      res.status(400).json({
        message: "Error Adding Sub Category"
      });
    }
  }
  
  /**
   * @description Vendor Create Product
   * @method POST
   * @route /api/vendors/create_product
   * @access private
   */
  
  export const createProduct = async(req: Request, res: Response) => {
    try{
      const {
              name,
              brand,
              product_type,
              quantity,
              description,
              prize,
              discount,
              attribute,
              category
            } = <IVendorCreateProduct>req.body;
            const categoryInfo: any = await CategoryModel.findOne({name: category});
        
            if(!categoryInfo){
              return res.status(400).json({
                message: "No Such Category"
              });
            }
            const checkProd: any = await ProductModel.findOne({ name });
            if(checkProd && checkProd.quantity > 0 && checkProd.is_sold === false){
              return res.status(400).json({
                message: "This Product Exists And Is Yet To Be Sold Out"
              });
            }
            const product = await ProductModel.create({
              name,
              store_id: await GenCode(),
              brand,
              product_type,
              quantity,
              description,
              code: await GenCode(),
              slug: GenSlug(name),
              prize,
              discount,
              attribute,
              is_sold: false,
              category: categoryInfo.id
            });
            return res.status(200).json({
              message: "Product created Successfully",
              result: product
            })
    }catch(error){
      log.error(error)
      res.status(400).json({
        message: "Error Creating product"
      })
    }
  };

/**
 * @description get all category of products
 * @method GET
 * @route /api/categories/getAllCategory
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
        .status(404)
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

/**
 * @description get single category of products
 * @method GET
 * @route /api/categories/getSingleProduct
 * @access public
 */
export const getSingleProd = async(req: Request, res: Response) => {
    try{
        const { prodId } = req.params;
        const getProd: any = await ProductModel.findById( prodId ).exec()
        if(getProd === null || !getProd){
            return res.status(400).json({
                message: "No Product With This Id"
            });
        }
        const result = {
            Product_Name: getProd.name,
            Brand: getProd.brand,
            product_type: getProd.product_type,
            Quantity: getProd.quantity,
            Description: getProd.description,
            Price: getProd.price,
            category_Id: getProd.category 
        }
        return res.status(200).json({
            message: "Product Found",
            result: result
        });
    }catch(error){
      console.log(error)
        res.status(400).json({
            message: "Error Getting Single Product"
        })
    }
};