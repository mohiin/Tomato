

const authMiddleware = async (req, res, next) => {
    if (req.session.user){
        return next();
    }else{
        return res.status(401).json({success: false, message: "Unauthorized" });
    }
}

export default authMiddleware;