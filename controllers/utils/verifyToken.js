import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    // Verificamos si el encabezado de autorización existe y tiene un formato válido.
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  
    // Extraemos el token de autorización excluyendo la palabra "Bearer ".
    const token = authHeader.split(" ")[1];
    
  
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({ success: false, message: "token is invalid" });
        }
        req.user = user;
        next();
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };

export const verifyUser = (req, res, next) => {
    
    verifyToken(req, res, () => {
        console.log(req.user)
        console.log( ` params ${req.params.userId}`)
        if (req.user.id == req.body.userId || req.user.isAdmin) {       
            next();
        } else {
            res.status(403).json({ success: false, message: "Forbidden" });
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id == req.params.userId && req.user.email == 'admin@gmail.com')
        {
            next()
        }else{
            res.status(403).json({ success: false, message: "Forbidden" });
        }
    } )
}