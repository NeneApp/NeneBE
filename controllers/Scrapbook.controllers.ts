import { Request, Response } from "express";
import { ICreateScrapbook, IUpdateScrapbook } from "../dto/Scrapbook.dto";
import { deleteFileFromS3, uploadFile } from "../utility/s3";
import ScrapbookModel from "../models/Scrapbook.model";
import { upload } from "../utility/multer";

/**
 * @description Create Gallery Post
 * @method POST
 * @route /api/scrapbook
 * @access private
 */

export const createScrapbook = async (req: Request, res: Response) => {
  // Extract the fields from the request body
  const { name } = <ICreateScrapbook>req.body;

  try {
    // Check if the image field is present in the form data
    if (!req.file) {
      res.status(400).json({ error: "No image file found in the request" });
      return;
    }

    // Get the uploaded files
    const file = req.file as Express.Multer.File;

    const imageURL = await uploadFile(file, "Scrapbookimages"); // Process the files as needed by uploading them to AWS S3 and generate URLs

    // Create the blog post object
    const scrapbookPost = {
      name,
      imageURL,
    };

    // Save the blog post to the database or perform any other required operations
    const postCreated = ScrapbookModel.create(scrapbookPost);

    if (!postCreated) {
      return res
        .status(400)
        .send({ message: "Failed to create featured post" });
    }

    // Send the response with the created blog post
    return res.status(201).send(scrapbookPost);
  } catch (error) {
    console.error("Error creating featured post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// /**
//  * @description Get a Scrapbook Post
//  * @method GET
//  * @route /api/scrapbook/:imageId
//  * @access private
//  */
export const getScrapbook = async (req: Request, res: Response) => {
  const { scrapbookId } = req.params;

  try {
    const scrapbookPost = await ScrapbookModel.findOne({ _id: scrapbookId });

    if (!scrapbookPost) {
      return res.status(404).send({ message: "Scrapbook not found" });
    }

    scrapbookPost.viewCount += 1;
    await scrapbookPost.save();
    return res.status(200).send(scrapbookPost);
  } catch (error) {
    console.error("Error retrieving scrapbook post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// /**
//  * @description Get Scrapbook
//  * @method GET
//  * @route /api/scrapbook/getBooks
//  * @access private
//  */
export const getScrapbooks = async (req: Request, res: Response) => {
  const page = req.query.page as string;
  const limit = req.query.limit as string;
  const orderBy = req.query.orderBy as string;
  const pageNo = parseInt(page) - 1 || 0;
  const limitNo = parseInt(limit) || 8;
  let sortField = {};

  if (req.query.orderBy) {
    let sortArray: string[] = orderBy.split(" ");
    sortArray[0] === "new"
      ? (sortField = { createdAt: sortArray[1] })
      : (sortField = { name: "asc" });
  } else {
    sortField = { name: "asc" };
  }

  try {
    const scrapbooks = await ScrapbookModel.find({}).sort(sortField).exec();

    if (scrapbooks.length === 0) {
      return res.status(404).send({ message: "Featured posts not found" });
    }

    const totalReturnedScrapbook: number = scrapbooks.length;
    const totalPages: number = Math.ceil(totalReturnedScrapbook / limitNo);
    const result: {}[] = scrapbooks.splice(
      pageNo * limitNo,
      pageNo * limitNo + limitNo
    );
    return res.status(200).send({
      result,
      currentPage: req.query.page || 1,
      limit,
      totalPages,
      totalReturnedScrapbook,
    });
  } catch (error) {
    console.error("Error retrieving featured posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// /**
//  * @description update Scrapbook
//  * @method PUT
//  * @route /api/scrapbook/:scrapbookId/update
//  * @access private
//  */
export const updateScrapbook = async (req: Request, res: Response) => {
  const { scrapbookId } = req.params;

  // Retrieve the updated data from the request body
  const { name } = <IUpdateScrapbook>req.body;

  try {
    // Retrieve the book from the database
    const existingPost = await ScrapbookModel.findOne({ _id: scrapbookId });

    // Check if the book exists
    if (!existingPost) {
      return res.status(404).send({ message: "Scrapbook not found" });
    }

    // Update the properties of the blog post
    if (name) {
      existingPost.name = name;
    }

    // Check if the image field is present in the form data
    if (!req.file) {
      res.status(400).json({ error: "No image file found in the request" });
      return;
    }

    // Get the uploaded files
    const file = req.file as Express.Multer.File;

    const imageURL = await uploadFile(file, "Scrapbookimages"); // Process the files as needed by uploading them to AWS S3 and generate URLs

    // Delete the associated files from S3
    if (existingPost.imageURL) {
      await deleteFileFromS3(existingPost.imageURL);
    }

    existingPost.imageURL = imageURL;
    // Save the updated blog post
    const updatedBook = await existingPost.save();

    if (!updatedBook) {
      return res
        .status(400)
        .send({ message: "Scrapbook upload unsuccessful!" });
    }

    return res.status(200).send(updatedBook);
  } catch (error) {
    console.error("Error updating scrapbook:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description delete scrapbook
 * @method DELETE
 * @route /api/scrapbook/:scrapbookId/delete
 * @access private
 */
export const deleteScrapbook = async (req: Request, res: Response) => {
  const { scrapbookId } = req.params;

  try {
    // Retrieve the featured post from the database
    const existingPost = await ScrapbookModel.findOne({ _id: scrapbookId });

    // Check if the featured post exists
    if (!existingPost) {
      return res.status(404).send({ message: "Scrapbook not found" });
    }

    // Delete the associated files from S3
    if (existingPost.imageURL) {
      await deleteFileFromS3(existingPost.imageURL);
    }

    // Delete the featured post
    await existingPost.deleteOne();

    return res.status(200).send({ message: "Scrapbook deleted successfully!" });
  } catch (error) {
    console.error("Error deleting Scrapbook:", error);
    return res.status(500).json({ error: "Interval server error" });
  }
};

/**
 * @description add image to scrapbook
 * @method PUT
 * @route /api/scrapbook/scrapBookId/addImage
 * @access private
 */
export const addImagesToScrapbook = async (req: Request, res: Response) => {
  const { scrapbookId } = req.params;

  try {
    // Retrieve the book from the database
    const existingPost = await ScrapbookModel.findOne({ _id: scrapbookId });

    // Check if the book exists
    if (!existingPost) {
      return res.status(404).send({ message: "Scrapbook not found" });
    }

    if (!req.files || req.files.length === 0) {
      res.status(400).json({ error: "No image files found in the request" });
      return;
    }

    const files = req.files as Express.Multer.File[];

    // Upload each image file to S3 bucket
    const imageUrls: string[] = await Promise.all(
      files.map((file) => uploadFile(file, "Scrapbookimages"))
    );

    for (let image of imageUrls) {
      existingPost.collections.push(image);
    }

    await existingPost.save();

    res.status(200).send({ messages: "Image(s) uploaded successfully" });
  } catch (error) {
    console.error("Error adding images to scrapbook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description add image to scrapbook
 * @method DELETE
 * @route /api/scrapbook/scrapbookId/removeImage
 * @access private
 */
export const removeImageFromScrapbook = async (req: Request, res: Response) => {
  const { scrapbookId } = req.params;
  const { imageLink } = req.query;

  const link = imageLink as string

  try {
    // Retrieve the featured post from the database
    const existingPost = await ScrapbookModel.findOne({ _id: scrapbookId });

    // Check if the featured post exists
    if (!existingPost) {
      return res.status(404).send({ message: "Scrapbook not found" });
    }

    if (existingPost.collections.includes(link)) {
      const imageLinkIndex: number =
        existingPost!.collections.indexOf(link);
      existingPost.collections.splice(imageLinkIndex, 1);
      await existingPost!.save();

      // Delete the associated files from S3
      await deleteFileFromS3(link);
    } else {
      return res.status(400).send({ message: "Image not in scrapbook" });
    }

    return res.status(200).send({ message: "Image deleted successfully!" });
  } catch (error) {
    console.error("Error deleting image from scrapbook:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};