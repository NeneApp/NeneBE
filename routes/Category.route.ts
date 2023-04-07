import { getAllCategory } from "../controllers/Category.controller";
import express from 'express';
const categories = express.Router();

categories.get('/getAllCategories', getAllCategory);

export default categories;

