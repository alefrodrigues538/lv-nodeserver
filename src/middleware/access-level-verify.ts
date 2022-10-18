import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import UserModel from "../modules/user/user.schema";
import defaultResponse from "../utils/defaultResponse";

export async function checkAdmin(req: Request, res: Response, next: NextFunction) {
    const token = String(req.headers['authorization']).replace('Bearer ', '');

    const decoded_uuid = JSON.parse(JSON.stringify(jwt.decode(token)))
    const found_user = await UserModel.findOne({ uuid: decoded_uuid.uuid })

    console.log({ found_user })

    if (found_user && found_user.accessLevel === 2) {
        next()
        console.log(decoded_uuid.uuid)
        console.log(found_user.accessLevel)
    } else if (found_user && found_user.accessLevel < 2) {
        res.json(defaultResponse(true, 'You not have permission,access denied.', []))
    } else {
        res.json(defaultResponse(true, 'User was not found.', []))
    }
}

export async function checkOperator(req: Request, res: Response, next: NextFunction) {
    const token = String(req.headers['authorization']).replace('Bearer ', '');

    const decoded_uuid = JSON.parse(JSON.stringify(jwt.decode(token)))
    const found_user = await UserModel.findOne({ uuid: decoded_uuid.uuid })

    console.log({ found_user })

    if (found_user && found_user.accessLevel >= 1) {
        next()
        console.log(decoded_uuid.uuid)
        console.log(found_user.accessLevel)
    } else if (found_user && found_user.accessLevel < 1) {
        res.json(defaultResponse(true, 'You not have permission,access denied.', []))
    } else {
        res.json(defaultResponse(true, 'User was not found.', []))
    }
}