import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const sizes = await prisma.size.findMany()
        return res.status(200).json({success: true, message: "sizes", data: sizes})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {name, quantity} = req.body
        
        const size  = await prisma.size.create({
            data: {
                name,
                quantity
            }
        })
        return res.status(200).json({success: true, message: "size created correct", data: size})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

