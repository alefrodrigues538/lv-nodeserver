import { randomUUID } from "crypto";
import defaultResponse from "../../utils/defaultResponse";
import { Product } from "./product.class";
import ProductModel from "./product.schema";

export async function index(){
    try {
        const products = await ProductModel
        .find()
        .exec()
    
        if(products){
            return defaultResponse(false, '', products);
        }else{
            return defaultResponse(true, 'Nenhum produto encontrado!', []);
        }
    } catch (error) {
        return defaultResponse(true, 'Erro ao procurar produtos!', error);
    }
}

export async function getByUuid(uuid:string){
    try{
        const product = await ProductModel.findOne({uuid})
        .exec()

        if(product){
            return defaultResponse(false, 'produto encontrado!', product);
        }else{
            return defaultResponse(true, 'produto nao encontrado!', []);
        }
    }catch(error){
        return defaultResponse(true, 'Erro ao procurar produto!', error);
    }
}

export async function store(product:Product){
    try{
        const searchProd = await ProductModel.findOne({
            description:product.getDescription()
        }).exec();
        console.log(searchProd)
        if(!searchProd){
            const newProd = await ProductModel.create({
                uuid: randomUUID(),
                descriptiion: product.getDescription(),
                value: product.getValue(),
                promotionValue: product.getPromotionValue(),
                imgUrl: product.getImgUrl(),
            })
            if(newProd){
                return defaultResponse(false, 'Produto adicionar com sucesso!',newProd);
            }else{
                return defaultResponse(true, 'Produto ja existe no banco de dados!', []);
            }
        }else{
            return defaultResponse(true, 'Produto ja existe no banco de dados!', []);
        }
    }catch(error){
        return defaultResponse(true, 'Erro ao adicionar produto!', []);
    }
}

export async function update(data:[], uuid:string){
    try{
        const findedProd = await ProductModel.findOne({uuid}).exec();
        const result = await ProductModel.updateOne({uuid}, data)
        console.log(result)
        if(findedProd && result.modifiedCount > 0){
            return defaultResponse(false, 'Produto alterado com sucesso!', true);
        }else if(findedProd && result.modifiedCount == 0){
            return defaultResponse(false, 'Nada a alterar', true);
        }else{
            return defaultResponse(true, 'Produto nao encontrado!', false);
        }
    }catch(error){
        return defaultResponse(true, 'Erro ao alterar produto!', error);
    }
}

export async function destroy(uuid:string){
    try{
        const result = await ProductModel.deleteOne({
            uuid
        });
    
        if(result.deletedCount > 0){
            return defaultResponse(false, 'Produto deletado com sucesso!', true);
        }else{
            return defaultResponse(true, 'Produto nao encontrado!', false);
        }
    }catch(error){
        return defaultResponse(true, 'Erro ao deletar produto!', false)
    }
}

export async function destroyMany(uuids:any){
    try{
        for (let index = 0; index < uuids.length; index++) {
            const uuid = uuids[index];
            await ProductModel.deleteOne(uuid);
        }
    
        return defaultResponse(false, 'Produtos deletados com sucesso!', true);
    }catch(error){
        return defaultResponse(true, 'Erro ao deletar produtos!', false)
    }
}