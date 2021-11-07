const {Contact}=require('../../models')
const {NotFound}=require('http-errors')

const getAllContacts=async (req, res, next) => {
    try {
     const result= await Contact.find({})
     if(!result){
       throw new NotFound()
     }
     res.json({
       status:"success",
       code:200,
       data:{
         result
       }
     })
    } catch (error) {
      next(error)
    }
  }

  module.exports=getAllContacts