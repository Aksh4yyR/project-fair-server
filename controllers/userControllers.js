const users=require('../models/userModel')
const jwt=require('jsonwebtoken')
// register

exports.registerController=async(req,res)=>{
    console.log("Inside Register Controller");
    console.log(req.body);
    const {Username,Email,Password}=req.body;
    try{
        const existingUser=await users.findOne({Email})
        if(existingUser)
        {
            res.status(406).json("ALready existing user....Please Login!!!")
        }
        else
        {
            const newUser=new users({
                Username,Email,Password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }
    catch(err)
    {
    res.status(401).json(err) 
    }
}

// login
exports.loginController=async(req,res)=>
{
    console.log("iNSIDE LOGIN CONTROLLER");
    const{Email,Password}=req.body
    console.log(Email,Password);
    try{
        const existingUser=await users.findOne({Email,Password})
        if(existingUser)
        {
            const token=jwt.sign({userId:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user:existingUser,token})
        }
        else{
            res.status(401).json("Invalid Email or Password")
        }
    }
    catch(err){
        res.status(401).json(err)
        
    }
    
    
}


// profile updation
exports.editUserController=async(req,res)=>
{
    console.log("Inside editUserController");
    const {Username,Password,Email,github,linkedin,profilePic}=req.body
    const {uploadProfilePic}=req.file?req.file.filename:profilePic
    const userId=req.userId

    try{
        const updatedUser=await users.findByIdAndUpdate({_id:userId},{
            Username,Password,Email,github,linkedin,profilePic:uploadProfilePic
        },{new:true})
        await updatedUser.save()
        res.status(200).json(updatedUser)

    }
    catch(err)
    {
        res.status(401).json(err)
    }
    
}