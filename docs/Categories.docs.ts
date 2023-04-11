const getAllCategories = {
  tags: ["Categories"],
  description: "Get all the categories",
  operationId: "getAllCategories",
  security: [
    {
      bearerAuth: [],
    },
  ],
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
                example: "Something went wrong in fetching categories",
              },
            },
          },
        },
      },
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
                example: "An error occurred",
              },
              error: {
                type: "object",
              },
            },
          },
        },
      },
    },
  },
};

const getAllProductsInCategory = {
  tags: ["Categories"],
  description: `Get all the products in a category with filter and sort functionalities
                An example of a full url path for a page number 2, limit of 6, newIn and filtereing by size of UK Size 3 is: 
                baseurl/api/categories/:categoryName?page=2&limit=4&orderBy=new+desc&filter=size;UK+Size+3`,
  operationId: "getAllProductsInCategory",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "categoryName",
      in: "path",
      description: "The category name of the products to be queried",
      required: true,
      schema: {
        type: "string",
        example: "Clothes",
      },
    },
    {
      name: "page",
      in: "query",
      description: "The page number to be queried",
      schema: {
        type: "string",
        example: "2",
        default: "1",
      },
    },
    {
      name: "limit",
      in: "query",
      description: "The number of data to be returned per request",
      schema: {
        type: "string",
        example: "6",
        default: "8",
      },
    },
    {
      name: "orderBy",
      in: "query",
      description: `Sorting pattern of the returned data; 
                    the default sorting is arranging the data in alpabetical order 
                    and can be used for the view all link as baseurl/api/categories/:categoryName.
                    For the newIn link, the data is sorting according to time created in descending order e.g
                    baseurl/api/categories/:categoryName?orderBy=new+desc.`,
      schema: {
        type: "string",
        example: "new+desc",
        default: "name+asc",
      },
    },
    {
      name: "filter",
      in: "query",
      description: `Filter the incoming request(products) down to a particular 
                    product type along with the default(categoryName).
                    For example; 
                    - To get products under a category and filter the returned products 
                      down to get products with a particular product type: 
                      baseurl/api/categories/:categoryName?page=2&filter=prdtType;Dresses
                    - To get products under a category and filter the returned products 
                      down to get products with a particular product height: 
                      baseurl/api/categories/:categoryName?page=2&filter=height;flat`,
      schema: {
        type: "string",
        example: "size;UK+Size+3",
      },
    },
  ],
  responses: {
    "200": {
      description: "All categories displayed successfully",
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
                    _id: {
                      type: "string",
                      example: "60f3fwhd3f3fa476342",
                    },
                    name: {
                      type: "string",
                      example: "Jordan 4",
                    },
                    store_id: {
                      type: "string",
                      example: "dhfw8r82ydf48r284yr42uciehfwef94y",
                    },
                    brand: {
                      type: "string",
                      example: "Nike",
                    },
                    quantity: {
                      type: "number",
                      example: 5,
                    },
                    description: {
                      type: "string",
                      example: "Blue Jordan 4 suitable for summer",
                    },
                    code: {
                      type: "string",
                      example: "xefh2r92cnqoohr3292y9994uhef4hfi4",
                    },
                    slug: {
                      type: "string",
                      example: "Jordan-4",
                    },
                    price: {
                      type: "number",
                      example: 5000,
                    },
                    discount: {
                      type: "number",
                      example: 550,
                    },
                    attribute: {
                      type: "Array of objects",
                      example:
                        "[{ size: UK Size 42 }, { color: blue }, { height: flat }]",
                    },
                    is_sold: {
                      type: "Boolean",
                      example: "false",
                    },
                    categoryName: {
                      type: "object",
                      properties: {
                        _id: {
                          type: "string",
                          example: "6eq4dcw3iwrhfwa46fr2-",
                        },
                        name: {
                          type: "string",
                          example: "Clothes",
                        },
                      },
                    },
                    createdAt: {
                      type: "string",
                      example: "2023-04-11T14:42:01.627Z",
                    },
                    updatedAt: {
                      type: "string",
                      example: "2023-04-11T14:42:01.627Z",
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
                description: "the current limit set on returned products",
                example: 1,
              },
              totalPages: {
                type: "number",
                description:
                  "the total number of pages available holding the returned products ",
                example: 1,
              },
              totalReturnedProducts: {
                type: "number",
                description:
                  "the total count of returned products in this category",
                example: 1,
              },
            },
          },
        },
      },
    },
    "401": {
      description: "No products found under the category",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "No product is available in this category",
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
              message: {
                type: "string",
                example: "Internal server error",
              },
              error: {
                type: "object",
              },
            },
          },
        },
      },
    },
  },
};

const createCategoryBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Clothes",
    },
    sub_categories: {
      type: "Array",
      example: ["Dresses", "Jeans"],
    },
  },
};

export { getAllCategories, getAllProductsInCategory, createCategoryBody };
