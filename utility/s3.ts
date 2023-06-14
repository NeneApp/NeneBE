import * as AWS from "aws-sdk";
import * as mimetypes from "mime-types";
import config from "../config/environment";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);

const bucketName = config.AWS_BUCKET_NAME;
const region = config.AWS_BUCKET_REGION;
const accessKeyId = config.AWS_ACCESS_KEY;
const secretAccessKey = config.AWS_SECRET_KEY;

const s3Client = new AWS.S3({
  region: region,
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

export const uploadFile = async (
  file: Express.Multer.File,
  folder: string
): Promise<string> => {
  try {
    const fileExtension = mimetypes.extension(file.mimetype);
    const fileName = `${file.originalname}.${fileExtension}`;

    const fileBuffer = await readFile(file.path); // Read the file asynchronously using promisified fs.readFil

    const uploadParams: AWS.S3.PutObjectRequest = {
      Bucket: bucketName as string,
      Key: `${folder}/${fileName}`,
      Body: fileBuffer,
      ContentType: file.mimetype,
    };

    const uploadResult = await s3Client.upload(uploadParams).promise();
    if (!uploadResult.Key) {
      throw new Error("Failed to upload file");
    }

    const fileUrl = await generateFileUrl(fileName, folder, file.mimetype);
    console.log(fileUrl);
    return fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw new Error("Failed to upload file");
  }
};

const generateFileUrl = async (
  key: string,
  folder: string,
  contentType: string
): Promise<string> => {
  const fileExtension = mimetypes.extension(contentType);

  try {
    const url = await new Promise<string>((resolve, reject) => {
      s3Client.getSignedUrl(
        "getObject",
        {
          Bucket: bucketName,
          Key: `${folder}/${key}.${fileExtension}`,
          Expires: 3600,
        },
        (err: Error | AWS.AWSError, url: string) => {
          if (err) {
            console.error(err + ":" + "Couldn't generate file url!");
            reject(err);
          } else {
            resolve(url);
          }
        }
      );
    });

    if (!url) {
      throw new Error("Failed to generate file URL");
    }

    return url;
  } catch (error) {
    console.error("Error generating file URL:", error);
    throw new Error("Failed to generate file URL");
  }
};

export const deleteFileFromS3 = async (fileUrl: string) => {
  try {
    const fileKey = extractFileKeyFromUrl(fileUrl);
    const params: AWS.S3.DeleteObjectRequest = {
      Bucket: bucketName as string,
      Key: fileKey,
    };
    await s3Client.deleteObject(params).promise();
    console.log(`File ${fileKey} deleted from S3 bucket ${bucketName}`);
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    throw new Error("Failed to delete file from S3");
  }
};

const extractFileKeyFromUrl = (fileUrl: string): string => {
  const urlParts = fileUrl.split("/");
  const fileKey = urlParts[urlParts.length - 1];
  return fileKey;
};
