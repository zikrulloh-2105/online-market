const { generateToken } = require('../../lib/jwt')
const { uniqRow } = require('../../lib/pg')

async function signUpModel(body) {
    const { user_first_name, user_last_name, user_age, user_phone_number, user_password } = body

    const checkUser = await uniqRow('select * from users where user_phone_number = $1', user_phone_number)
    if (checkUser.rows.length) {
        return {
            action: true,
            status: 409,
            message: 'Bunday telefon raqamli user bazadan topildi!'
        }
    }

    const data = await uniqRow('insert into users (user_first_name, user_last_name, user_age, user_phone_number, user_password) values($1, $2, $3,$4, $5) returning *', user_first_name, user_last_name, user_age, user_phone_number, user_password)

    return data
}

async function logInModel(body) {
    const { user_phone_number, user_password } = body

    const checkUser = await uniqRow('select * from users where user_phone_number = $1 and user_password = $2', user_phone_number, user_password)
    if (!checkUser.rows.length) {
        return {
            action: true,
            status: 400,
            message: 'login qilishda xatolik'
        }
    }
    return {
        status: 200,
        message: "Tizimga muvaffaqiyatli kirdingiz!"
    }, generateToken({ id: checkUser.rows[0].user_id })
}

module.exports = { signUpModel, logInModel }