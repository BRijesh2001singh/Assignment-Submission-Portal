import jwt from "jsonwebtoken";
//Verification of token passed in Headers
export const tokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];   //setting up headers to pass on Token for verification
    const token = authHeader;
    if (token == null) return res.status(401).json({ error: "Token not set." });   //if token is not provided
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token not valid." });   //verifying token 
        req.user = user;    // passing the decoded token as request parameter
        next();
    });
}