const uploadSingleFile = {
    tags: ["S3bucket"],
    description: "This endpoint allows you to upload a single image or video file to s3bucket on AWS",
    operationId: "uploadSingleFile",
    parameters: [
        {
            name: "file",
            in: "formData",
            description: "The file to upload",
            required: "true",
            type: "file"
        }
    ],
    response: {
        200: {
            description: "Failed to upload files to S3 bucket",
            content: {
                "application/json": {
                    schema: {
                        type: "string",
                        example: "Successfully uploaded https://s3.amazonaws.com/bucket-name/filename location!"
                    }
                }
            }
        },
        "400": {
            description: "internal server error",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            error: {
                                type: "string"
                            }
                        }
                    }
                }
            }
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
        }
    }
}

const uploadMultipleFile = {
    tags: ["S3bucket"],
    description: "This endpoint allows you to upload multiple images or videos file to s3bucket on AWS",
    operationId: "uploadMultipleFiles",
    consumes: "multipart/form-data",
    parameters: [
        {
            name: "files",
            in: "formData",
            description: "The files to upload",
            required: "true",
            type: "array",
            items: {
                type: "file"
            }
        }
    ],
    response: {
        200: {
            description: "files upload successfully",
            content: {
                "application/json": {
                    schema: {
                        type: "string",
                        example: "Successfully uploaded https://s3.amazonaws.com/bucket-name/filename location!"
                    }
                }
            }
        },
        "400": {
            description: "Failed to upload files to S3 bucket",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        properties: {
                            error: {
                                type: "string"
                            }
                        }
                    }
                }
            }
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
        }
    }
}

const getAllFiles = {
    summary: "Get all files",
    description: "Retrieves a list of all files stored in the S3 bucket.",
    produces: "application/json",
    responses: {
        "200": {
            description: "Success",
            schema: {
                type: "array",
                items: {
                    type: "string",
                    example: "https://s3.amazonaws.com/bucket-name/filename1"
                }
            }
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
        }
    }
}

const downloadFile = {
    summary: "Download a file",
    description: "Downloads the specified file from the S3 bucket.",
    produces: "application/json",
    parameters: {
        name: "filename",
        in: "path",
        description: "The name of the file to download",
        required: true,
        type: "string"
    },
    responses: {
        "200": {
            description: "Success",
            schema: {
                type: "array",
                items: {
                    type: "file"
                }
            }
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
                                type: "string"
                            },
                        },
                    },
                },
            },
        }
    }
}

const deleteFile = {
    summary: "Delete a file",
    description: "Deletes the specified file from the S3 bucket",
    produces: "application/json",
    parameters: {
        name: "filename",
        in: "path",
        description: "The name of the file to delete",
        required: true,
        type: "string"
    },
    responses: {
        "200": {
            description: "Success",
            schema: {
                type: "array",
                example: "File Deleted Successfully"
            }
        },
        "500": {
            description: "Internal server error",
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        message: {
                            type: "string",
                            example: "Internal server error",
                        },
                        error: {
                            type: "string"
                        },
                    },
                },
            },
        }
    }
}

export {
    uploadSingleFile,
    uploadMultipleFile,
    downloadFile,
    getAllFiles,
    deleteFile
}