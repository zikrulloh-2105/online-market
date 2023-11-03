const { signUpValidation, logInValidation } = require('../../validations/auth.validation')
const { signUpCtrl, loginCtrl } = require('./auth.ctrl')

const express = require('express').Router()

express.post('/api/signup', signUpValidation, (req, res) => signUpCtrl(req, res))

express.post('/api/login', logInValidation, (req, res) => loginCtrl(req, res))

module.exports = express