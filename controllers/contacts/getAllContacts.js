const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const getAllContacts = async (req, res, next) => {
  try {
    const{page=1,limit,favorite}=req.query;  
    const {_id}=req.user;
    let pagination=false
    let result=[];
    if(limit){
      pagination=true
    }
    if(favorite==="true"){
      const {docs} = await Contact.paginate({owner:_id, favorite:true},{page:+page,limit:+limit,pagination})
      result=docs
    }else{
      const {docs} = await Contact.paginate({owner:_id},{page:+page,limit:+limit,pagination})
      result=docs
    }    
    if (result.length===0) {
      throw new NotFound()
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: result
      
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
