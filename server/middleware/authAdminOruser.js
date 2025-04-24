const jwt = require('jsonwebtoken');

const authAdminOruser = (req, res, next) => {
  try {
    const token = req.cookies.seller_token || req.cookies.admin_token || req.cookies.user_token;
    
    if (!token) {
      return res.status(401).json({ msg: "JWT token not found" });
    }
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(401).json({ msg: "Token verification failed" });
    }
    if (verifiedToken.role !== "seller" && verifiedToken.role !== "admin" && verifiedToken.role !== "user") {
      return res.status(403).json({ msg: "Access denied. Not authorized for this action." });
    }
    req.userId = { id: verifiedToken.id, role: verifiedToken.role };
    next();
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || "Internal Server Error" });
  }
};

module.exports = authAdminOruser;
