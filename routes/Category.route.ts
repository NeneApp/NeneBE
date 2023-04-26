import express from 'express';
import { getAllCategory,
        createProduct,
        addCategory,
        addSubCategory,
        getSingleProd,
        getProductsInCategory
} from "../controllers/Category.controller";
import { Authenticate, AuthorizeVendor } from '../middlewares';

const router = express.Router();

router.post('/createProduct',  Authenticate, AuthorizeVendor, createProduct);
router.post('/addCategory', Authenticate, addCategory);
router.post('/:categoryId/addSubCategory',  Authenticate, addSubCategory);
router.get('/getAllCategories', getAllCategory);
router.get('/:prodId/getSingleProd', getSingleProd);
router.get('/:categoryName', getProductsInCategory);

export default router