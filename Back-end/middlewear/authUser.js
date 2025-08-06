// authentication.js (Backend)
import jwt from "jsonwebtoken";

// Middleware for authenticating User
const authUser = async (req, res, next) => {
    try {
        // Check for the token in the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized, No Token" });
        }

        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1];

        // Decode and verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Add the user ID to the request body
        req.body.userId = decoded._id;

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

export default authUser;