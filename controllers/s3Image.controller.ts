import { Request, Response } from "express"; 
import aws from "aws-sdk";
import log from "../utility/logger";
const s3: any = new aws.S3();
const BUCKET: any = process.env.AWS_BUCKET;

export const uploadImage = async (req: Request, res: Response) => {
    try {
        const file = (req as any).file;
        log.info(file);
        
        // Check if file was successfully uploaded by multer-s3
    if (!req.file || !file.location) {
        return res
          .status(400)
          .json({ error: "Failed to upload file to S3 bucket" });
      }

  return res
    .status(200)
    .json("Successfully uploaded " + file.location + " location!");
  } catch (error: any) {
      log.error(error)
      return res.status(500).json({
        message: "something went wrong",
        error
      }) 
  }
}

export const getAllImages = async (req: Request, res: Response) => {
  try {
  let objectResponse = await s3.listObjectsV2({ Bucket: BUCKET }).promise();
  let allImages = objectResponse.Contents.map((item: any) => item.Key as any);

  return res
    .status(200)
    .json(allImages);
  } catch(error: any) {
    log.error(error)
    return res.status(500).json({
      message: "Something went wrong",
      error
    }) 
  }
};

export const downloadImage = async (req: Request, res: Response) => {
  try {
  const filename = req.params.filename;
  let obj = await s3.getObject({ Bucket: BUCKET, Key: filename }).promise();
  return res.status(200).json(obj.Body);
  }catch(error: any) {
    log.error(error)
    return res.status(500).json({
      message: "Something went wrong",
      error
    }) 
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
  const filename = req.params.filename;
  await s3.deleteObject({ Bucket: BUCKET, Key: filename }).promise();
  return res
    .status(200)
    .json("File Deleted Successfully");
  }catch(error: any) {
    log.error(error)
    return res.status(500).json({
      message: "Something went wrong",
      error
    }) 
  }
};
