require('dotenv').config({ path: require('path').join(__dirname, '../../.env') })
const jwt = require('jsonwebtoken')

const jwtKey = process.env.JWTKEY
const expiresIn = process.env.JWTEXPIRATION

function generateToken(payload) {
  try {
    const token = jwt.sign(payload, jwtKey, ({ expiresIn }))
    return token
  } catch (error) {
    return {
      action: true,
      error
    }
  }
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, jwtKey)
    return payload
  } catch (error) {
    return {
      action: true,
      error
    }
  }
}

module.exports = { generateToken, verifyToken }