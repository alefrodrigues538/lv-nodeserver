import { Request, Response } from "express";
import { Product } from "./product.class";
import { destroy, destroyMany, getByUuid, index, store, update } from "./products.service";

export async function getAllProducts(req:Request, res:Response){
    const result = await index();
    return res.json(result);
}

export async function findByUuid(req:Request, res:Response){
    const result = await getByUuid(req.params.uuid);
    return res.json(result);
}

export async function createProduct(req:Request, res:Response){
    const { description, value, promotionValue, imgUrl} = req.body;
    const product = new Product(description, value, promotionValue, imgUrl);
    const result = await store(product);
    return res.json(result);
}

export async function updateProduct(req:Request, res:Response){
    const result = await update(req.body, req.params.uuid);
    return res.json(result);
}

export async function deleteProduct(req:Request, res:Response){
    const result = await destroy(req.params.uuid);
    return res.json(result);
}

export async function deleteManyProducts(req:Request, res:Response){
    const result = await destroyMany(Array(req.body.uuids));
    return res.json(result);
}