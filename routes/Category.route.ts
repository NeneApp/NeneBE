import express from 'express';
import { getAllCategory } from "../controllers/Category.controller";
import { getProductsInCategory } from '../controllers/Category.controller';
import validate from '../middlewares/validateResource';

const router = express.Router();

router.get('/', getAllCategory);
router.get('/:categoryName', getProductsInCategory);

export default router