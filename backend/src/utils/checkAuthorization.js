import jsonwebtoken from "jsonwebtoken";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token){
        try {
            const decodedToken = jsonwebtoken
                .verify(token, "aviceSecretKey");

            req.userId = decodedToken._id;
            next();
        }catch (error){
            return res.status(403).json({
                message: "Нет доступа",
            })
        }
    }else{
        return res.status(403).json({
            message: "Нет доступа",
        })
    }
}