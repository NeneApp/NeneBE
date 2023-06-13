import express from 'express';
const router = express.Router();
import {upload} from "../utility/s3bucket"
import { deleteImage, downloadImage, getAllImages, uploadMultipleFiles, uploadSingleFile } from '../controllers/s3Image.controller';

router.post('/uploadSingle', upload.single('file'), uploadSingleFile)
router.post('/uploadMultiple', upload.array('file', 3), uploadMultipleFiles)
router.get("/list", getAllImages)
router.get("/download/:filename", downloadImage)
router.delete("/delete/:filename", deleteImage)

export default router; 