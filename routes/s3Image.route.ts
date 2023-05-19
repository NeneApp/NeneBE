import express from 'express';
const router = express.Router();
import {upload} from "../utility/s3bucket"
import { deleteImage, downloadImage, getAllImages, uploadImage } from '../controllers/s3Image.controller';

router.post('/upload', upload.single('file'), uploadImage)
router.get("/list", getAllImages)
router.get("/download/:filename", downloadImage)
router.delete("/delete/:filename", deleteImage)

export default router;