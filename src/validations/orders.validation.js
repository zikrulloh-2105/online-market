const { checkUid } = require("../middlewares/usefulfunctions")

function orderIdValidation(req, res, next) {
  const { order_id } = req.params

  if (!checkUid(order_id)) {
    return res.status(403).json({
      status: 403,
      message: "ID noto'g'ri!"
    })
  } else {
    next()
  }
}

function orderProductValidation(req, res, next) {
  const { products } = req.body

  if (!products.length) {
    return res.status(404).json({
      status: 404,
      message: "Hech qanday maxsulot qo'shmadingiz!"
    })
  } else {
    next()
  }
}

module.exports = { orderIdValidation, orderProductValidation }