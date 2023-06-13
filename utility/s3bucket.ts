import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

aws.config.update({
    secretAccessKey: "f23peMFOFAmcizB446sZYTzP5IJZLBVs9oZ0Z0Hi",
    accessKeyId: "AKIAVIVNKJA4HDMKDBGK",
    region: "us-east-1"
    
    // region: process.env.REGION as string,
    // apiVersion: 'latest' as string,
});
// const BUCKET = process.env.AWS_BUCKET as unknown as string
const BUCKET = "nenebucketv1"
const s3: any = new aws.S3();

export const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: "public-read",
        bucket: BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname)
        }
    })
})

// const multer = require("multer");                                          
// const multerS3 = require("multer-s3");
// const { S3Client } = require("@aws-sdk/client-s3");

// // create s3 instance using S3Client 
// // (this is how we create s3 instance in v3)
// const s3 = new S3Client({
//     credentials: {
//         accessKeyId: "YOUR_ACCESS_KEY_ID_HERE", // store it in .env file to keep it safe
//         secretAccessKey: "YOUR_SECRET_KEY_HERE"
//     },
//     region: "ap-south-1" // this is the region that you select in AWS account
// })

// const s3Storage = multerS3({
//     s3: s3, // s3 instance
//     bucket: "my-images", // change it as per your project requirement
//     acl: "public-read", // storage access type
//     metadata: (req, file: any, cb: any) => {
//         cb(null, {fieldname: file.fieldname})
//     },
//     key: (req, file, cb) => {
//         const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
//         cb(null, fileName);
//     }
// });

// // function to sanitize files and send error for unsupported files
// function sanitizeFile(file, cb) {
//     // Define the allowed extension
//     const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

//     // Check allowed extensions
//     const isAllowedExt = fileExts.includes(
//         path.extname(file.originalname.toLowerCase())
//     );

//     // Mime type must be an image
//     const isAllowedMimeType = file.mimetype.startsWith("image/");

//     if (isAllowedExt && isAllowedMimeType) {
//         return cb(null, true); // no errors
//     } else {
//         // pass error msg to callback, which can be displaye in frontend
//         cb("Error: File type not allowed!");
//     }
// }

// // our middleware
// const uploadImage = multer({
//     storage: s3Storage,
//     fileFilter: (req, file, callback) => {
//         sanitizeFile(file, callback)
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 2 // 2mb file size
//     }
// })

// // update profile image
// router.put(
//     "/:userId/profile-image", 
//     uploadImage.single("image"), // our uploadImage middleware
//     (req, res, next) => {
//         /* 
//            req.file = { 
//              fieldname, originalname, 
//              mimetype, size, bucket, key, location
//            }
//         */

//         // location key in req.file holds the s3 url for the image
//         let data = {}
//         if(req.file) {
//             data.image = req.file.location
//         }

//         // HERE IS YOUR LOGIC TO UPDATE THE DATA IN DATABASE
//     }
// )