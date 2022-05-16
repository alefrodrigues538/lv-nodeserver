const express = require('express')

import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../middleware/jwt-verify";
import { authController } from "../modules/auth";
import { productController } from "../modules/product";
import { userController } from "../modules/user";

const router = express.Router();

router.get('/', (req:Request, res:Response, next:NextFunction)=>{
    res.json({
        version: '1.0.0',
    })
})

//AUTH ROUTES
router.post('/auth/login', authController.login);

//USER ROUTES
router.get('/users', jwtVerify, userController.getAllUsers);
router.get('/user/:uuid', jwtVerify, userController.findByUuid);
router.post('/users', userController.createUser);
router.put('/users/:uuid', jwtVerify, userController.updateUser);
router.delete('/user/:uuid', jwtVerify, userController.deleteUser);

//PRODUCT ROUTES
router.get('/products', jwtVerify, productController.getAllProducts);
router.get('/product/:uuid', jwtVerify, productController.findByUuid);
router.post('/products', jwtVerify, productController.createProduct);
router.put('/products/:uuid', jwtVerify, productController.updateProduct);
router.delete('/product/:uuid', jwtVerify, productController.deleteProduct);
router.delete('/products', jwtVerify, productController.deleteManyProducts);

export default router;