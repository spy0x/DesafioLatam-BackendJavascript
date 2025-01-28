import jwt from "jsonwebtoken";

export const generateToken = (username: string) => {
  const jwtSecret = process.env.JWT_SECRET || "secret";
  return jwt.sign({username}, jwtSecret, {expiresIn: "1h"});
}