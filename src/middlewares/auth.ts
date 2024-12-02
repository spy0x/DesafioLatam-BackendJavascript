import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";


export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET || "secret";
    console.log(jwtSecret);
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).send("NO TOKEN PROVIDED");
        return;
    }
    try {
        jwt.verify(token, jwtSecret);
        next();
    } catch (error) {
        res.status(401).send("INVALID TOKEN");
    }
}