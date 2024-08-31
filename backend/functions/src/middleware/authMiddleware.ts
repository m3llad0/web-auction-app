import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export default function Authorize(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;
    if (!token) {
        return response.status(401).send({message: 'Unauthorized'});
    }

    try {
        const decoded = verify(token, JWT_SECRET);
        request.body.userId = (decoded as JwtPayload).id;
        next();
    } catch (e) {
        return response.status(401).send({message: 'Unauthorized'});
    }
}