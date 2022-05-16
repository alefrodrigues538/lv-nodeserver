import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import defaultResponse from "../utils/defaultResponse";

export function jwtVerify(req:Request, res:Response, next:NextFunction){
    const token = String(req.headers['authorization']).replace('Bearer ', '');
    
    if (!token) return res.status(401).json(defaultResponse(true, 'No token provided',[]));
    
    jwt.verify(token, String(process.env.SECRET), function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
      next();
    });
}