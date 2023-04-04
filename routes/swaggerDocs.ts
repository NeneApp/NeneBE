/**
 * @swagger
 * /api/users/buyers:
 *     post:
 *         summary: Registers a single buyer
 *         tags:
 *             - Auth
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                         schema:
 *                          type: object
 *                          required:
 *                              - firstName
 *                              - lastName
 *                              - email
 *                              - password
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  description: The firstname of the buyer
 *                              lastname:
 *                                  type: string
 *                                  description: The lastname of the buyer
 *                              email:
 *                                  type: string
 *                                  description: The email of the buyer
 *                              password:
 *                                  type: string
 *                                  description: The password of the buyer
 * 
 *         responses:
 *             '201':
 *                description: success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: User created successfully! Please check your mail
 * 
 *             '400':
 *                 description: Server Error
 *                 content:
 *                     application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: Something went wrong! Please try again.
 *              defualt:
 *                 description: unexpected error
 * /auth/login:
 *     post:
 *         summary: Logs in a single user with correct login credentials
 *         tags:
 *             - Auth
 *         requestBody:
 *             description: a json with all fields
 *             required: true
 *             content:
 *                 application/json:
 *                         schema:
 *                          type: object
 *                          required:
 *                              - email
 *                              - password
 *                              - rememberMe
 *                          properties:
 *                              email:
 *                                  type: string
 *                                  description: The email of the user
 *                              password:
 *                                  type: string
 *                                  description: The password of the user
 *                              rememberMe:
 *                                  type: boolean
 *                                  description: Keep user logged in
 * 
 *         responses:
 *             '200':
 *                description: success
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: success message.
 *                                data:
 *                                     type: object
 *             '404':
 *                 description: Email already exists
 *                 content:
 *                     application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: fail message.
 *             '400':
 *                 description: Please provide all details
 *                 content:
 *                     application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                message:
 *                                     type: string
 *                                     description: fail message.
 */