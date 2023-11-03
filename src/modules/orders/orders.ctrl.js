const { getOrdersModel, getOrdersAdminModel, createOrderModel, updateOrderModel, updateOrderAdminModel, deleteOrderModel, deleteOrderAdminModel } = require("./orders.model");

async function getOrdersCtrl(req, res) {
    const model = await getOrdersModel(req.headers.authorization)
    return res.status(200).json({
        status: 200,
        message: "Buyurtmangiz!",
        data: model
    })
}

async function getOrdersAdminCtrl(req, res) {
    const model = await getOrdersAdminModel(req.headers.authorization)
    return res.status(200).json({
        status: 200,
        message: "Buyurtmalar!",
        data: model.rows
    })
}

async function createOrderCtrl(req, res) {
    const model = await createOrderModel(req.body, req.headers.authorization)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    } else {
        return res.status(201).json({
            status: 201,
            message: "Muvaffaqiyatli bajarildi!",
            data: model
        })
    }
}

async function updateOrderCtrl(req, res) {
    const model = await updateOrderModel(req.body, req.params, req.headers.authorization)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    }
    return res.status(200).json({
        status: 200,
        message: "Muvafaqqiyatli yangilandi!",
        data: model
    })
}

async function updateOrderAdminCtrl(req, res) {
    const model = await updateOrderAdminModel(req.body, req.params, req.headers.authorization)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    }
    return res.status(200).json({
        status: 200,
        message: "Muvafaqqiyatli yangilandi!",
        data: model
    })
}

async function deleteOrderCtrl(req, res) {
    const model = await deleteOrderModel(req.params, req.headers)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    }
    return res.status(200).json({
        status: 200,
        message: "Muvafaqiyatli o'chirildi!"
    })
}

async function deleteOrderAdminCtrl(req, res) {
    const model = await deleteOrderAdminModel(req.params, req.headers)
    if (model.action) {
        delete model.action
        return res.status(model.status).json(model)
    }
    return res.status(200).json({
        status: 200,
        message: "Muvafaqiyatli o'chirildi!"
    })
}

module.exports = { getOrdersCtrl, getOrdersAdminCtrl, createOrderCtrl, updateOrderCtrl, updateOrderAdminCtrl, deleteOrderCtrl, deleteOrderAdminCtrl }