import express from 'express';
const router = express.Router();
import {upload} from "../utility/s3bucket"
import { deleteFile, downloadFile, getAllFiles, uploadMultipleFiles, uploadSingleFile } from '../controllers/s3Image.controller';

router.post('/uploadSingle', upload.single('file'), uploadSingleFile)
router.post('/uploadMultiple', upload.array('file', 3), uploadMultipleFiles)
router.get("/listAllFiles", getAllFiles)
router.get("/download/:filename", downloadFile)
router.delete("/delete/:filename", deleteFile)

export default router; 