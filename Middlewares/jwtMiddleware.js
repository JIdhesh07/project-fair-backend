//route -level -middleawre

const jwt = require('jsonwebtoken')

const jwtmiddleware = (req,res,next)=>{

    console.log("inside jwt middleware - Route-level-middleware");

    //get the token from user request
    const token = req.headers['authorization']?.slice(7)
    console.log(token);
    try{

        //token varification

        const tokenverification = jwt.verify(token,'superkey2024')
        console.log(tokenverification);
        req.payload= tokenverification.userId
        next()
    }
    catch(err){
        res.status(401).json("Authorization failed ... please login again....")
    }
     

}

module.exports =jwtmiddleware