import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const sub_categories = await prisma.subCategory.findMany()
        return res.status(200).json({success: true, message: "sub_categories", data: sub_categories})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {name, categoryId} = req.body
        
        const sub_category  = await prisma.subCategory.create({
            data: {
                name,
                categoryId
            }
        })
        return res.status(200).json({success: true, message: "sub category created correct", data: sub_category})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

