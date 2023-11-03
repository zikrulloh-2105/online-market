const { getProductsCtrl, createProductsCtrl, updateProductsCtrl, deleteProductCtrl } = require('./products.ctrl')
const { createProductValidation, productIdValidation } = require('../../validations/products.validation')
const { checkAuthorizationMiddleware } = require('../../middlewares/checkAuthorizationMiddleware')
const { fileuploadMiddleware } = require('../../middlewares/fileupload.middleware')
const { fileInfo } = require('../../config/files')

const express = require('express').Router()

express.get('/api/products', (req, res) => getProductsCtrl(req, res))

express.post('/api/products', checkAuthorizationMiddleware(true), createProductValidation, fileuploadMiddleware('product_img', [fileInfo.typeJpeg, fileInfo.typePng], fileInfo.size), (req, res) => createProductsCtrl(req, res))

express.patch('/api/products/:product_id', checkAuthorizationMiddleware(true), productIdValidation, (req, res) => updateProductsCtrl(req, res))

express.delete('/api/products/:product_id', checkAuthorizationMiddleware(true), productIdValidation, (req, res) => deleteProductCtrl(req, res))

module.exports = express