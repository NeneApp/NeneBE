import { Request, Response } from "express";
import CategoryModel from "../models/category.model";
import ProductModel from "../models/product.model";
import log from "../utility/logger";

/**
 * @description get all category of products
 * @method GET
 * @route /api/buyers/getAllCategory
 * @access public
 */

export async function getAllCategory(req: Request, res: Response) {
    try {
        const allCategories: any = await ProductModel
            .find({})
            .populate('category', 'name').select('name subCategory')

        if (!allCategories) {
            return res
                .status(401)
                .json({message: "Something went wrong in fetching categories"})
        }

        return res
            .status(200)
            .json({
                message: "All categories displayed successfully",
                allCategories
            })

    } catch (error: any) {
        log.info(error)
        return res.status(500).json({
          message: "An Error Occured",
          error: error
        });       
    }
}