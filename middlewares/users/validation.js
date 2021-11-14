const {BadRequest}=require('http-errors')

const validation=(userJoiSchema)=>{
    const validationMiddleware= async (req,_,next)=>{
    try{
        const{error}= await userJoiSchema.validate(req.body);
        if(error){
            throw new BadRequest('Mistake of Joi or another library of validation')
        }
        next()
    }catch(error){
        next(error)
    }
   
}
return validationMiddleware;
}

module.exports= validation;