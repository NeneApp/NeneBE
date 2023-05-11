const getProductsByBrand = {
  tags: ["Products"],
  description: `Get all the products with a particular brand name
                Note: the products are sorted from newest to oldest by default
                An example of a full url path for a page number 2, limit of 6: 
                baseurl/api/categories/:categoryName?page=2&limit=4`,
  operationId: "getProductsByBrand",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "brandName",
      in: "path",
      description: "The brand name of the products to be queried",
      required: true,
      schema: {
        type: "string",
        example: "Nike",
      },
    },
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
      description: "All products displayed successfully",
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
                      type: "objects",
                      example:
                        "{ size: UK Size 42 }, { color: blue }, { height: flat }, { weight: 4pounds }",
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
                  "the total count of returned products in this brand",
                example: 1,
              },
            },
          },
        },
      },
    },
    "404": {
      description: "No products found under the brand",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "No products found under the brand!",
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

const addOrRemoveWishlist = {
  tags: ["Products"],
  description: `Add or remove a product from buyers wishlist
                Note: only buyers have access to this endpoint`,
  operationId: "addOrRemoveWishlist",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "productId",
      in: "path",
      description: "The id of the product to be added or removed from wishlist",
      required: true,
      schema: {
        type: "string",
        example: "rhfr438y8f43hvty3yt3u240ir",
      },
    },
  ],
  responses: {
    "200": {
      description: "Item added or removed from wishlist",
      content: {
        "application/json": {
          schema: {
            oneOf: [
              {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    description:
                      "Item succesfully added to wishlist if it is not in the wishlist before",
                    example: "Item added to wishlist!",
                  },
                },
              },
              {
                type: "object",
                properties: {
                  msg: {
                    type: "string",
                    description:
                      "Item succesfully removed wishlist if it is already in the wishlist before",
                    example: "Item removed from wishlist!",
                  },
                },
              },
            ],
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

const getVendorProducts = {
  tags: ["Products"],
  description: `Vendor can get all products created by them.
                Note: the products are sorted from newest to oldest by default
                An example of a full url path for a page number 2, limit of 6: 
                baseurl/api/products/my-product?page=2&limit=4`,
  operationId: "getVendorProducts",
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
      description: "All products displayed successfully",
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
                    products: {
                      type: "array",
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
                          type: "objects",
                          example:
                            "{ size: UK Size 42 }, { color: blue }, { height: flat }, {weigth: 4 pounds}",
                        },
                        is_sold: {
                          type: "Boolean",
                          example: "false",
                        },
                        category: {
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
                        productType: {
                          type: "string",
                          example: "Dresses",
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
                  "the total count of returned products in this brand",
                example: 1,
              },
            },
          },
        },
      },
    },
    "404": {
      description: "You currently have no product",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "You currently have no product",
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

const updateVendorProduct = {
  tags: ["Products"],
  description: "Vendors can uodate product created by them",
  operationId: "updateVendorProduct",
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
              description: "Name of the product",
              type: "string",
              example: "Jordan 4",
            },
            brand: {
              description: "brand of the product",
              type: "string",
              example: "Nike",
            },
            quantity: {
              description: "quantity of the product available",
              type: "number",
              example: 5,
            },
            description: {
              description: "description of the product",
              type: "string",
              example: "Blue Jordan 4 suitable for summer",
            },
            price: {
              description: "prize of the product",
              type: "number",
              example: 5000,
            },
            discount: {
              description:
                "discount the vendor is willing to add to the product",
              type: "number",
              example: 550,
            },
            size: {
              description: "size of the product",
              type: "strings",
              example: "UK Size 42",
            },
            color: {
              description: "descriptive color of the product",
              type: "strings",
              example: "blue",
            },
            height: {
              description: "height of the product",
              type: "strings",
              example: "flat",
            },
            weight: {
              description: "weight of the product",
              type: "strings",
              example: "4 pounds",
            },
            category: {
              description: "the category the product falls under",
              type: "string",
              example: "Clothes",
            },
          },
        },
        productType: {
          description: "type of the product",
          type: "string",
          example: "Dresses",
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
              msg: {
                type: "string",
                example: "Product updated successfully!",
              },
              updatedDetails: {
                type: "object",
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
                size: {
                  type: "strings",
                  example: "UK Size 42",
                },
                color: {
                  type: "strings",
                  example: "blue",
                },
                height: {
                  type: "strings",
                  example: "flat",
                },
                weight: {
                  type: "strings",
                  example: "4 pounds",
                },
                is_sold: {
                  type: "Boolean",
                  example: "false",
                },
                category: {
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
                productType: {
                  type: "string",
                  example: "Dresses",
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
        },
      },
    },
    "400": {
      description: "msg: User not the owner of product!!!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "msg: User not the owner of product!!!",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Product not found!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Product not found!",
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

const createProductBody = {
  type: "object",
  properties: {
    name: {
      type: "string",
      example: "Jordan 5",
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
      example: "A nice sneakers for sall seasons",
    },
    prize: {
      type: "number",
      example: 3000,
    },
    discount: {
      type: "number",
      example: 50,
      required: false,
    },
    attribute: {
      type: "object",
      properties: {
        size: {
          type: "string",
          example: "UK size 1",
        },
        color: {
          type: "string",
          example: "red",
        },
        height: {
          type: "string",
          example: "flat",
        },
        weight: {
          type: "string",
          example: "50lbs",
        },
      },
    },
    category: {
      type: "string",
      example: "Shoes",
    },
    productType: {
      type: "string",
      example: "sneakers",
    },
  },
};

export {
  createProductBody,
  getProductsByBrand,
  addOrRemoveWishlist,
  getVendorProducts,
  updateVendorProduct,
};
