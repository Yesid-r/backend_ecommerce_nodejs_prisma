import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaClient.js";


export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        
        const useremail = await prisma.user.findUnique({
            where: { email: req.body.email },
        });

        console.log(`useremail: ${useremail}`);
        
        if (useremail) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }
        
        const newUser = await prisma.user.create({
            data: {
                name: req.body.name || null,
                email: req.body.email,
                password: hashedPassword,
                phone: req.body.phone,
            },
        });

        res.status(200).json({ success: true, message: "User registered successfully", data:newUser });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const userfind = await prisma.user.findUnique({
            where: { email },
        });

        if (!userfind) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, userfind.password);
        if (isMatch) {
            const { password, ...rest } = userfind;
            const token = jwt.sign({ id: userfind.id, email:userfind.email }, process.env.JWT_SECRET_KEY, {
                expiresIn: "1d",
            });
            return res.status(200).json({ token, success: true, message: "Successfully logged in", data: { ...rest } });
        } else {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
