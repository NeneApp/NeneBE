<<<<<<< HEAD
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
              example: "johndoe@gmail.com",
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

const loginBuyer = {
  tags: ["Buyers"],
  description: "Login a buyer using email and password",
  operationId: "loginBuyer",
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
              example: "johndoe@gmail.com",
            },
            password: {
              type: "string",
              description: "unencrypted user's password",
              example: "!1234aWe1Ro3$#",
            },
          },
        },
      },
      required: true,
    },
    responses: {
      "200": {
        description: "Login successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "User login successfully",
                },
                id: {
                  type: "string",
                  example: "94ty-hfuw-ftr3-tu5t",
                },
                firstName: {
                  type: "string",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  example: "snow",
                },
                gender: {
                  type: "string",
                  example: "male",
                },
                email: {
                  type: "string",
                  example: "male",
                },
                token: {
                  type: "string",
                  example:
                    "f42r4urh84u3395t53t53gng35jt93.fu3u4t40yhwwrfr2.fu349tu3udvwrf394uu",
                },
              },
            },
          },
        },
      },
      "400": {
        description: "Email not yet verified",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "your email is yet to be verified",
                },
              },
            },
          },
        },
      },
      "401": {
        description: "Invalid email or password",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Unable to login, Invalid email or  password",
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
                  example: "An Error Occured",
                },
              },
            },
          },
        },
      },
    },
  },
};

const updateBuyer = {
  tags: ["Buyers"],
  description: "Update buyer's details",
  operationId: "updateBuyer",
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
            firstName: {
              description: "firstname of the user",
              type: "string",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "lastname of the user",
              example: "Doe",
            },
            address: {
              type: "string",
              description: "address of the user",
              example: "No 1, snow's street, Gbagada, Lagos",
            },
            phone: {
              type: "string",
              description: "phone number of the user",
              example: "07067242865",
            },
          },
        },
      },
    },
    required: false,
  },
  responses: {
    "200": {
      description: "User details updated successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Profile updated successfully",
              },
              updatedBuyer: {
                type: "object",
                firstName: {
                  type: "string",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                },
                address: {
                  type: "string",
                  example: "No 1, snow's street, Gbagada, Lagos",
                },
                phone: {
                  type: "string",
                  example: "07067242865",
                },
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Buyer not found",
              },
            },
          },
        },
      },
    },
  },
};

const forgotPasswordBuyer = {
  tags: ["Buyers"],
  description: "Send password reset link to a buyer's email",
  operationId: "forgotPassword",
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
              example: "johndoe@gmail.com",
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
              message: {
                type: "string",
                example:
                  "Rest Password Link Sent successfully! Please check your mail",
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
              message: {
                type: "string",
                example: "No User With This Email",
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
              message: {
                type: "string",
                example: "Error Sending Reset Password Email",
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

export {
  createBuyer,
  createBuyerBody,
  verifyBuyerMail,
  resendVerifyBuyerMail,
  loginBuyer,
  updateBuyer,
  forgotPasswordBuyer,
};
=======
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
              example: "johndoe@gmail.com",
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

const loginBuyer = {
  tags: ["Buyers"],
  description: "Login a buyer using email and password",
  operationId: "loginBuyer",
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
              example: "johndoe@gmail.com",
            },
            password: {
              type: "string",
              description: "unencrypted user's password",
              example: "!1234aWe1Ro3$#",
            },
          },
        },
      },
      required: true,
    },
  },
  responses: {
    "200": {
      description: "Login successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "User login successfully",
              },
              id: {
                type: "string",
                example: "94ty-hfuw-ftr3-tu5t",
              },
              firstName: {
                type: "string",
                example: "John",
              },
              lastName: {
                type: "string",
                example: "snow",
              },
              gender: {
                type: "string",
                example: "male",
              },
              email: {
                type: "string",
                example: "male",
              },
              token: {
                type: "string",
                example:
                  "f42r4urh84u3395t53t53gng35jt93.fu3u4t40yhwwrfr2.fu349tu3udvwrf394uu",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "Email not yet verified",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "your email is yet to be verified",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Invalid email or password",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Unable to login, Invalid email or  password",
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
                example: "An Error Occured",
              },
            },
          },
        },
      },
    },
  },
};

