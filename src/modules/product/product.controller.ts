import { Request, Response } from "express";
import { Product } from "./product.class";
import { destroy, destroyMany, getByUuid, index, store, update } from "./products.service";

export async function getAllProducts(req: Request, res: Response) {
    const result = await index();
    return res.json(result);
}

export async function findByUuid(req: Request, res: Response) {
    const result = await getByUuid(req.params.uuid);
    return res.json(result);
}

export async function createProduct(req: any, res: Response) {
    const { description, value, promotionValue, stockAmount, unity, categoryId, departmentId, rateAmount } = req.body;
    const filename = req.file.filename

    const product = new Product(
        description, value, promotionValue, filename, stockAmount, unity, categoryId, departmentId);

    const result = await store(product);
    return res.json(result);
}

export async function updateProduct(req: Request, res: Response) {
    const { description, value, promotionValue, imgUrl } = req.body;
    const newData = new Product(description, value, promotionValue, imgUrl);

    const result = await update(newData, req.params.uuid);
    return res.json(result);
}

export async function deleteProduct(req: Request, res: Response) {
    const result = await destroy(req.params.uuid);
    return res.json(result);
}

export async function deleteManyProducts(req: Request, res: Response) {
    const result = await destroyMany(req.body.uuids);
    return res.json(result);
}