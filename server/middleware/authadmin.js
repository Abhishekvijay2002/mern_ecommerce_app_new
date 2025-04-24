const jwt = require('jsonwebtoken');

const authAdmin = (req ,res ,next) => {
    try {
        const {admin_token} = req.cookies;
        if(!admin_token){
            return res.status(401).json({msg : "jwt not founded" });
        }
        const verifyToken = jwt.verify(admin_token , process.env.JWT_SECRET);
        console.log(verifyToken.role);

        if(!verifyToken) {
            return res.status(401).json({msg : "admin is not verified" });
        }
        if(verifyToken.role !== "admin"){
            return res.status(401).json({msg : "admin is not verified" });
        }
        req.admin = verifyToken.id;
        next()
    } catch (error) {
        res.status(error.status || 500 ).json({ message: error.message });
    }
}

module.exports = authAdmin;