const updateBuyer = {
  tags: ["Buyers"],
  description: "Update buyer's details",
  operationId: "updateBuyer",
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
            firstName: {
              description: "firstname of the user",
              type: "string",
              example: "John",
            },
            lastName: {
              type: "string",
              description: "lastname of the user",
              example: "Doe",
            },
            address: {
              type: "string",
              description: "address of the user",
              example: "No 1, snow's street, Gbagada, Lagos",
            },
            phone: {
              type: "string",
              description: "phone number of the user",
              example: "07067242865",
            },
          },
        },
      },
    },
    required: false,
  },
  responses: {
    "200": {
      description: "User details updated successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Profile updated successfully",
              },
              updatedBuyer: {
                type: "object",
                firstName: {
                  type: "string",
                  example: "John",
                },
                lastName: {
                  type: "string",
                  example: "Doe",
                },
                address: {
                  type: "string",
                  example: "No 1, snow's street, Gbagada, Lagos",
                },
                phone: {
                  type: "string",
                  example: "07067242865",
                },
              },
            },
          },
        },
      },
    },
    "404": {
      description: "User not found",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Buyer not found",
              },
            },
          },
        },
      },
    },
  },
};

const forgotPasswordBuyer = {
  tags: ["Buyers"],
  description: "Send password reset link to a buyer's email",
  operationId: "forgotPassword",
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
              example: "johndoe@gmail.com",
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
              message: {
                type: "string",
                example:
                  "Reset Password Link Sent successfully! Please check your mail",
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
              message: {
                type: "string",
                example: "No User With This Email",
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
              message: {
                type: "string",
                example: "Error Sending Reset Password Email",
              },
            },
          },
        },
      },
    },
  },
};

const resetpasswordBuyer = {
  tags: ["Buyers"],
  description:
    "Reset buyer Password By Using The Link Sent From Forgot Password Endpoint",
  operationId: "resetpassword",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "Id",
      in: "path",
      description: "This Id Is The Buyer's ID",
      required: true,
      schema: {
        type: "string",
      },
    },
    {
      name: "Token",
      in: "path",
      description: "This Is The Token Sent To The Buyer's Email",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            password: {
              description: "new unencrypted vendor password",
              type: "string",
              example: "!1234aWe1Ro3$#",
            },
            confirmpassword: {
              description: "confirm unencrypted vendor password",
              type: "string",
              example: "!1234aWe1Ro3$#",
            },
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "200": {
      description: "Password Reset Successful",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Password Reset Successfully!",
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
              message: {
                type: "string",
                example: "No User With This Id",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "Passwords Do Not Match",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Passwords Do Not Match!",
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
              message: {
                type: "string",
                example: "Error Reseting Password",
              },
            },
          },
        },
      },
    },
  },
};

const addToCart = {
  tags: ["Buyers"],
  description:
    "Adding products into cart",
  operationId: "addtocart",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "ProductId",
      in: "path",
      description: "This Id Is The Product's ID",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            quantity: {
              description: "quantity of product",
              type: "number",
              example: 5,
            }
          },
        },
      },
    },
    required: true,
  },
  responses: {
    "201": {
      description: "Product Successfully Added To Old Cart",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Product Successfully Added To Old Cart!",
              },
            },
          },
        },
      },
    },
    "200": {
      description: "Product Successfully Added To New Cart",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Product Successfully Added To New Cart!",
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
              message: {
                type: "string",
                example: "No User With This Id",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "No Product With This Id",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No Product With This Id!",
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
              message: {
                type: "string",
                example: "Error Adding To Cart",
              },
            },
          },
        },
      },
    },
  },
};


const checkOut = {
  tags: ["Buyers"],
  description:
    "Checking out",
  operationId: "checkout",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "cartId",
      in: "path",
      description: "This Id Is The Cart's ID",
      required: true,
      schema: {
        type: "string",
      },
    },
  ],
  responses: {
    "201": {
      description: "Total Price",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Total Price!",
              },
            },
          },
        },
      },
    },
    "400": {
      description: "No Cart To CheckOut",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No Cart To CheckOut!",
              },
            },
          },
        },
      },
    },
    "401": {
      description: "This cart does'nt Belong To This User, Can't Check It Out",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "This cart does'nt Belong To This User, Can't Check It Out!",
              },
            },
          },
        },
      },
    },
    "402": {
      description: "No Such Cart",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No Such Cart!",
              },
            },
          },
        },
      },
    },
    "403": {
      description: "No Such User",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "No Such User!",
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
              message: {
                type: "string",
                example: "Error Checking Out",
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
      description: "unencrypted user's password, password must contain capital letter, small letter, a special character and must be at least 6 chars",
      example: "!1234aWe1Ro3$#",
    },
    address: {
      type: "string",
      description: "address of the buyer",
      example: "No 6, Anthony street, Gbagada, Lagos",
    },
  },
};

export {
  createBuyer,
  createBuyerBody,
  verifyBuyerMail,
  resendVerifyBuyerMail,
  loginBuyer,
  updateBuyer,
  forgotPasswordBuyer,
  resetpasswordBuyer,
  addToCart,
  checkOut
};
>>>>>>> 08b87137c6917c6ef3350ec59a93ec2f976b6ab1
