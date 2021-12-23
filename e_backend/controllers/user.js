const User = require('../model/user')


exports.userById = (req,res,next,id_val)=>{

    User.findOne({'_id':id_val},(err,user)=>{ 
        if(err || !user){    
            return res.status(400).json(
                {error : 'User not found !'}
                )
            }
        req.profile = user
        next();
    })
    
} 

exports.handleGet=(req,res)=>{
    // console.log(req.profile)
    res.status(200).json({ 
       data :  req.profile
    })
}

exports.read = (req,res)=>{
    req.profile.hashed_password = undefined
    req.profile.salt = undefined 
    res.json({
        user : req.profile
    })
}

exports.updateUser = (req,res)=>{
    
    User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>{
        if(err){
            return res.status(400).json({ 
                error : err
            })
        }
        res.json({ 
            updateUser: user
        })
    })

}
