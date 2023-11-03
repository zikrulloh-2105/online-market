const { signUpModel, logInModel } = require('./auth.model')

async function signUpCtrl(req, res) {
    const model = await signUpModel(req.body)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    } else {
        return res.status(201).json({
            status: 201,
            message: "Siz tizimda muvaffaqqiyatli ro'yxatdan o'tdingiz!",
            data: model.rows[0]
        })
    }
}

async function loginCtrl(req, res) {
    const model = await logInModel(req.body)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    } else {
        return res.status(200).json({
            status: 200,
            message: "Siz tizimga muvaffaqiyatli kirdingiz!",
            token: model
        })
    }
}

module.exports = { signUpCtrl, loginCtrl }