import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-pro-js";
import dotenv from "dotenv";
dotenv.config()
function auth(res,req){
    try {
        let authotication = req.headers.authorization;
        if(!authotication || !authotication.startswith("Bearer")){
            res.status(StatusCodes.BAD_REQUEST.code).json({
            code:StatusCodes.BAD_REQUEST.code,
            message:StatusCodes.BAD_REQUEST.message,
            data:null
            })
            return ;
        }
        let token = authotication.split (" ")[1];
        let userdata = jwt.verify(token,process.env.TOKEN)
        req.user=userdata.id;
        
    }
    catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.message,
            data:null
        })
    }
}

export default auth;