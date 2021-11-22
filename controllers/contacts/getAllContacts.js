const { Contact } = require('../../models')
const { NotFound } = require('http-errors')

const getAllContacts = async (req, res, next) => {
  try {
    const{page=1,limit,favorite}=req.query;  
    const {_id}=req.user;
    let pagination=false
    if(limit){
      pagination=true
    }
    if(favorite){
      const {docs} = await Contact.paginate({owner:_id, favorite},{page:+page,limit:+limit,pagination})
    }else{
    await Contact.paginate({owner:_id},{page:+page,limit:+limit,pagination})
     return docs
    }    
    if (docs.length===0) {
      throw new NotFound()
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        docs
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
