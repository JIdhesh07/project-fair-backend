 const projects = require("../models/projectSchema")
  exports.addUserproject = async (req,res)=>{
    console.log("inside adduserproject");
  


  //get userid
   const userId = req.payload

   // get projectimage
   const projectImage = req.file.filename

   //get project details

   const{title,language,github,link,overview}=req.body

   console.log(userId,title,language,github,link,overview,projectImage);

   //logic for adding project details
//    res.status(200).json("add user project request received")
   try{
    // if github is present in mongodb
    const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(402).json("Project already exists")
    }else{
        // if github is not present in the mongodb then create new project details and save them in mongodb
        const newProject = new projects({
            title,language,github,link,overview,projectImage,userId
        })
        await newProject.save() // save new project in mongodb
        res.status(200).json(newProject)  // response send to client
    }

}
catch(err){
    res.status(404).json({message:err.message})
}

  }


  //get all user-project

  exports.getalluserprojects = async (req,res)=>{

    //get userid
    const userId = req.payload;
    //get all project off paticlular user
    try{
        //api call
        const Userproject = await projects.find({userId})
        res.status(200).json(Userproject)
    }
    catch(err){

        res.status(401).json("internal server Error"+err.message)
    }
  }
  //get all project
   exports.getallprojects = async (req,res)=>{


    const searchkey = req.query.search

    const query = {

        language:{ $regex:searchkey,
                   $options:"i"


        
        }
    }
    try{
        const allproject = await projects.find(query)
        res.status(200).json(allproject)
    }
    catch(err){

        res.status(401).json("internal server Error"+err.message)
    }


   }

   //get home project 

   exports.gethomeproject = async(req,res)=>{
    try{
        const homeproject = await projects.find().limit(3)
        res.status(200).json(homeproject)
    }
    catch(err){

        res.status(401).json("internal server Error"+err.message)
    }

   }

   //update project details

   exports.updateproject = async(req,res)=>{

    const{title,language,github,link,overview,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
    userId= req.payload
    const {pid}=req.params
    try{
        //find the particular project and update the  project details save to mongodb
const updateproject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,link,overview,projectImage:uploadImage,userId})
await updateproject.save()
res.status(200).json(updateproject)
    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message)
    }
   }

exports.deleteproject = async(req,res)=>{

const {pid} = req.params

try{

const deleteuserproject = await projects.findOneAndDelete({_id:pid})
res.status(200).json(deleteuserproject)

}
catch(err){

    res.status(401).json("internal error"+ err.message)
}


   }