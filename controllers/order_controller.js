import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const orders = await prisma.order.findMany({
            include:{
                user: true,
                orderItems: true
            }
        })
        return res.status(200).json({success: true, message: "orders", data: orders})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {userId, orderItems} = req.body
        
        const order  = await prisma.order.create({
            data: {
                userId,
                orderItems:{
                    create: orderItems.map(orderItem =>({
                        quantity: orderItem.quantity,
                        productId: orderItem.productId,

                    }))
                }
            }
        })
        return res.status(200).json({success: true, message: "order created correct", data: order})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

