const { verifyToken } = require('../lib/jwt')
const { uniqRow } = require('../lib/pg')

function checkAuthorizationMiddleware(isAdmin = false) {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization
      if (!authorization) {
        return res.status(400).json({
          status: 400,
          message: "Headersda AUTHORIZATION bo'lishi kerak!"
        })
      }

      const verifiedToken = verifyToken(authorization)
      const checkUser = await uniqRow('select * from users where user_id = $1', verifiedToken.id)
      if (!checkUser.rows.length) {
        return res.status(400).json({
          status: 400,
          message: "Token xato"
        })
      }


      if (isAdmin && !checkUser.rows[0].user_is_admin) {
        return res.status(400).json({
          status: 400,
          message: "Siz admin emassiz!"
        })
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { checkAuthorizationMiddleware }