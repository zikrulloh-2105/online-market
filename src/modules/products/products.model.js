const { verifyToken } = require('../../lib/jwt')
const { uniqRow } = require('../../lib/pg')
const path = require('path')
const fs = require('fs')

async function getProductsModel() {
  return (await uniqRow('select * from products')).rows
}

async function createProductsModel(body, files, token) {
  const { product_name, product_price, product_quantity } = body
  const { product_img } = files

  const img_name = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + path.extname(product_img.name)}`;

  const user_id = verifyToken(token).id

  const data = await uniqRow('insert into products(product_name, product_price, product_quantity, product_img, user_id) values ($1, $2, $3, $4, $5) returning *', product_name, product_price, product_quantity, img_name, user_id)

  product_img.mv(path.join(__dirname, './../../../uploads/', img_name))

  return data.rows[0]
}

async function updateProductsModel(body, files, params) {
  const { product_name, product_price, product_quantity } = body

  const checkProduct = await uniqRow('select * from products where product_id = $1', params.product_id)
  if (!checkProduct.rows.length) {
    return {
      action: true,
      status: 404,
      message: "Bu ID bilan hech qanday maxsulot topilmadi!"
    }
  }

  const name = product_name ? product_name : checkProduct.rows[0].product_name
  const price = product_price ? product_price : checkProduct.rows[0].product_price
  const quantity = product_quantity ? product_quantity : checkProduct.rows[0].product_quantity
  let img = checkProduct.rows[0].product_img

  if (files) {
    const { product_img } = files
    const filePath = path.join(__dirname, './../../../uploads/', checkProduct.rows[0].product_img)
    const checkFilesIfExists = fs.existsSync(filePath)
    if (checkFilesIfExists) {
      fs.unlinkSync(filePath)
    }
    const img_name = `${Date.now()}-${String(Math.round(Math.random() * 1e9)).padEnd(15, '0') + path.extname(product_img.name)}`;
    product_img.mv(path.join(__dirname, './../../../uploads/', img_name))
    img = img_name
  }

  const newProduct = await uniqRow('update products set product_name = $1, product_price = $2, product_quantity = $3, product_img = $4 where product_id = $5 returning *', name, price, quantity, img, params.product_id)
  return newProduct.rows
}

async function deleteProductModel(params) {
  const checkProduct = await uniqRow('select * from products where product_id = $1', params.product_id)
  if (!checkProduct.rows.length) {
    return {
      action: true,
      status: 404,
      message: "Bu ID bilan maxsulot topilmadi!"
    }
  }

  const checkProductRef = await uniqRow('select * from order_products where product_id = $1', params.product_id)
  if (checkProductRef.rows.length) {
    return {
      action: true,
      status: 400,
      message: "Bu maxsulotni o'chirish mumkin emas!"
    }
  }

  await uniqRow('delete from products where product_id = $1', params.product_id)

  const filePath = path.join(__dirname, './../../../uploads/', checkProduct.rows[0].product_img)
  fs.unlinkSync(filePath)

  return 200
}

module.exports = { getProductsModel, createProductsModel, updateProductsModel, deleteProductModel }