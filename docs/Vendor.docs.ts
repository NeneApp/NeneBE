const createVendor = {
  tags: ["Vendors"],
  description: "Create a new vendor in the system",
  operationId: "createVendor",
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createVendorBody",
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

const verifyVendorMail = {
  tags: ["Vendors"],
  description: "Verify a new vendor's email",
  operationId: "verifyVendorMail",
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      name: "confirmationCode",
      in: "path",
      description: "confirmation code of the vendor that is to be verified",
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
    "404": {
      description: "Invalid verification code",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              msg: {
                type: "string",
                example: "Invalid Verification Code",
              },
            },
          },
        },
      },
    },
  },
};

const resendVerifyVendorMail = {
  tags: ["Vendors"],
  description: "Verify a new vendor's email",
  operationId: "verifyVendorMail",
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

const loginVendor = {
  tags: ["Vendors"],
  description: "Login a vendor using email and password",
  operationId: "loginVendor",
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
              businessName: {
                type: "string",
                example: "John snow venture",
              },
              email: {
                type: "string",
                example: "johnsnow@email.com",
              },
              address: {
                type: "string",
                example: "No 1, snow's street, Gbagada, Lagos",
              },
              slug: {
                type: "string",
                example: "John-snow-venture",
              },
              image: {
                type: "string",
                example: "https://mimage.com/johnsnow",
              },
              role: {
                type: "string",
                example: "Vendor",
              },
              phone: {
                type: "string",
                example: "07067242865",
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
                example:
                  "Please Activate Your Account By Confirming Your Email Address",
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
                example: "Invalid Credentials",
              },
            },
          },
        },
      },
    },
    "404": {
      description: "Vendor has not yet registered",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: {
                type: "string",
                example: "Vendor Not Found",
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
                example: "Error Logging In",
              },
            },
          },
        },
      },
    },
  },
};

const updateVendor = {
  tags: ["Vendors"],
  description: "Update vendor's details",
  operationId: "updateVendor",
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
            businessName: {
              type: "string",
              description: "user's business name",
              example: "John snow venture",
            },
            image: {
              type: "string",
              description: "image uploaded by the vedor",
              example: "https://myimage.com/vendor1",
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
                businessName: {
                  type: "string",
                  example: "John snow venture",
                },
                image: {
                  type: "string",
                  example: "https://myimage.com/vendor1",
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
                example: "Vendor not found",
              },
            },
          },
        },
      },
    },
  },
};

const forgotPasswordVendor = {
  tags: ["Vendors"],
  description: "Send password reset link to a vendor's email",
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

const resetpasswordVendor = {
  tags: ["Vendors"],
  description:
    "Reset vendor Password By Using The Link Sent From Forgot Password Endpoint",
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
      description: "This Id Is The Vendors's ID",
      required: true,
      schema: {
        type: "string",
      },
    },
    {
      name: "Token",
      in: "path",
      description: "This Is The Token Sent To The Vendors's Email",
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

const createVendorBody = {
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
    phone: {
      type: "string",
      description: "user's phone number",
      example: "07067242865",
    },
    businessName: {
      type: "string",
      description: "user's business name",
      example: "John snow venture",
    },
    address: {
      type: "string",
      description: "user's address",
      example: "No 1, snow's street, Gbagada, Lagos",
    },
  },
};

export {
  createVendor,
  createVendorBody,
  verifyVendorMail,
  resendVerifyVendorMail,
  loginVendor,
  updateVendor,
  forgotPasswordVendor,
  resetpasswordVendor,
};
