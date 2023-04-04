const createBuyer = {
  tags: ["Buyers"],
  description: "Create a new buyer in the system",
  operationId: "createBuyer",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createBuyerBody",
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "User created successfully! Please check your mail",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "User already exists",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "User already exists",
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
              msg: {
                type: "string",
                example: "Something went wrong! Please try again",
              },
            },
          },
        },
      },
    },
  },
};

const verifyBuyerMail = {
  tags: ["Buyers"],
  description: "Verify a new buyer's email",
  operationId: "verifyBuyerMail",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "confirmationCode",
      in: "path",
      description: "confirmation code of the buyer that is to be verified",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    "200": {
      description: "Veification successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Verification Successful.You can now login",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Invalid verification code",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Invalid verification code",
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
              msg: {
                type: "string",
                example: "Something went wrong! Please try again",
              },
            },
          },
        },
      },
    },
  },
};

const resendVerifyBuyerMail = {
  tags: ["Buyers"],
  description: "Verify a new buyer's email",
  operationId: "verifyBuyerMail",
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
            email: { 
              description: "Email of the user",
              type: "string",
              example: "johndoe@gmail.com"
            },
        },
      },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Veification link sent",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Verification link sent, kindly check your mail",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "User does not exist",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "User does not exist",
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
              msg: {
                type: "string",
                example: "Something went wrong! Please try again",
              },
            },
          },
        },
      },
    },
  },
};

const createBuyerBody = {
  type: "object",
  properties: {
    firstName: {
      type: "string",
      example: "John",
    },
    lastName: {
      type: "string",
      example: "Snow",
    },
    email: {
      type: "string",
      example: "johnsnow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "!1234aWe1Ro3$#",
    },
  },
};

export { createBuyer, createBuyerBody, verifyBuyerMail, resendVerifyBuyerMail };
