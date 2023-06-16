import express from 'express';
import {
  CreateVender,
  GetApprovedVendorsAccount,
  GetDeclinedVendorsAccount,
  GetPendingVendorsAccount,
  GetSuspendedVendorsAccount,
  GetVendors,
  ApproveVendorAccount,
  SuspendVendorAccount,
} from '../controllers/Admin.controller';

const router = express.Router();

router.post('/vendor/create', CreateVender);
router.get('/vendors/:vendorId/approve', ApproveVendorAccount);
router.get('/vendors/:vendorId/suspend', SuspendVendorAccount);

router.get('/vendors', GetVendors);
router.get('/vendors/:id/pending-accounts', GetPendingVendorsAccount);
router.get('/vendors/approved-accounts', GetApprovedVendorsAccount);
router.get('/vendors/decliend-accounts', GetDeclinedVendorsAccount);
router.get('/vendors/suspended-accounts', GetSuspendedVendorsAccount);

export default router;
