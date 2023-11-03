const { getOrdersCtrl, getOrdersAdminCtrl, createOrderCtrl, updateOrderCtrl, updateOrderAdminCtrl, deleteOrderCtrl, deleteOrderAdminCtrl } = require('./orders.ctrl')
const { orderIdValidation, orderProductValidation } = require('../../validations/orders.validation')
const { checkAuthorizationMiddleware } = require('../../middlewares/checkAuthorizationMiddleware')

const express = require('express').Router()

express.get('/api/orders', checkAuthorizationMiddleware(), (req, res) => getOrdersCtrl(req, res))

express.get('/api/orders/all', checkAuthorizationMiddleware(true), (req, res) => getOrdersAdminCtrl(req, res))

express.post('/api/orders', checkAuthorizationMiddleware(), orderProductValidation, (req, res) => createOrderCtrl(req, res))

express.patch('/api/orders/:order_id', checkAuthorizationMiddleware(), orderIdValidation, orderProductValidation, (req, res) => updateOrderCtrl(req, res))

express.patch('/api/orders/admin/:order_id', checkAuthorizationMiddleware(true), orderIdValidation, orderProductValidation, (req, res) => updateOrderAdminCtrl(req, res))

express.delete('/api/orders/:order_id', checkAuthorizationMiddleware(), orderIdValidation, (req, res) => deleteOrderCtrl(req, res))

express.delete('/api/orders/admin/:order_id', checkAuthorizationMiddleware(true), orderIdValidation, (req, res) => deleteOrderAdminCtrl(req, res))

module.exports = express