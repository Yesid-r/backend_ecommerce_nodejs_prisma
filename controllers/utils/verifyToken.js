export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(403).json({ success: false, message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Failed to authenticate token" });
        }
        
        req.userId = decoded.id;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.userId || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ success: false, message: "Forbidden" });
        }
    });
};