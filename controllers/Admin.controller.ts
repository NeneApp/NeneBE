import express, { Request, Response, NextFunction } from 'express';
import { CreateVendorInput } from '../dto/Admin.dto';
import { FindVendor } from '../utility/Checking.utility';
import VendorModel from '../models/Vendor.model';
import { GenSlug } from '../utility/VendorUtility';
import {
  VENDOR_ACCOUNT_APPROVED,
  VENDOR_ACCOUNT_DECLIEND,
  VENDOR_ACCOUNT_PENDING,
  VENDOR_ACCOUNT_SUSPENDED,
} from '../utility/Constants';

/**
 * @description Create Vendor
 * @method POST
 * @route /api/admin/vendor/create
 * @access private/Admin
 */
export const CreateVender = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    password,
    businessName,
    email,
    phone,
    image,
    activated,
    address,
  } = <CreateVendorInput>req.body;

  const existingVendor = await FindVendor('', email);

  if (existingVendor) {
    return res.status(400).json({
      message: 'Vendor already exists',
    });
  }

  const createVendor = await VendorModel.create({
    firstName,
    lastName,
    password,
    phone,
    email,
    businessName,
    slug: GenSlug(businessName),
    address,
    image: '',
    activated: true,
  });

  return res.status(201).json({
    createVendor,
  });
};

/**
 * @description Get All Vendor
 * @method GET
 * @route /api/admin/vendors
 * @access private/Admin
 */
export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await VendorModel.find();

  if (vendors) {
    return res.status(200).json(vendors);
  }

  return res.status(404).json({
    message: 'Vendors data not found ',
  });
};

/**
 * @description Get All Pending Vendor Accounts
 * @method GET
 * @route /api/admin/vendors/pending-accounts
 * @access private/Admin
 */
export const GetPendingVendorsAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await VendorModel.find({ accStatus: VENDOR_ACCOUNT_PENDING });

  if (vendors) {
    return res.status(200).json(vendors);
  }

  return res.status(404).json({
    message: 'Vendors data not found ',
  });
};

/**
 * @description Get All Approved Vendor Accounts
 * @method GET
 * @route /api/admin/vendors/approved-accounts
 * @access private/Admin
 */
export const GetApprovedVendorsAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await VendorModel.find({
    accStatus: VENDOR_ACCOUNT_APPROVED,
  });

  if (vendors) {
    return res.status(200).json(vendors);
  }

  return res.status(404).json({
    message: 'Vendors data not found ',
  });
};

/**
 * @description Get All Approved Vendor Accounts
 * @method GET
 * @route /api/admin/vendors/decliend-accounts
 * @access private/Admin
 */
export const GetDeclinedVendorsAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await VendorModel.find({
    accStatus: VENDOR_ACCOUNT_DECLIEND,
  });

  if (vendors) {
    return res.status(200).json(vendors);
  }

  return res.status(404).json({
    message: 'Vendors data not found ',
  });
};

/**
 * @description Get All Approved Vendor Accounts
 * @method GET
 * @route /api/admin/vendors/suspended-accounts
 * @access private/Admin
 */
export const GetSuspendedVendorsAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await VendorModel.find({
    accStatus: VENDOR_ACCOUNT_SUSPENDED,
  });

  if (vendors) {
    return res.status(200).json(vendors);
  }

  return res.status(404).json({
    message: 'Vendors data not found ',
  });
};

/**
 * @description Admin approve vendor accoutn
 * @method GET
 * @route /api/admin/vendors/suspended-accounts
 * @access private/Admin
 */
export const ApproveVendorAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendor = await FindVendor(req.params.vendorId);

  if (vendor) {
    vendor.accStatus = VENDOR_ACCOUNT_APPROVED;
    vendor.save();
    return res.status(200).json(vendor);
  }

  return res.status(404).json({
    message: 'Vendor data not found ',
  });
};
/**
 * @descriptionAdmin admin suspend vendor  Accounts
 * @method GET
 * @route /api/admin/vendors/suspended-accounts
 * @access private/Admin
 */
export const SuspendVendorAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendor = await FindVendor(req.params.vendorId);

  if (vendor) {
    vendor.accStatus = VENDOR_ACCOUNT_SUSPENDED;
    vendor.save();
    return res.status(200).json(vendor);
  }

  return res.status(404).json({
    message: 'Vendor data not found ',
  });
};
