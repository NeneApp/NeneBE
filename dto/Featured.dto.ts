export interface ICreateFeaturedPost {
  title: string;
  description?: string;
  body?: string;
}

export interface IUpdateFeaturedPost {
  title?: string;
  description?: string;
  body?: string;
}

export const allowedImageExtensions = [
  ".bmp",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".tiff",
  ".webp",
  ".svg+xml",
  ".x-icon",
  ".vnd.microsoft.icon",
  ".vnd.wap.wbmp",
  ".heif",
  ".heif-sequence",
  ".heic",
  ".heic-sequence",
  ".jxr",
  ".jxra",
  ".jxrs",
  ".jxrc",
  ".avif",
  ".apng",
  ".flif",
  ".jp2",
  ".jpx",
  ".dicom-rle",
  ".vnd.adobe.photoshop",
];

export const allowedVideoExtensions = [
  ".mp4",
  ".mpeg",
  ".webm",
  ".mov",
  ".avi",
];

export interface IGetPostQuery {
  page: string;
  limit: string;
  orderBy: string;
}
