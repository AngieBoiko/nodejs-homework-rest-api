const { NotFound } = require("http-errors");
const { Contact } = require("../../models")


const updateContact = async (req, res, next) => {
    try {
        const{contactId}=req.params;
        const result=await Contact.findByIdAndUpdate(contactId,req.body)
        if(result===null){
            throw new NotFound()
        }
        res.status(200).json({
            status:'success',
            data:{
                result
            }
        })
     } catch (error) { next(error) }
}

module.exports = updateContact
