import { Response } from "express";

/**
 * Responds with a 500 Internal Server Error status along with the provided data and message.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object with a status of 500.
 */
const internalServerResponse = (res: Response, data: any): Response => {
  return res.status(500).json({
    status: false,
    data,
    message: data, // Assuming the data itself is the error message
  });
};

// Export the function for use in other modules
export { internalServerResponse };
