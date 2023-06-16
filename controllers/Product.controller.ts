import { Request, Response } from "express";
import ProductModel, { ProductDoc } from "../models/Product.model";
import {
  IGetBrandParams,
  IGetBrandQuery,
  ISortPriceQuery,
  IUpdateVendorProductBody,
  IsortPriceParams
} from "../dto/Product.dto";
import { BuyerModel } from "../models";
import VendorModel from "../models/Vendor.model";
import { GenSlug } from "../utility/VendorUtility";
import CategoryModel from "../models/Category.model";
import { FilterQuery } from "mongoose";
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
        .send({ msg: "No products found under the brand!" });
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
 * @description
 * @method GET
 * @route /api/products/my-products
 * @access private
 */

export const getVendorProducts = async (req: Request, res: Response) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const pageNo = parseInt(page) - 1 || 0;
  const limitNo = parseInt(limit) || 8;

  try {
    const vendorsProduct = await VendorModel.find({ _id: req.user.vendor })
      .populate("products")
      .select("products")
      .exec();

    if (vendorsProduct.length === 0) {
      return res.status(404).send({ msg: "You currently have no product" });
    }

    const totalReturnedProducts: number = vendorsProduct.length;
    const totalPages: number = Math.ceil(totalReturnedProducts / limitNo);
    const result: {}[] = vendorsProduct.splice(
      pageNo * limitNo,
      pageNo * limitNo + limitNo
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
 * @description
 * @method PUT
 * @route /api/products/:productId/update
 * @access private
 */

export const updateVendorProduct = async (req: Request, res: Response) => {
  const {
    name,
    brand,
    quantity,
    description,
    prize,
    discount,
    size,
    color,
    weight,
    height,
    category,
    productType,
  } = <IUpdateVendorProductBody>req.body;
  const { productId } = req.params;
  try {
    const vendor = await VendorModel.findOne({ _id: req.user.vendor });

    if (!vendor?.products.includes(productId)) {
      res.status(400).send("msg: User not the owner of product!!!");
    }

    const productDetails = await ProductModel.findOne({ _id: productId })
      .populate("category", ["name", "_id"])
      .exec();

    if (!productDetails) {
      res.status(404).send({ msg: "Product not found!" });
    } else {
      if (name) {
        productDetails.name = name || productDetails.name;
        productDetails.slug = GenSlug(name);
      }
      productDetails.brand = brand || productDetails.brand;
      productDetails.quantity = quantity || productDetails.quantity;
      productDetails.description = description || productDetails.description;
      productDetails.prize = prize || productDetails.prize;
      productDetails.discount = discount || productDetails.discount;

      if (category || productType) {
        const categoryInfo: any = await CategoryModel.findOne({
          name: category,
        });
        if (category) {
          if (!categoryInfo) {
            return res.status(400).json({
              message: "No Such Category",
            });
          } else {
            productDetails.category =
              categoryInfo.id || productDetails.category;
          }
        }

        if (productType) {
          if (categoryInfo.subCategory.includes(productType)) {
            productDetails.productType =
              productType || productDetails.productType;
          } else {
            return res.status(400).json({
              message: "No Such producType",
            });
          }
        }
      }
      productDetails.attribute.size = size || productDetails.attribute.size;
      productDetails.attribute.color = color || productDetails.attribute.color;
      productDetails.attribute.height =
        height || productDetails.attribute.height;
      productDetails.attribute.weight =
        weight || productDetails.attribute.weight;

      productDetails.markModified("attribute");
      const updatedDetails = await productDetails.save();

      res
        .status(200)
        .send({ msg: "Product updated successfully!", updatedDetails });
    }
  } catch (error) {
    res.status(500).send({ msg: "Internal server error", error });
  }
};

/**
 * @description
 * @method DELETE
 * @route /api/products/:productId/
 * @access private
 */

export const deleteVendorProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const vendor = await VendorModel.findOne({ _id: req.user.vendor });

    if (!vendor?.products.includes(productId)) {
      return res.status(400).send("msg: User not the owner of product!!!");
    }

    const productDetails = await ProductModel.findOneAndDelete({  
      _id: productId,
    }).exec();

    if (!productDetails) {
      return res.status(404).send({ msg: "Product not found!" });
    } 

    const productIdIndex: number = vendor!.products.indexOf(productId);
    vendor!.products.splice(productIdIndex, 1);
    await vendor!.save();

    return res.status(200).send({ msg: "Product deleted successfully!" });
  } catch (error) {
    return res.status(500).send({ msg: "Internal server error", error });
  }
};

