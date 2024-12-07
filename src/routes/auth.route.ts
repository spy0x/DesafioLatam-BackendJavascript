import {Router} from "express";
import jwt from "jsonwebtoken";

export const authRouter = Router();

authRouter.post("/register", (req, res) => {
    const {username} = req.body;
    res.send(generateToken(username));
});

const generateToken = (username: string) => {
    const jwtSecret = process.env.JWT_SECRET || "secret";
    return jwt.sign({username}, jwtSecret, {expiresIn: "1h"});
}