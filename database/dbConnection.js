const mongoose=require('mongoose')

const connectionString=process.env.DBCONNECTIONSTRING

mongoose.connect(connectionString).then(res=>{
    console.log("connected to MongoDB tlas with Pfserver");
    
}).catch(err=>
{
    console.log("MongoDB Atlas Connection failed");
    console.log(err);  
}
)