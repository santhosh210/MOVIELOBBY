import * as jwt from "jsonwebtoken";

/**
 * Generates a JSON Web Token (JWT) with the provided name and role.
 * @param {String} name - The name to be included in the JWT payload.
 * @param {String} role - The role to be included in the JWT payload.
 * @returns {Promise<string>} - A Promise that resolves to the generated JWT.
 */
export async function generateToken(name: String, role: String) {
  console.log("Generating token");

  // Sign the JWT with the provided payload, secret key, and expiration time
  let token = jwt.sign(
    { name: name, role: role },
    "AIzaSyBtGuIOhOR6D1difgbeaPQtLtHYwwGe5wM", // Replace with your secret key
    { expiresIn: "1h" } // Token expiration time (e.g., 1 hour)
  );

  console.log(token);

  // Return the generated JWT
  return token;
}
