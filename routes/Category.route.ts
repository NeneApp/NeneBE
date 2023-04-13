import { getAllCategory,
        createProduct,
        addCategory,
        addSubCategory,
        getSingleProd
} from "../controllers/Category.controller";
import { Authenticate } from '../middlewares';
import express from 'express';
const categories = express.Router();

categories.post('/createProduct', createProduct);
categories.post('/addCategory', addCategory);
categories.post('/:categoryId/addSubCategory', addSubCategory);
categories.get('/getAllCategories', getAllCategory);
categories.get('/:prodId/getSingleProd', getSingleProd);

export default categories;

