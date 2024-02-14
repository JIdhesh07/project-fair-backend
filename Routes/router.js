const express = require('express')

const userController = require('../Controllers/userController')
 
const projectController = require('../Controllers/projectController')

const jwtmiddleware = require("../Middlewares/jwtMiddleware")

const multerConfig = require('../Middlewares/multerMiddleware')


//create router  object of express to define path

const router=new express.Router()

//USING router object to define path


// Resgiter API path  http//localhost:4000/register  ->frontend

router.post('/register',userController.resgister)



//login api path

router.post('/login',userController.login)

//add user project  api
router.post('/project/add',jwtmiddleware,multerConfig.single('projectImage'),projectController.addUserproject)


//get all user project path -
router.get('/project/all-user-projects',jwtmiddleware,projectController.getalluserprojects)

//get all project path
router.get('/project/all-project',jwtmiddleware,projectController.getallprojects)

//get home project
router.get('/project/home-project',projectController.gethomeproject)

// update project - http://localhost:4000/project/update-project/59787809809
router.put('/project/update-project/:pid',jwtmiddleware,multerConfig.single('projectImage'),projectController.updateproject)


//delete

router.delete('/project/delete-project/:pid',jwtmiddleware,projectController.deleteproject)

module.exports =router
