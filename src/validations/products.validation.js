const { checkUid } = require("../middlewares/usefulfunctions")

function createProductValidation(req, res, next) {
  const { product_name, product_price, product_quantity } = req.body

  if (!product_name.trim()) {
    return res.status(403).json({
      status: 403,
      message: "product_name bo'sh bo'lmasligi kerak!"
    })
  } else if (!product_price.trim()) {
    return res.status(403).json({
      status: 403,
      message: "product_price bo'sh bo'lmasligi kerak!"
    })
  } else if (!product_quantity.trim()) {
    return res.status(403).json({
      status: 403,
      message: "product_quantity bo'sh bo'lmasligi kerak!"
    })
  } else {
    const s = product_quantity.trim()
    for (let i = 0; i < s.length; i++) {
      if (s[i] < '0' || s[i] > '9') {
        return res.status(403).json({
          status: 403,
          message: "product_quantity raqam bo'lishi kerak!"
        })
      }
    }
    return next()
  }
}

function productIdValidation(req, res, next) {
  const { product_id } = req.params

  if (!checkUid(product_id)) {
    return res.status(403).json({
      status: 403,
      message: "ID noto'g'ri!"
    })
  } else {
    next()
  }
}

module.exports = { createProductValidation, productIdValidation }