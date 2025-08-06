// authentication.js (Backend)
import jwt from "jsonwebtoken";


// Middleware for authenticating User
const authDoctor = async (req, res, next) => {
    try {
        // Check for the dtoken in the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Not Authorized, No DToken" });
        }

        // Extract the dtoken from the Authorization header
        const dToken = authHeader.split(" ")[1];

        // Decode and verify the dtoken
        const decoded = jwt.verify(dToken, process.env.JWT_SECRET);

        // Add the user ID to the request body
        req.body.docId = decoded._id;

        next();
    } catch (error) {
        console.error(error);
        if (error instanceof jwt.DTokenExpiredError) {
            return res.status(401).json({ success: false, message: "DToken Expired" });
        } else if (error instanceof jwt.JsonWebDTokenError) {
            return res.status(401).json({ success: false, message: "Invalid DToken" });
        }
        return res.status(500).json({ success: false, message: error.message });
    }
};

export default authDoctor;