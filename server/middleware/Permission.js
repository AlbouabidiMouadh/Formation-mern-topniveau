let adminModel=require("../models/AdminModel")

let verifyRole={
    PermissionAdmin:async(req,res,next)=>{
        try {
            let admin=await adminModel.findById(req.admin)
            if(!admin)
                return res.status(400).json({msg:"admin resource acces denied."})
            next()
        } catch (error) {
            return res.status(500).json({
                msg: error.message,
            })
        }
    }
}



module.exports=verifyRole