import prisma from "../utils/prismaClient.js";

export const findAll = async (req, res  ) => {

    try {
        const users = await prisma.user.findMany()
        return res.status(200).json({success: true, message: "users", data: users})
    } catch (error) {
        return res.status(500).json({success: false, message: error})
    }
}

export const create = async(req, res ) => {
    try {
        const {name, email, phone} = req.body
        
        const user  = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                
            }
        })
        return res.status(200).json({success: true, message: "user created correct", data: user})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}
export const update = async (req, res) => {
    try {
        const { name, phone, email } = req.body
        const {userId} = req.params
        const id = parseInt(userId, 10)
        const user = await prisma.user.update({
            where:{
                id:id,
                email:email
            },
            data:{
                name,
                phone
            }
        })

        return res.status(200).json({success: true, message:"User update", data: user})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}
