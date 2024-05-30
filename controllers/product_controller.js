import prisma from "../utils/prismaClient.js"

export const findAll = async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                sizes: true,
                colors: true,
                category: true,
                subCategory: true
            }
        })
        return res.status(200).json({ success: true, message: "products", data: products })
    } catch (error) {
        return res.status(500).json({ success: false, message: error })
    }
}

export const create = async (req, res) => {
    try {
        const { name, description, sizes, colors, categoryId, subCategoryId } = req.body

        const product = await prisma.product.create({
            data: {
                name,
                description,
                categoryId,
                subCategoryId,
                sizes: {
                    create: sizes.map(size => ({
                        name: size.name,
                        quantity: size.quantity
                    }))
                },
                colors: {
                    create: colors.map(color => ({
                        name: color.name,
                        value: color.value
                    }))
                }
            }
        });

        return res.status(200).json({ success: true, message: "product created succesfully", data: product })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { name, description, categoryId, subCategoryId } = req.body
        const {productId} = req.params
        const id = parseInt(productId, 10)
        const product = await prisma.product.update({
            where:{
                id:id
            },
            data:{
                name,
                description,
                categoryId,
                subCategoryId,
            }
        })

        return res.status(200).json({success: true, message:"Product update", data: product})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}