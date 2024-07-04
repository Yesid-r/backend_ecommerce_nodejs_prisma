import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res) => {

    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true,
                orderItems: true
            }
        })
        return res.status(200).json({ success: true, message: "orders", data: orders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}
export const findByIdUser = async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await prisma.order.findMany({
            where: {
                userId: parseInt(userId, 10)
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        })
        return res.status(200).json({ success: true, message: "Orders by user", data: orders })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

const validateStock = async (item) => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                id: item.productId
            },
            include: {
                sizes: true
            }
        });
        const size = product.sizes.find(size => size.name === item.selectedSize);
        if (size && size.quantity >= item.quantity) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};

export const create = async (req, res) => {
    try {
        const { userId, orderItems } = req.body;


        for (let orderItem of orderItems) {
            const isValid = await validateStock(orderItem);
            if (!isValid) {
                return res.status(400).json({ success: false, message: `Insufficient stock for product ${orderItem.productId}` });
            }
        }


        const order = await prisma.order.create({
            data: {
                userId,
                orderItems: {
                    create: orderItems.map(orderItem => ({
                        quantity: orderItem.quantity,
                        productId: orderItem.productId,
                        selectedSize: orderItem.selectedSize,
                        isPaid: false
                    }))
                }
            }
        });

        return res.status(200).json({ success: true, message: "Order created correctly", data: order });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
const payOrder = async (orderId) => {
    try {
        console.info(`Updating order ID: ${orderId} to set isPaid to true`);
        const order = await prisma.order.update({
            where: { id: parseInt(orderId, 10) },
            data: { isPaid: true },
            include: { orderItems: true }
        });
        console.info(`Order ID: ${orderId} updated successfully`);
        return order;
    } catch (error) {
        console.error(`Error updating order ID: ${orderId}`, error);
        return null;
    }
};

export const confirmation = async (req, res) => {
    try {
        const { x_response, x_id_factura } = req.query;

        console.info(`Received confirmation request with response: ${x_response}, invoice ID: ${x_id_factura}`);

        if (!x_response || !x_id_factura) {
            console.warn('Request accepted without query parameters');
            return res.status(200).json('Request accepted without query parameters');
        }

        if (x_response.toLowerCase() !== 'aceptada') {
            console.warn('Request accepted but transaction denied');
            return res.status(200).json('Request accepted but denied transaction');
        }

        const order = await payOrder(x_id_factura);

        if (!order) {
            console.warn('Request accepted and transaction approved, but order not found in DB');
            return res.status(200).json('Request accepted and transaction approved, but order not found in DB');
        }

        console.log('Request accepted and transaction approved');
        return res.status(200).json('Request accepted and transaction approved');
    } catch (error) {
        console.error('Error processing confirmation request:', error);
        return res.status(500).json({ success: false, message: error.message });
    }
};
