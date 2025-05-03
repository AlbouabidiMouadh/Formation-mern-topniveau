let e=require('express')
let jwt=require('jsonwebtoken')

let Authentication={
    auth:async(req,res,next)=>{
        try {
            //bech ya5ou token mil cookies
            const token=req.cookies?.token
            if(!token){
                return res.status(200).json({
                    message:"please login....!",
                    error:true,
                    success:false
                })
            }
            jwt.verify(token, process?.env?.ACCESS_TOKEN_SECRET,
                function(err,decoded){
                    if(err){
                        console.log('error  auth',err)
                    };
                    req.admin=decoded?._id;
                    next();
                });
        } catch (error) {
            res.status(400).json({
                message: error.message||error,
                error: true,
                success:false
            })
        }
    }
}


module.exports=Authentication