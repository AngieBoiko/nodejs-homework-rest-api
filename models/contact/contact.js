const {Schema,model}=require('mongoose')
const Joi=require('Joi')

const contactJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(6).max(15).required(),
})

const contactSchema=Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  })

const Contact=model('contact',contactSchema);

module.exports={Contact, contactSchema,contactJoiSchema}