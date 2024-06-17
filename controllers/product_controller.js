import { Prisma } from "@prisma/client"
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

export const findByCategory = async (req, res) => {
    try {
        const {category} = req.params
        const categoryFound = await prisma.category.findFirst({
            where:{
                name: {
                    equals: category.toLowerCase(),
                    mode: 'insensitive'
                }
            },include:{
                products:{
                    include:{
                        sizes:true,
                        colors:true,
                        category:true,
                        subCategory:true
                    }
                }
            }

        })
        if (!categoryFound) {
            return res.status(404).json({ success: false, message: "Category not found" });
        }

        return res.status(200).json({ success: true, message: "products", data: categoryFound.products });

    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const findBySubCategory = async (req, res) => {
    try {
        const {subcategory} = req.params
        const subCategory = await prisma.subCategory.findFirst({
            where: {
                name: {
                    equals: subcategory.toLowerCase(),
                    mode: 'insensitive'
                }
            }, include:{
                products:{
                    include: {
                        sizes:true,
                        colors:true,
                        category:true,
                        subCategory:true

                    }
                }
            }
        })

        if(!subCategory){
            return res.status(404).json({success: false, message: "sub category not found"} )
        }
        else {
            return res.status(200).json({success: true, message: "products", data: subCategory.products})
            
        }
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async (req, res) => {
    try {
        const { name, description, sizes, colors, categoryId, subCategoryId, price, images } = req.body
        const categoryIdInt = parseInt(categoryId, 10)
        const subCategoryIdInt = parseInt(subCategoryId, 10)

        const product = await prisma.product.create({
            data: {
                name,
                description,
                categoryId: categoryIdInt,
                subCategoryId: subCategoryIdInt,
                sizes: {
                    create: sizes.map(size => ({
                        name: size.name,
                        quantity: parseInt(size.quantity)
                    }))
                },
                colors: {
                    create: colors.map(color => ({
                        name: color.name,
                        value: color.value
                    }))
                },
                price,
                images


            }
        });

        return res.status(200).json({ success: true, message: "product created succesfully", data: product })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const update = async (req, res) => {
    try {
        const { name, description, categoryId, subCategoryId, price, images } = req.body
        const { productId } = req.params
        const id = parseInt(productId, 10)
        const priceDecimal = new Prisma.Decimal(price)
        const product = await prisma.product.update({
            where: {
                id: id
            },
            data: {
                name,
                description,
                categoryId: parseInt(categoryId,10),
                subCategoryId: parseInt(subCategoryId, 10),
                price: priceDecimal,
                images
            }
        })

        return res.status(200).json({ success: true, message: "Product update", data: product })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

export const delete_product = async (req, res) => {
    try {
        const { productId } = req.params;
        const id = parseInt(productId, 10);

        
        const product = await prisma.product.delete({
            where: {
                id: id
            }
        });

        return res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const find_product = async (req, res) => {
    try {
        const {productId} = req.params
        const id = parseInt(productId, 10);
        const product = await prisma.product.findFirst({
            where:{
                id
            },
            include:{
                category:true,
                subCategory:true,
                sizes:true


            }
        })

        return res.status(200).json({success: true, message: 'product find', data: product})

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}