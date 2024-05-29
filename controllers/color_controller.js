import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const colors = await prisma.color.findMany()
        return res.status(200).json({success: true, message: "colors", data: colors})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {name, value} = req.body
        console.log(name, value)
        const color  = await prisma.color.create({
            data: {
                name,
                value
            }
        })
        return res.status(200).json({success: true, message: "color created correct", data: color})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

