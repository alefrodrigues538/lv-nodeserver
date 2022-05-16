import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { User } from "./user.class";

import { index, getByUuid, store, update, destroy } from './user.service'

export async function getAllUsers(req:Request, res:Response){
    let result = await index();
    return res.json(result)
}
export async function findByUuid(req:Request, res:Response){
    const result = await getByUuid(req.params.uuid);
    return res.json(result);
}
export async function createUser(req:Request, res:Response){
    const {username, email, password} = req.body;
    const user = new User(username, email, password);
    const result = await store(user);
    return res.status(200).json(result);
}
export async function updateUser(req:Request, res:Response){
    const data = req.body
    if(data.password){
        data.password = await bcrypt.hashSync(data.password,10);
    }

    const result = await update(data, req.params.uuid);
    return res.json(result);
}
export async function deleteUser(req:Request, res:Response){
    const result = await destroy(req.params.uuid);
    return res.json(result);
}

module.exports = {getAllUsers, findByUuid, createUser, updateUser, deleteUser};