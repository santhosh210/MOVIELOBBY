import { Response } from "express";

/**
 * Responds with a 400 Bad Request status along with the provided data and message.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object.
 */
const badRequest = (res: Response, data: any) => {
  return res.status(400).json({
    status: 400,
    data,
    message: data[0].msg, // Assuming the first item in the data array contains the error message
  });
};

/**
 * Responds with a 403 Forbidden status along with the provided data and message.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object.
 */
const unauthorized = (res: Response, data: any) => {
  return res.status(403).json({
    status: 403,
    data,
    message: data, // Assuming the data itself is the error message
  });
};

// Export the functions for use in other modules
export { unauthorized, badRequest };
