import {Router} from "express";
import jwt from "jsonwebtoken";

export const authRouter = Router();
const jwtSecret = process.env.JWT_SECRET || "secret";

authRouter.get("/register", (req, res) => {
    const {username} = req.body;
    const token = jwt.sign({username}, jwtSecret, {expiresIn: "1h"});
    res.send(token);
});
    