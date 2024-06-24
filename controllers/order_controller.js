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
export const findByIdUser = async(req, res) => {
    try {
        const {userId} = req.params
        const orders = await prisma.order.findMany({
            where:{
                userId: parseInt(userId, 10)
            },
            include:{
                orderItems:{
                    include: {
                        product: true
                    }
                }
            }
        })
        return res.status(200).json({success:true, message:"Orders by user", data: orders})
    } catch (error) {
        return res.status(500).json({success:false, message:error})
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

        if (item.selectedSize != 'default') {
            const size = product.sizes.find(size => size.name === item.selectedSize);
            if (size && size.quantity >= item.quantity) {
                return true;
            } else {
                return false;
            }
        } else {
            
            
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

