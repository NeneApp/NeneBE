import express from 'express';
import { getAllCategory,
        createProduct,
        addCategory,
        addSubCategory,
        getSingleProd,
        getProductsInCategory
} from "../controllers/Category.controller";

const router = express.Router();

router.post('/createProduct', createProduct);
router.post('/addCategory', addCategory);
router.post('/:categoryId/addSubCategory', addSubCategory);
router.get('/getAllCategories', getAllCategory);
router.get('/:prodId/getSingleProd', getSingleProd);
router.get('/:categoryName', getProductsInCategory);

export default router