const { BadRequest } = require('http-errors')
const { contactJoiSchema } = require('../../models');


const validation = (contactJoiSchema) => {
  const validationMiddleware = async (req, _, next) => {
    try {
      const { error } = await contactJoiSchema.validate(req.body);
      if (error) {
        throw new BadRequest('missing required field')
      }
      next()
    } catch (error) {
      next(error)
    }
  

  }
  return validationMiddleware;
}

module.exports = validation;