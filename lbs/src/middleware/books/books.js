import joi from "joi";
import { StatusCodes } from "http-status-pro-js";

export function book(req,res,next){
    try{
        let schema=joi.object({
            title:joi.string().trim().lowercase().min(3).max(200).required(),
            author:joi.string().trim().lowercase().min(6).max(200).required(),
            price:joi.string().trim().lowercase().min(2).max(15).required()
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
        console.log("book mid",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.code,
            data:null
        })
        return;
    }
}

export function bookupdate(req,res,next){
    try{
        let schema=joi.object({
            book_id:joi.number(),
            price:joi.string().trim().lowercase().min(3).max(200).required()
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
        console.log("book mid",error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR.code).json({
            code:StatusCodes.INTERNAL_SERVER_ERROR.code,
            message:StatusCodes.INTERNAL_SERVER_ERROR.code,
            data:null
        })
        return;
    }
}
