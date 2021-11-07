const Joi=require('Joi')

const contactJoiSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string().min(6).max(15).required(),
  })
  
  module.exports=contactJoiSchema;