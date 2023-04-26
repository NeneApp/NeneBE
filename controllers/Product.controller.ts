import { Request, Response } from "express";
import ProductModel from "../models/Product.model";
import { IGetBrandParams, IGetBrandQuery } from "../dto/Product.dto";
import { BuyerModel } from "../models";
import jwt from "jsonwebtoken";

/**
 * @description
 * @method GET
 * @route /api/products/:productId/wishlist
 * @access private
 */
export const addOrRemoveFromWishlist = async (req: Request, res: Response) => {
  const brandId: string = req.params.productId;
  try {
    const user = await BuyerModel.findOne({ _id: req.user.id });
 
      if (user!.wishlist.includes(brandId)) {
        const brandIdIndex: number = user!.wishlist.indexOf(brandId);
        user!.wishlist.splice(brandIdIndex, 1);
        await user!.save();
        return res.status(200).send({ message: "Item removed from wishlist!" });
      } else {
        user!.wishlist.push(brandId);
        await user!.save();
        return res.status(200).send({ message: "Item added to wishlist!" });
      }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

/**
 * @description
 * @method GET
 * @route /api/products/brand/:brandName
 * @access public
 */

export const getProductsByBrand = async (
  req: Request<IGetBrandParams, {}, {}, IGetBrandQuery>,
  res: Response
) => {
  const brandName: string = req.params.brandName;
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const queriedProducts = await ProductModel.find({ brand: brandName })
      .populate("category", ["name", "_id"])
      // .skip(page * limit)
      // .limit(limit)
      .sort({ createdAt: "desc" })
      .exec();

    if (queriedProducts.length === 0) {
      return res
        .status(404)
        .send({ msg: "No product is available for this brand!" });
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
