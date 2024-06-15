const Joi = require('joi');

const userSchema = Joi.object({
    customer_email:Joi.string().email().required(),
    password:Joi.string().alphanum().required()
}); 

const validateUserLoginSchema =(req, res, next) => {
    const { error, value } = userSchema.validate(req.body);
    //console.log(value);
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }

    req.validatedData = value;
    next();
}

module.exports=validateUserLoginSchema