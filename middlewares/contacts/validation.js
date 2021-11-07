const { contactJoiSchema } = require('../../models');


const validation = (contactJoiSchema) => {
  const validationMiddleware = (req, _,next) => {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest('missing required field')
    }
    next()

  }
  return validationMiddleware;
}

module.exports = validation;