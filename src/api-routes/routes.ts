const express = require('express')
import multer from 'multer'

const multerConfig = require('../config/multer.config')

import { NextFunction, Request, Response } from "express";
import { jwtVerify } from "../middleware/jwt-verify";
import { authController } from "../modules/auth";
import { productController } from "../modules/product";
import { userController } from "../modules/user";
import { checkAdmin, checkOperator } from '../middleware/access-level-verify';

const router = express.Router();

const upload = multer({ dest: '../../tmp/uploads' })

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        version: '1.0.0',
    })
})

//AUTH ROUTES
router.post('/auth/login', authController.login);

//UPLOAD IMGS
router.post('/upload/image', multer(multerConfig).single('photo'), (req: any, res: any) => {
    console.log('file', req.file)
    res.send(req.files)
})

//USER ROUTES
router.get('/users', jwtVerify, userController.getAllUsers);
router.get('/user/:uuid', jwtVerify, checkOperator, userController.findByUuid);
router.post('/users', userController.createUser);
router.put('/users/:uuid', jwtVerify, checkAdmin, userController.updateUser);
router.delete('/user/:uuid', jwtVerify, checkAdmin, userController.deleteUser);

//PRODUCT ROUTES
router.get('/products', jwtVerify, productController.getAllProducts);
router.get('/product/:uuid', jwtVerify, productController.findByUuid);
router.post('/products', jwtVerify, checkOperator, multer(multerConfig).single('photo'), productController.createProduct);
router.put('/product/:uuid', jwtVerify, checkOperator, multer(multerConfig).single('photo'), productController.updateProduct);
router.delete('/product/:uuid', jwtVerify, checkOperator, productController.deleteProduct);
router.delete('/products', jwtVerify, checkOperator, productController.deleteManyProducts);

export default router;