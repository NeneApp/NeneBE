import { Request, Response } from "express";
import { GenSlug } from "../utility/VendorUtility";
import FeaturedModel from "../models/Featured.model";
import {
  ICreateFeaturedPost,
  IGetPostQuery,
  IUpdateFeaturedPost,
} from "../dto/Featured.dto";
import { deleteFileFromS3, uploadFile } from "../utility/s3";

/**
 * @description Create Featured Post
 * @method POST
 * @route /api/featured
 * @access private
 */

export const createFeaturedPost = async (req: Request, res: Response) => {
  // Extract the fields from the request body
  const { title, description, body } = <ICreateFeaturedPost>req.body;

  try {
    // Get the uploaded files
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    let imageURL, videoURL;
    if (files["image"]) {
      const imageFile = files["image"][0]; // Assuming the image field contains a single file
      imageURL = await uploadFile(imageFile, "images"); // Process the files as needed by uploading them to AWS S3 and generate URLs
    } else {
      console.log("No image is being sent");
    }
    if (files["video"]) {
      const videoFile = files["video"][0]; // Assuming the video field contains a single file
      videoURL = await uploadFile(videoFile, "videos"); // Process the files as needed by uploading them to AWS S3 and generate URLs
    } else {
      console.log("No video is being sent");
    }

    // Create the blog post object
    const featuredPost = {
      title,
      description,
      bodyOfPost: body,
      imageURL,
      videoURL,
      slug: GenSlug(title),
    };
    console.log(featuredPost);

    // Save the blog post to the database or perform any other required operations
    const postCreated = FeaturedModel.create(featuredPost);

    if (!postCreated) {
      return res
        .status(400)
        .send({ message: "Failed to create featured post" });
    }

    // Send the response with the created blog post
    return res.status(201).send(featuredPost);
  } catch (error) {
    console.error("Error creating featured post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description Get a Featured Post
 * @method GET
 * @route /api/featured/:slug
 * @access private
 */
export const getFeaturedPost = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const featuredPost = await FeaturedModel.findOne({ slug });

    if (!featuredPost) {
      return res.status(404).send({ message: "Featured post not found" });
    }

    featuredPost.viewCount += 1;
    await featuredPost.save();
    return res.status(200).send(featuredPost);
  } catch (error) {
    console.error("Error retrieving featured post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description Get Featured Posts
 * @method GET
 * @route /api/featured
 * @access private
 */
export const getFeaturedPosts = async (
  req: Request<{}, {}, {}, IGetPostQuery>,
  res: Response
) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 8;
  let sortField = {};

  if (req.query.orderBy) {
    let sortArray: string[] = req.query.orderBy.split(" ");
    sortArray[0] === "new"
      ? (sortField = { createdAt: sortArray[1] })
      : (sortField = { title: "asc" });
  } else {
    sortField = { title: "asc" };
  }

  try {
    const featuredPosts = await FeaturedModel.find({}).sort(sortField).exec();

    if (featuredPosts.length === 0) {
      return res.status(404).send({ message: "Featured posts not found" });
    }

    const totalReturnedPosts: number = featuredPosts.length;
    const totalPages: number = Math.ceil(totalReturnedPosts / limit);
    const result: {}[] = featuredPosts.splice(
      page * limit,
      page * limit + limit
    );
    return res.status(200).send({
      result,
      currentPage: req.query.page || 1,
      limit,
      totalPages,
      totalReturnedPosts,
    });
  } catch (error) {
    console.error("Error retrieving featured posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description update Featured Post
 * @method PUT
 * @route /api/featured/:slug
 * @access private
 */
export const updateFeaturedPost = async (req: Request, res: Response) => {
  const { slug } = req.params;

  // Retrieve the updated data from the request body
  const { title, description, body } = <IUpdateFeaturedPost>req.body;

  try {
    // Retrieve the existing blog post from the database
    const existingPost = await FeaturedModel.findOne({ slug });

    // Check if the blog post exists
    if (!existingPost) {
      return res.status(404).send({ message: "Featured post not found" });
    }

    // Update the properties of the blog post
    if (title) {
      existingPost.title = title;
      existingPost.slug = GenSlug(title);
    }
    if (description) {
      existingPost.description = description;
    }
    if (body) {
      existingPost.bodyOfPost = body;
    }

    // Check if image and video files were uploaded
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    if (files && files["image"]) {
      const imageFile = files["image"][0];
      const imageURL = await uploadFile(imageFile, "images");

      // delete previous uploaded image from s3Bucket
      await deleteFileFromS3(existingPost.imageURL);

      existingPost.imageURL = imageURL;
    }

    if (files && files["video"]) {
      const videoFile = files["video"][0];
      const videoURL = await uploadFile(videoFile, "videos");

      // delete previous uploaded video from s3Bucket
      await deleteFileFromS3(existingPost.videoURL);

      existingPost.videoURL = videoURL;
    }

    // Save the updated blog post
    const updatedPost = await existingPost.save();

    if (!updatedPost) {
      return res
        .status(400)
        .send({ message: "Featured post upload unsuccessful!" });
    }

    return res.status(200).send(updatedPost);
  } catch (error) {
    console.error("Error updating featured post:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @description delete Featured Post
 * @method DELETE
 * @route /api/featured/:slug
 * @access private
 */
export const deleteFeaturedPost = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    // Retrieve the featured post from the database
    const existingPost = await FeaturedModel.findOne({ slug });

    // Check if the featured post exists
    if (!existingPost) {
      return res.status(404).send({ error: "Featured post not found" });
    }

    // Delete the associated files from S3
    if (existingPost.imageURL) {
      await deleteFileFromS3(existingPost.imageURL);
    }

    if (existingPost.videoURL) {
      await deleteFileFromS3(existingPost.videoURL);
    }

    // Delete the featured post
    await existingPost.deleteOne();

    return res
      .status(200)
      .send({ message: "Featured post deleted successfully!" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return res.status(500).json({ error: "Interval server error" });
  }
};
