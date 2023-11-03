require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const expressfileupload = require('express-fileupload')
const express = require('express')

const authModule = require('./modules/auth/auth.index')
const ordersModule = require('./modules/orders/orders.index')
const productsModule = require('./modules/products/products.index')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(expressfileupload())
app.use(express.json())

app.use(authModule)
app.use(ordersModule)
app.use(productsModule)

app.listen(process.env.PORT, console.log(process.env.PORT))