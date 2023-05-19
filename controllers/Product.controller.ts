import { Request, Response } from "express";
import {FilterQuery} from "mongoose";
import ProductModel, {ProductDoc} from "../models/Product.model";
import { IGetBrandParams, IGetBrandQuery, IMatch, ISearchQuery, ISortPriceQuery, IsortPriceParams } from "../dto/Product.dto";
import { BuyerModel } from "../models";
import log from "../utility/logger";

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


// export const searchProduct = async ( 
//   req: Request<{}, {}, {}, ISearchQuery>, 
//   res: Response
//   ) => {
//   try {
//     let match = {} as IMatch;
//     let {name, product_type} = req.query;

//     if (name) {
//       match.name = new RegExp(name, "i")
//     }
//     if (product_type) {
//       match.product_type = new RegExp(product_type, "i")
//     }

//     const products = await ProductModel.aggregate([ {$match: match}])

//     return res.status(200).json({message: "match found", products})
//   } catch (error) {
//     log.info(error);
//     return res.status(500).send({ msg: "Internal server error", error });
//   }
// }

/**
 * favourites
 * what's new 
 * price high to low
 * price low to high
*/
export const searchProduct = async (
  req: Request<IsortPriceParams, {}, {}, ISortPriceQuery>,
  res: Response
) => {
  const page = Number(req.query.page) - 1|| 0;
  const limit = Number(req.query.limit) || 5;
  const skipIndex = (page - 1) * limit;
  const { name, product_type, size, colour, body_fit, price_range }: ISortPriceQuery = req.query;
  let sort:any = req.query.sort;

  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

		let sortBy: any = {};
		if (sort[1]) {
			sortBy[sort[0]] = sort[1];
		} else {
			sortBy[sort[0]] = "asc";
		}
    
  try {
    // sort by price 
    if (sort == "new") {
      sort = await ProductModel.find({}).sort({createdAt: -1});
    }
    else if (sort == "priceFromHighToLow") {
      sort = await ProductModel.find({}).sort({price: -1});
    }
    else if (sort == "priceFromLowToHigh") {
      sort = await ProductModel.find({}).sort({price: 1}).skip(skipIndex).limit(limit);
    }

    // const sortedResult: number = sort.length;
    // const totalPages: number = Math.ceil(sortedResult / limit);


    // // const filter = {};
    // const filter: FilterQuery<ProductDoc> = {};

    // if (name) {
    //   filter.name = { $regex: name, $options: "i" };
    // }

    // if (product_type) {
    //   filter.product_type = product_type;
    // }

    // if (size) {
    //   filter.size = size;
    // }

    // if (colour) {
    //   filter.colour = { $regex: colour, $options: "i" };
    // }

    // if (body_fit) {
    //   filter.body_fit = body_fit;
    // }

    // if (price_range) {
    //   const [minPrice, maxPrice] = price_range.split("-");
    //   filter.price = { $gte: minPrice, $lte: maxPrice };
    // }

    return res.status(200).json({sort});
    }


  catch(error: any) {
    console.log(error)
    return res.status(500).send({ msg: "Internal server error", error });
  }
}
