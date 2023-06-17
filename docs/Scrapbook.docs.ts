const createScrapbook = {
  tags: ["Scrapbook"],
  description: "Create a new scrapebook by admin",
  operationId: "createscrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createScrapbookBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Scrapebook created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Oluseyi's scrapebook",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              collections: {
                type: "array",
                example: [],
              },
              viewCount: {
                type: "number",
                example: 0,
              },
              createdAt: {
                type: "string",
                example: "2023-06-10T01:11:03.123+00:00",
              },
              updatedAt: {
                type: "string",
                example: "2023-06-10T01:13:36.315+00:00",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Failed to create scrapebook",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Failed to create scrapebook",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const getScrapbook = {
  tags: ["Scrapbook"],
  description: `Get a scrapbook by admin, vendor or buyer`,
  operationId: "getScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "scrabookId",
      in: "path",
      description: "The id of the scrapebook to be queried",
      required: true,
      schema: {
        type: "string",
        example: "6573-fiew-92945-jgwgw",
      },
    },
  ],
  responses: {
    "200": {
      description: "Scrapebook displayed",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: {
                type: "string",
                example: "Oluseyi's scrapebook",
                required: "true",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              collections: {
                type: "array",
                example: [
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                ],
              },
              viewCount: {
                type: "number",
                example: 1,
              },
              createdAt: {
                type: "string",
                example: "2023-06-10T01:11:03.123+00:00",
              },
              updatedAt: {
                type: "string",
                example: "2023-06-10T01:13:36.315+00:00",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook post not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapebook not found",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const getScrapbooks = {
  tags: ["Scrapbook"],
  description: `get all scapbookt by admin, vendor or buyer
                    Note: the srapbook are sorted from newest to oldest by default
                    An example of a full url path for a page number 2, limit of 6: 
                    baseurl/api/featured?page=2&limit=4`,
  operationId: "getScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "page",
      in: "query",
      description: "The page number to be queried",
      schema: {
        type: "string",
        example: "1",
        default: "1",
      },
    },
    {
      name: "limit",
      in: "query",
      description: "The number of data to be returned per request",
      schema: {
        type: "string",
        example: "8",
        default: "8",
      },
    },
  ],
  responses: {
    "200": {
      description: "Scrapbook displayed successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              results: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Oluseyi's scrapbook",
                    },
                    image: {
                      type: "string",
                      example:
                        "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                    },
                    collections: {
                      type: "array",
                      example: [
                        "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                      ],
                    },
                    viewCount: {
                      type: "number",
                      example: 1,
                    },
                    createdAt: {
                      type: "string",
                      example: "2023-06-10T01:11:03.123+00:00",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2023-06-10T01:13:36.315+00:00",
                    },
                  },
                },
              },
              currentPage: {
                type: "number",
                description: "the current page of pagination",
                example: 1,
              },
              limit: {
                type: "number",
                description: "the current limit set on returned posts",
                example: 1,
              },
              totalPages: {
                type: "number",
                description:
                  "the total number of pages available holding the returned posts ",
                example: 1,
              },
              totalReturnedScrapbook: {
                type: "number",
                description: "the total count of returned posts",
                example: 1,
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapbook not found",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const updateScrapbook = {
  tags: ["Scrapbook"],
  description: "update scrapbook by admin",
  operationId: "updateScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "scrapbookId",
      in: "path",
      description: "The id of the scrapebook to be queried",
      required: true,
      schema: {
        type: "string",
        example: "6573-fiew-92945-jgwgw",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Interview with John Doe",
            },
            image: {
              type: "file",
            },
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "Product updated successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                example: "Oluseyi's scrapebook",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              collections: {
                type: "array",
                example: [
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                ],
              },
              viewCount: {
                type: "number",
                example: 1,
              },
              createdAt: {
                type: "string",
                example: "2023-06-10T01:11:03.123+00:00",
              },
              updatedAt: {
                type: "string",
                example: "2023-06-10T01:13:36.315+00:00",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Scrapbook upload unsuccessful!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "message: Featured post upload unsuccessful!",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Featured post not found",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const deleteScrapbook = {
  tags: ["Scrapbook"],
  description: "Delete Scrapbook by admin",
  operationId: "deleteScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "scrapbookId",
      in: "path",
      description: "The id of the scrapbook to be queried",
      required: true,
      schema: {
        type: "string",
        example: "6573-fiew-92945-jgwgw",
      },
    },
  ],
  responses: {
    "200": {
      description: "Scrapbook deleted successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapbook deleted successfully!",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapbook not found",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const addImagesToScrapbook = {
  tags: ["Scrapbook"],
  description:
    "Add images to scrapebook by admin, many images can be added at once",
  operationId: "addImagesToScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              example: "Oluseyi's scrapebook",
            },
            image: {
              type: "string",
              example:
                "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Image(s) added to Oluseyi's scrapbook successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Image(s) added to Oluseyi's scrapbook successfully",
              },
              name: {
                type: "string",
                example: "Oluseyi's scrapebook",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              collections: {
                type: "array",
                example: [
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                ],
              },
              viewCount: {
                type: "number",
                example: 0,
              },
              createdAt: {
                type: "string",
                example: "2023-06-10T01:11:03.123+00:00",
              },
              updatedAt: {
                type: "string",
                example: "2023-06-10T01:13:36.315+00:00",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "No image files found in the request",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No image files found in the request",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapbook not found",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};
const removeImageFromScrapbook = {
  tags: ["Scrapbook"],
  description: "Delete image Scrapbook by admin",
  operationId: "deleteImageFromScrapbook",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "scrapbookId",
      in: "path",
      description: "The id of the scrapbook to be queried",
      required: true,
      schema: {
        type: "string",
        example: "6573-fiew-92945-jgwgw",
      },
    },
    {
      name: "imageLink",
      in: "query",
      description:
        "The s3 bucket upload signed url of the image to be removed. Note: Encode url query",
      required: true,
      schema: {
        type: "string",
        example:
          "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
      },
    },
  ],
  responses: {
    "200": {
      description: "Scrapbook deleted from Oluseyi's scrapebook successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example:
                  "Scrapbook deleted from Oluseyi's scrapebook successfully!",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Scrapbook not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Scrapbook not found",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Image not in scrapbook",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Image not in scrapbook",
              },
            },
          },
        },
      },
    },
    "500": {
      description: "Internal server error",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              error: {
                type: "string",
                example: "Internal server error",
              },
            },
          },
        },
      },
    },
  },
};

const createScrapbookBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Oluseyi's scrapbook",
      required: "true",
    },
    image: {
      type: "file",
    },
  },
};

export {
  createScrapbookBody,
  createScrapbook,
  getScrapbook,
  getScrapbooks,
  updateScrapbook,
  deleteScrapbook,
  addImagesToScrapbook,
  removeImageFromScrapbook,
};
