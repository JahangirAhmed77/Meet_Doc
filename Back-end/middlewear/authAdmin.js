// authentication.js (Backend)
import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized, No Token" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized, No Token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ success: false, message: "Not Authorized, Invalid Admin" });
        }

        req.admin = decoded; // Add decoded payload to the request

        next();
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ success: false, message: "Token Expired" });
        } else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ success: false, message: "Invalid Token" });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default authAdmin;