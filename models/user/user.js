const { Schema, model } = require('mongoose');
const Joi = require('joi');

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },


});

const userJoiSchema=Joi.object({
    password:Joi.string().min(8).max(12).required(),
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
      }).required(),
      subscription:Joi.string(),
      token:Joi.string()  
});

const User=model('user',userSchema);

module.exports={
    userSchema,userJoiSchema,User
}