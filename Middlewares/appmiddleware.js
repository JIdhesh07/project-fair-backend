

const appMiddleware = (req,res,next)=>{
    console.log("inside the aplication middleware");
    next()
}
module.exports=appMiddleware