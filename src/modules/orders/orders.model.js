const { checkUid } = require('../../middlewares/usefulfunctions')
const { verifyToken } = require('../../lib/jwt')
const { uniqRow } = require('../../lib/pg')

async function getOrdersModel(token) {
    const verifiedToken = verifyToken(token).id
    const query = `
        select
        u.user_id,
        u.user_first_name,
        u.user_last_name,
        json_agg (jsonb_build_object (
                'order_id', o.order_id,
                'products', (
                    select
                        json_agg (jsonb_build_object (
                                'product_id', p.product_id,
                                'product_name', p.product_name,
                                'product_price', p.product_price,
                                'product_quantity', p.product_quantity
                        ))
                    from order_products as op
                    inner join products as p on p.product_id = op.product_id
                    where op.order_id = o.order_id
                )
        )) as orders
        from users as u
        inner join orders as o on o.user_id = u.user_id
        where u.user_id = $1
        group by
            u.user_id,
            u.user_first_name,
            u.user_last_name;
    `
    let result = await uniqRow(query, verifiedToken)

    return result.rows
}

async function getOrdersAdminModel() {
    const query = `
        select
        u.user_id,
        u.user_first_name,
        u.user_last_name,
        json_agg (jsonb_build_object (
                'order_id', o.order_id,
                'products', (
                    select
                        json_agg (jsonb_build_object (
                                'product_id', p.product_id,
                                'product_name', p.product_name,
                                'product_price', p.product_price,
                                'product_quantity', p.product_quantity
                        ))
                    from order_products as op
                    inner join products as p on p.product_id = op.product_id
                    where op.order_id = o.order_id
                )
        )) as orders
        from users as u
        inner join orders as o on o.user_id = u.user_id
        group by
            u.user_id,
            u.user_first_name,
            u.user_last_name;
    `
    let result = await uniqRow(query)

    return result
}

async function createOrderModel(body, token) {
    const { products } = body

    for (const product of products) {
        if (!checkUid(product)) {
            return {
                action: true,
                status: 404,
                message: `Maxsulot IDsi noto'g'ri formatda! product → ${product}`
            }
        }
        const checkProductsExists = await uniqRow('select product_id from products where product_id = $1', product)
        if (!checkProductsExists.rows.length) {
            return {
                action: true,
                status: 404,
                message: `Bunday Product topilmadi. product → ${product}`
            }
        }
    }

    const createOrder = await uniqRow('insert into orders (user_id) values ($1) returning *', verifyToken(token).id)

    for (const product of products) {
        const obj = await uniqRow('insert into order_products (product_id, order_id) values ($1, $2)', product, createOrder.rows[0].order_id)
    }
    return createOrder.rows[0]

}

async function updateOrderModel(body, params, token) {
    const { products } = body

    const checkOrder = await uniqRow('select * from orders where order_id = $1', params.order_id)
    if (!checkOrder.rows.length) {
        return {
            action: true,
            status: 404,
            message: "Bu ID bilan buyurtma topilmadi!"
        }
    }

    const userId = await verifyToken(token).id
    if ((checkOrder.rows[0].user_id != userId)) {
        return {
            action: true,
            status: 400,
            message: "Buyurtma sizniki emas, uni o'zgartirolmaysiz!"
        }
    }

    for (const product of products) {
        if (!checkUid(product)) {
            return {
                action: true,
                status: 404,
                message: `Maxsulot IDsi noto'g'ri formatda! product → ${product}`
            }
        }
        const checkProduct = await uniqRow('select * from products where product_id = $1', product)
        if (!checkProduct.rows.length) {
            return {
                action: true,
                status: 404,
                message: `Bunday maxsulot topilmadi. product → ${product}`,
            }
        }
    }

    await uniqRow('delete from order_products where order_id = $1', params.order_id)

    for (const product of products) {
        const updatedOrderProducts = (await uniqRow('insert into order_products (product_id, order_id) values ($1, $2) returning *', product, params.order_id)).rows
    }

    return 200

}

async function updateOrderAdminModel(body, params, token) {
    const { products } = body

    const checkOrder = await uniqRow('select * from orders where order_id = $1', params.order_id)
    if (!checkOrder.rows.length) {
        return {
            action: true,
            status: 404,
            message: "Bu ID bilan buyurtma topilmadi!"
        }
    }

    for (const product of products) {
        if (!checkUid(product)) {
            return {
                action: true,
                status: 404,
                message: `Maxsulot IDsi noto'g'ri formatda! product → ${product}`
            }
        }
        const checkProduct = await uniqRow('select * from products where product_id = $1', product)
        if (!checkProduct.rows.length) {
            return {
                action: true,
                status: 404,
                message: `Bunday maxsulot topilmadi. product → ${product}`,
            }
        }
    }

    await uniqRow('delete from order_products where order_id = $1', params.order_id)

    for (const product of products) {
        const updatedOrderProducts = (await uniqRow('insert into order_products (product_id, order_id) values ($1, $2) returning *', product, params.order_id)).rows
    }

    return 200

}

async function deleteOrderModel(params, headers) {
    const checkOrder = await uniqRow('select * from orders where order_id = $1', params.order_id)
    if (!checkOrder.rows.length) {
        return {
            action: true,
            status: 404,
            message: "Bu ID bilan buyurtma topilmadi!"
        }
    }

    const userId = await verifyToken(headers.authorization).id
    if ((checkOrder.rows[0].user_id != userId)) {
        return {
            action: true,
            status: 400,
            message: "Buyurtma sizniki emas, uni o'chirolmaysiz!"
        }
    }

    await uniqRow('delete from order_products where order_id = $1', params.order_id)

    await uniqRow('delete from orders where order_id = $1', params.order_id)

    return 200
}

async function deleteOrderAdminModel(params, headers) {
    const checkOrder = await uniqRow('select * from orders where order_id = $1', params.order_id)
    if (!checkOrder.rows.length) {
        return {
            action: true,
            status: 404,
            message: "Bu ID bilan buyurtma topilmadi!"
        }
    }

    await uniqRow('delete from order_products where order_id = $1', params.order_id)

    await uniqRow('delete from orders where order_id = $1', params.order_id)

    return 200
}

module.exports = { getOrdersModel, getOrdersAdminModel, createOrderModel, updateOrderModel, updateOrderAdminModel, deleteOrderModel, deleteOrderAdminModel }