export const createVendorByAdmins = {
  tags: ['Admins'],
  description: 'Create a new buyer in the system',
  operationId: 'createVendorByAdmins',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createVendorByAdminBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Vendor created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Vendor created and activated successfully!',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'Vendor already exists',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Vendor already exists',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Something went wrong! Please try again',
              },
            },
          },
        },
      },
    },
  },
};

export const GetAllVendors = {
  tags: ['Admins'],
  description: 'Get All avaliable vendors',
  operationId: 'getallVendors',
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/createVendorByAdminBody',
        },
      },
    },
    required: true,
  },
  responses: {
    '201': {
      description: 'Vendor created successfully!',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Vendor created and activated successfully!',
              },
            },
          },
        },
      },
    },
    '400': {
      description: 'Vendor already exists',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Vendor already exists',
              },
            },
          },
        },
      },
    },
    '500': {
      description: 'Internal Server Error',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              msg: {
                type: 'string',
                example: 'Something went wrong! Please try again',
              },
            },
          },
        },
      },
    },
  },
};

export const createVendorByAdminBody = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      example: 'John',
    },
    lastName: {
      type: 'string',
      example: 'Snow',
    },
    email: {
      type: 'string',
      example: 'johnsnow@email.com',
    },
    password: {
      type: 'string',
      description: "unencrypted user's password",
      example: '!1234aWe1Ro3$#',
    },
    phone: {
      type: 'string',
      example: '09000000123',
    },
    businessName: {
      type: 'string',
      example: 'Dev store',
    },
    address: {
      type: 'string',
      example: 'No 10, dev stresst, slicon valley',
    },
  },
};
