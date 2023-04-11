const getAllCategories = {
  tags: ["categories"],
  description: "Get all the categories",
  operationId: "getAllCategories",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/getAllCategories",
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "All categories displayed successfully",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "All categories displayed successfully",
              },
              allCategories: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    _id: {
                      type: "string",
                      example: "60f34d3f3fa47634203e2d4c",
                    },
                    name: {
                      type: "string",
                      example: "Clothes",
                    },
                    subCategory: {
                      type: "string",
                      example: "Shirts",
                    },
                    category: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "60f34d3f3fa47634203e2d4c",
                        },
                        name: {
                          type: "string",
                          example: "Shoes",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        "401": {
          description: "Something went wrong in fetching categories",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Something went wrong in fetching categories"
                  }
                }
              }
            }
          }
        },
        "500": {
          description: "An error occurred",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "An error occurred"
                  },
                  error: {
                    type: "object"
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

export {
  getAllCategories
}