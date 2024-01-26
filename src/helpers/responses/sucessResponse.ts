import { Response } from "express";

/**
 * Responds with a 200 OK status along with the provided data.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object with a status of 200.
 */
const response200 = (res: Response, data: any): Response => {
  return res.status(200).json({
    status: true,
    data,
  });
};

/**
 * Responds with a 201 Created status along with the provided data.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object with a status of 201.
 */
const createdResponse = (res: Response, data: any): Response => {
  return res.status(201).json({
    status: 201,
    data,
  });
};

/**
 * Responds with a 202 Accepted status along with the provided data.
 * Intended for use with long-running processes.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object with a status of 202.
 */
const acceptedResponse = (res: Response, data: any): Response => {
  return res.status(202).json({
    status: 202,
    data,
  });
};

/**
 * Responds with a 204 No Content status along with the provided data.
 * Intended for cases where no additional content is expected in the response.
 * @param {Response} res - Express response object.
 * @param {any} data - Data to be included in the response.
 * @returns {Response} - The Express response object with a status of 204.
 */
const noContentResponse = (res: Response, data: any): Response => {
  return res.status(204).json({
    status: 204,
    data,
  });
};

// Export the functions for use in other modules
export { response200, createdResponse, acceptedResponse, noContentResponse };
