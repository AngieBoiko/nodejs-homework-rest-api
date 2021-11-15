const express=require('express');
const router=express.Router();
const {userJoiSchema}=require('../../models')
const {validation}=require('../../middlewares/users')
const controllers=require('../../controllers/users')

router.post("/signup", validation(userJoiSchema), controllers.signup);
router.post('/login',validation(userJoiSchema),controllers.login)


module.exports=router;