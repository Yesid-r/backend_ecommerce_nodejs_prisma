import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const categories = await prisma.category.findMany()
        return res.status(200).json({success: true, message: "categories", data: categories})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {name} = req.body
        
        const category  = await prisma.category.create({
            data: {
                name
            }
        })
        return res.status(200).json({success: true, message: "category created correct", data: category})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

