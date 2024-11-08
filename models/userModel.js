const mongoose=require('mongoose')


const userSchema=new mongoose.Schema(
    {
        Username:{
            type:String,
            required:true
        },
        Password:{
            type:String,
            required:true
        },
        Email:{
            type:String,
            required:true,
            unique:true
        },
        github:
        {
            type:String
        },
        linkedin:
        {
            type:String
        },
        profilePic:{
            type:String
        }
    }
)

const users=mongoose.model("users",userSchema)

module.exports=users