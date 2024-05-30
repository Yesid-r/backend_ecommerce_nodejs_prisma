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
export const update = async (req, res) => {
    try {
        const { name } = req.body
        const {subCategoryId} = req.params
        const id = parseInt(subCategoryId, 10)
        const sub_category = await prisma.subCategory.update({
            where:{
                id:id
            },
            data:{
                name
            }
        })

        return res.status(200).json({success: true, message:"Subcategory update", data: sub_category})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

