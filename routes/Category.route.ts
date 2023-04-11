import { getAllCategory,
        createProduct,
        addCategory,
        addSubCategory
} from "../controllers/Category.controller";
import { Authenticate } from '../middlewares';
import express from 'express';
const categories = express.Router();

categories.post('/createProduct', Authenticate, createProduct);
categories.post('/addCategory', Authenticate, addCategory);
categories.post('/:categoryId/addSubCategory', Authenticate, addSubCategory);
categories.get('/getAllCategories', getAllCategory);

export default categories;

