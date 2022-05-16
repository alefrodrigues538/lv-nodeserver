import defaultResponse from "../../utils/defaultResponse";
import { User } from "../user/user.class";
import UserModel from "../user/user.schema";

import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

export async function authenticateUser(user:User){
    try {
        const findedUser = await UserModel.findOne({
            email:user.getEmail()
        });

        const checkPassword = await bcrypt.compare(user.getPassword(), findedUser.password)

        if(findedUser && checkPassword){
            const secret = String(process.env.SECRET)
            const token = jwt.sign({ uuid: findedUser.uuid}, secret, {
                expiresIn:60 * 60 * 12 //expira em 12 horas
            });

            return defaultResponse(false, 'usuario conectado!', {access_token: token});
        }else{
            return defaultResponse(true, 'email e/ou senha incorreto!', []);
        }
    } catch (error) {
        return defaultResponse(true, 'erro ao authenticar usuario!', error);
    }

    
}