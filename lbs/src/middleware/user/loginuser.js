import joi from "joi";
import { StatusCodes } from "http-status-pro-js";

function memberlogin(req,res,next){
    try{
        let schema=joi.object({
            email:joi.string().trim().lowercase().min(6).max(200).required(),
            password:joi.string().trim().min(4).max(8).required()
        })
        let {error,value}=schema.validate(req.body)
        if(error){
            res.status(StatusCodes.BAD_REQUEST.code).json({
                code:StatusCodes.BAD_REQUEST.code,
                message:error,
                data:null
            })
            return;
        }
        req.body=value;
        next()
    }
    catch(error){
        console.log("member mid",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.code,
            data:null
        })
        return;
    }
}
export default memberlogin;