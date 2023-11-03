const { getProductsModel, createProductsModel, updateProductsModel, deleteProductModel } = require("./products.model");

async function getProductsCtrl(req, res) {
  const model = await getProductsModel()
  return res.status(200).json({
    status: 200,
    message: "Maxsulotlar!",
    data: model
  })
}

async function createProductsCtrl(req, res) {
  const model = await createProductsModel(req.body, req.files, req.headers.authorization)
  if (model.action) {
    delete model.action
    return res.status(model.status).json(model)
  }
  return res.status(200).json({
    status: 200,
    message: "Maxsulot muvaffaqiyatli qo'shildi!",
    data: model
  })
}

async function updateProductsCtrl(req, res) {
  const model = await updateProductsModel(req.body, req.files, req.params)
  if (model.action) {
    delete model.action
    return res.status(model.status).json(model)
  }
  return res.status(200).json({
    status: 200,
    message: "Muvaffaqiyatli yangilandi!",
    data: model
  })
}

async function deleteProductCtrl(req, res) {
  const model = await deleteProductModel(req.params)
  if (model.action) {
    delete model.action
    return res.status(model.status).json(model)
  }
  return res.status(200).json({
    status: 200,
    message: "Maxsulot o'chirildi!"
  })
}

module.exports = { getProductsCtrl, createProductsCtrl, updateProductsCtrl, deleteProductCtrl }