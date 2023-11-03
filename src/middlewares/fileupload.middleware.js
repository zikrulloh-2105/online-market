function fileuploadMiddleware(fileName, fileType, fileSize, fileRequired = true) {
  return async (req, res, next) => {
    try {
      if (fileRequired) {
        if (!req.files || !req.files[fileName]) {
          return res.status(403).json({
            status: 403,
            message: "product_img yuklashda xatolik!"
          })
        }
        if (!Object.values(fileType).includes(req.files[fileName].mimetype)) {
          return res.status(403).json({
            status: 403,
            message: "product_img noto'g'ri formatda!"
          });
        }
        if (req.files[fileName].size > fileSize) {
          return res.status(403).json({
            status: 403,
            message: "product_img hajmi katta!"
          })
        }
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { fileuploadMiddleware }