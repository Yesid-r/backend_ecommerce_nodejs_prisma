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

export const update = async (req, res) => {
    try {
        const { name } = req.body
        const {categoryId} = req.params
        const id = parseInt(categoryId, 10)
        const category = await prisma.category.update({
            where:{
                id:id
            },
            data:{
                name
            }
        })

        return res.status(200).json({success: true, message:"Category update", data: category})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

export const find_delete = async(req, res) =>{
    try {
        const {categoryId} = req.params
        const id = parseInt(categoryId, 10)
        
        await prisma.product.deleteMany({
            where: {
                categoryId: id
            }
        });
        await prisma.subCategory.deleteMany({
            where: {
                categoryId: id
            }
        });
        const category = await prisma.category.delete({
            where:{
                id: id
            }
        })
        return res.status(200).json({success:true, message: "category and products was deleted", data: category})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
} 

