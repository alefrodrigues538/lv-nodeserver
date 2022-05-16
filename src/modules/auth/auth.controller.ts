import { Request, Response } from "express";
import { User } from "../user/user.class";
import UserModel from "../user/user.schema";
import { authenticateUser } from "./auth.service";

export async function login(req:Request, res:Response){
    const{username, email, password} = req.body;
    const user = new User(username, email, password);
    const result = await authenticateUser(user);
    return res.json(result);
}