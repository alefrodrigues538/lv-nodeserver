import defaultResponse from '../../utils/defaultResponse';

import UserModel from "./user.schema";
import { User } from "./user.class";
import { randomUUID } from 'crypto';
import bcrypt from 'bcrypt';

export async function index() {
    const users = await UserModel
        .find()
        .exec()
    if (users) {
        return defaultResponse(false, '', users)
    } else {
        return defaultResponse(true, 'nada encontrado', [])
    }
}
export async function getByUuid(uuid: string) {
    try {
        const user = await UserModel.findOne({ uuid }).exec()
        if (user) {
            return defaultResponse(false, '', user)
        } else {
            return defaultResponse(true, 'usuario nao encontrado', [])
        }
    } catch (error) {
        return defaultResponse(true, 'erro ao buscar usuario', error)
    }
}
export async function store(user: User) {
    try {
        const searchUser = await UserModel.findOne({
            email: user.getEmail()
        }).exec();
        if (!searchUser) {
            const newUser = await UserModel.create({
                uuid: randomUUID(),
                username: user.getUsername(),
                email: user.getEmail(),
                password: await bcrypt.hashSync(user.getPassword(), 10),
                accessLevel: user.getAccessLevel()
            })
            if (newUser) {
                return defaultResponse(false, 'usuario criado com sucesso!', newUser);
            } else {
                return defaultResponse(true, 'erro ao criar usuario', []);
            }
        } else {
            return defaultResponse(true, 'usuario ja esta cadastrado', []);
        }
    } catch (error) {
        return defaultResponse(true, 'erro ao criar usuario', error);
    }
}
export async function update(data: [], uuid: string) {
    try {
        const result = await UserModel.updateOne({ uuid }, data)
        if (result.modifiedCount > 0) {
            return defaultResponse(false, 'usuario alterado com sucesso!', result);
        } else {
            return defaultResponse(true, 'usuario nao encontrado', result);
        }
    } catch (error) {
        return defaultResponse(true, 'erro ao alterar usuario!', error);
    }
}
export async function destroy(uuid: string) {
    const result = await UserModel.deleteOne({
        uuid
    });

    if (result.deletedCount > 0) {
        return defaultResponse(false, 'usuario deletado com sucesso!', result);
    } else {
        return defaultResponse(false, 'usuario nao encontrado', [result]);
    }
}