/**
 * @description
 * @method GET
 * @route /api/products/:vendorSlug/
 * @access private
 */

export const getVendorProd = async (req: Request, res: Response) => {
  try {
    const { vendorSlug } = req.params;
    const checkVendor: any = await VendorModel.findOne({ slug: vendorSlug });
    if (!checkVendor) {
      return res.status(400).json({
        message: "No Vendor With This Slug!",
      });
    }
    const vendorId = checkVendor._id;
    const checkSlug: any = await ProductModel.find({ vendorId });
    if (!checkSlug) {
      return res.status(400).json({
        message: "No Product With This Vendor Slug!",
      });
    }

    return res.status(200).json({
      message: "Vendor Products Fetched Successfully!",
      result: checkSlug,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Getting Vendor Product",
    });
  }
}


/**
 * @description
 * @method GET
 * @route /api/products/search
 * @access public
 */
// 
export const searchProduct = async (
  req: Request<IsortPriceParams, {}, {}, ISortPriceQuery>,
  res: Response
) => {
  const page = Number(req.query.page) - 1|| 0;
  const limit = Number(req.query.limit) || 5;
  const skipIndex = page * limit;
  const { 
    name, 
    product_type,
    size, 
    colour, 
    body_fit, 
    price_range, 
    style, 
    material, 
    length, 
    sleeve_length, 
    neckline, 
    dress_type 
  } = req.query;

  let sort = req.query.sort || 'asc';
  const sortBy: any = {};
  if (sort === 'desc') {
    sortBy.createdAt = -1;
  } else if (sort === 'priceFromHighToLow') {
    sortBy.price = -1;
  } else if (sort === 'priceFromLowToHigh') {
    sortBy.price = 1;
  }
    
  try {  
    const filter: FilterQuery<ProductDoc> = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (product_type) {
      filter.product_type = product_type;
    }

    if (size) {
      filter.size = size;
    }
    if (style) {
      filter.style = style;
    }
    if (material) {
      filter.material = material;
    }
    if (length) {
      filter.length = length;
    }
    if (neckline) {
      filter.neckline = neckline;
    }
    if (sleeve_length) {
      filter.sleeve_length = sleeve_length;
    }
    if (dress_type) {
      filter.dress_type = dress_type;
    }

    if (colour) {
      filter.colour = { $regex: colour, $options: "i" };
    }

    if (body_fit) {
      filter.body_fit = body_fit;
    }

    if (price_range) {
      const [minPrice, maxPrice] = price_range.split("-");
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
     
      let sortedResults: any;
      if (sort === "new") {
        sortedResults = await ProductModel.find(filter)
          .sort({ createdAt: -1 })
          .skip(skipIndex)
          .limit(limit);
      } else if (sort === "priceFromHighToLow") {
        sortedResults = await ProductModel.find(filter)
          .sort({ price: -1 })
          .skip(skipIndex)
          .limit(limit);
      } else if (sort === "priceFromLowToHigh") {
        sortedResults = await ProductModel.find(filter)
          .sort({ price: 1 })
          .skip(skipIndex)
          .limit(limit);
      }


      const filteredResult = await ProductModel.find(filter).countDocuments();
      const totalPages = Math.ceil(filteredResult / limit);

      return res.status(200).json({
        sort: sortedResults,
        totalPages,
        totalResults: filteredResult,
      });
    }
  catch(error: any) {
    log.info(error)
    return res.status(500).send({ msg: "Internal server error", error });
  }
}
