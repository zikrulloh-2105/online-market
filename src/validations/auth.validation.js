function signUpValidation(req, res, next) {
    const { user_first_name, user_last_name, user_age, user_phone_number, user_password } = req.body

    if (!user_first_name) {
        return res.status(403).json({
            status: 403,
            message: 'user_first_name majburiy'
        })
    } else if (user_first_name.length < 3) {
        return res.status(403).json({
            status: 403,
            message: 'user_first_name kamida 3 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_first_name.length > 20) {
        return res.status(403).json({
            status: 403,
            message: 'user_first_name ko\'pi bilan 20 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (!user_last_name) {
        return res.status(403).json({
            status: 403,
            message: 'user_last_name majburiy'
        })
    } else if (user_last_name.length < 3) {
        return res.status(403).json({
            status: 403,
            message: 'user_last_name kamida 3 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_last_name.length > 23) {
        return res.status(403).json({
            status: 403,
            message: 'user_last_name ko\'pi bilan 23 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (!user_age) {
        return res.status(403).json({
            status: 403,
            message: 'user_age majburiy'
        })
    } else if (user_age < 0) {
        return res.status(403).json({
            status: 403,
            message: 'user_age 0 dan kichik bo\'la olmaydi~'
        })
    } else if (user_age > 120) {
        return res.status(403).json({
            status: 403,
            message: 'user_age 120 dan katta bo\'la olmaydi!'
        })
    } else if (!user_phone_number) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number majburiy'
        })
    } else if (user_phone_number.length < 9) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number kamida 9 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_phone_number.length > 13) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number ko\'pi bilan 13 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (!user_password) {
        return res.status(403).json({
            status: 403,
            message: 'user_password majburiy'
        })
    } else if (user_password.length < 8) {
        return res.status(403).json({
            status: 403,
            message: 'user_password kamida 8 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_password.length > 16) {
        return res.status(403).json({
            status: 403,
            message: 'user_password ko\'pi bilan 16 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else {
        next()
    }
}

function logInValidation(req, res, next) {
    const { user_phone_number, user_password } = req.body

    if (!user_phone_number) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number majburiy'
        })
    } else if (user_phone_number.length < 9) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number kamida 9 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_phone_number.length > 13) {
        return res.status(403).json({
            status: 403,
            message: 'user_phone_number ko\'pi bilan 13 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (!user_password) {
        return res.status(403).json({
            status: 403,
            message: 'user_password majburiy'
        })
    } else if (user_password.length < 8) {
        return res.status(403).json({
            status: 403,
            message: 'user_password kamida 8 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else if (user_password.length > 16) {
        return res.status(403).json({
            status: 403,
            message: 'user_password ko\'pi bilan 16 ta belgidan tashkil topgan bo\'lishi kerak!'
        })
    } else {
        next()
    }
}

module.exports = { signUpValidation, logInValidation }