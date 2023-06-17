const createFeaturedPost = {
  tags: ["Featured"],
  description: "Create a new featured  by admin",
  operationId: "createFeaturedPost",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createFeaturedPostBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Featured post created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                example: "Interview with John Doe",
              },
              description: {
                type: "string",
                example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
              },
              body: {
                type: "string",
                example:
                  "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              video: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVUFWEGUWFEGA4HDMKDBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Failed to create featured post",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Failed to create featured post",
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

const getFeaturedPost = {
  tags: ["Featured"],
  description: `Get a featured post by admin, vendor or buyer`,
  operationId: "getFeaturedPost",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "slug",
      in: "path",
      description: "The slug of the featured post to be queried",
      required: true,
      schema: {
        type: "string",
        example: "interview-with-john-doe",
      },
    },
  ],
  responses: {
    "200": {
      description: "Featured post displayed",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              title: {
                type: "string",
                example: "Interview with John Doe",
              },
              description: {
                type: "string",
                example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
              },
              body: {
                type: "string",
                example:
                  "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              video: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVUFWEGUWFEGA4HDMKDBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              viewCount: {
                type: "number",
                example: 1,
              },
              slug: {
                type: "string",
                example: "interview-with-john-doe",
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
      description: "Featured post not found",
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

const getFeaturedPosts = {
  tags: ["Featured"],
  description: `get all featuredpost by admin, vendor or buyer
                  Note: the featured post are sorted from newest to oldest by default
                  An example of a full url path for a page number 2, limit of 6: 
                  baseurl/api/featured?page=2&limit=4`,
  operationId: "getFeaturedPosts",
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
      description: "Featured posts displayed successfully",
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
                    title: {
                      type: "string",
                      example: "Interview with John Doe",
                    },
                    description: {
                      type: "string",
                      example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
                    },
                    body: {
                      type: "string",
                      example:
                        "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
                    },
                    image: {
                      type: "string",
                      example:
                        "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                    },
                    video: {
                      type: "string",
                      example:
                        "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVUFWEGUWFEGA4HDMKDBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
                    },
                    viewCount: {
                      type: "number",
                      example: 1,
                    },
                    slug: {
                      type: "string",
                      example: "interview-with-john-doe",
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
              totalReturnedPosts: {
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
      description: "Featured posts not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Featured posts not found",
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

const updateFeaturedPost = {
  tags: ["Featured"],
  description: "update featured post by admin",
  operationId: "updateFeaturedPost",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "slug",
      in: "path",
      description: "The slug of the featured post to be queried",
      required: true,
      schema: {
        type: "string",
        example: "interview-with-john-doe",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            title: {
              type: "string",
              example: "Interview with John Doe",
            },
            description: {
              type: "string",
              example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
            },
            body: {
              type: "string",
              example:
                "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
            },
            image: {
              type: "file",
            },
            video: {
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
                example: "Interview with John Doe",
              },
              description: {
                type: "string",
                example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
              },
              body: {
                type: "string",
                example:
                  "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
              },
              image: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVIVNYEWYGRFWRBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              video: {
                type: "string",
                example:
                  "https://nenetestv1.s3.amazonaws.com/videos/IMG_0883.PNG.png.png?AWSAccessKeyId=AKIAVUFWEGUWFEGA4HDMKDBGK&Expires=1686363215&Signature=44MpEC1DKlJZmbqc5%2FJya1ACOeo%3D",
              },
              viewCount: {
                type: "number",
                example: 1,
              },
              slug: {
                type: "string",
                example: "interview-with-john-doe",
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
      description: "Featured post upload unsuccessful!",
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
      description: "Featured post not found",
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

const deleteFeaturedPost = {
  tags: ["Featured"],
  description: "Delete Featured post by admin",
  operationId: "deleteeaturedPostF",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "slug",
      in: "path",
      description: "The slug of the featured post to be queried",
      required: true,
      schema: {
        type: "string",
        example: "interview-with-john-doe",
      },
    },
  ],
  responses: {
    "200": {
      description: "Featured post deleted successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Featured post deleted successfully!",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Featured post not found",
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

const createFeaturedPostBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Interview with John Doe",
      required: "true",
    },
    description: {
      type: "string",
      example: "lorem gff fwfhv wrfyw8wf vbeohre, geurh",
    },
    body: {
      type: "string",
      example:
        "lorem ipsum ipsum rhfhwh .........fru wwrfhirww......jrbguhrggr8y8w8w......",
    },
    image: {
      type: "file",
    },
    video: {
      type: "file",
    },
  },
};

export {
  createFeaturedPostBody,
  createFeaturedPost,
  getFeaturedPost,
  getFeaturedPosts,
  updateFeaturedPost,
  deleteFeaturedPost,
};
