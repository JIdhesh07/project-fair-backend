// define logic function 
const users =  require("../models/userschema")

const jwt = require('jsonwebtoken')
//register logic function
exports.resgister=async(req,res)=>{
    console.log("inside register function");

    try{
        const{username,email,password}=req.body

        console.log(`${username}${email}${password}`);
        const existinguser = await users. findOne({email})
        if(existinguser){
            res.status(402).json("user already exists")
        }
        else{
            const newuser=new users({
                username,email,password,github:"",link:"",profile:""
            })
            await newuser.save()//data saved in mongodb
            res.status(200).json("user created succesfully")
        }

    }
    catch(err){
                    res.status(500).json("user created succesfully")
    }
   
}

//login
// Login logic function
exports.login = async (req, res) => {
    console.log("Inside login function");
    try {
        const { email, password } = req.body
        console.log(`${email} ${password}`);
        const existingUser = await users.findOne({ email, password })
        if (existingUser) {

            const token = jwt.sign({userId:existingUser._id},"superkey2024")
            console.log(token);
            res.status(200).json({existingUser,token})
        }
        else {
            res.status(402).json("User does not exist")
        }
    }
    catch (err) {
        res.status(500).json("server error")
    }
}