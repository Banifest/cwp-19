const Joi = require('joi');

const schemas = {
    '/signin': Joi.object().keys({
                                     login: Joi.string(),
                                     password: Joi.string(),
                                 }),

    '/signup': Joi.object().keys({
        login: Joi.string(),
        password: Joi.string().min(10),
        email: Joi.string().email().optional(),
        invitedBy: Joi.string().optional(),
        birth: Joi.date().max(`${new Date().getMonth() + 1}-${new Date().getDate()}-${new Date().getFullYear() - 21}`),
        sex: Joi.string().regex(/(male|female)$/),
        agreedWithTerms: Joi.boolean().valid(true)
                                 }),

    '/drinks': Joi.object().keys({
                                     name: Joi.string().min(3).max(50),
                                     strength: Joi.number().positive().precision(2),
                                     code: Joi.string().regex(/[A-Za-z0-9]*/),
                                     alcoholic: Joi.boolean().valid(true)
                                 }),

    '/recipes': Joi.object().keys({
                                     name: Joi.string(),
                                     ingredients: Joi.array().min(2).items(Joi.object().keys
                                     ({
                                          name: Joi.string(),
                                          weight: Joi.number().integer().positive(),
                                          photos: Joi.array().items(Joi.string()).optional()
                                     })),
                                      photos: Joi.array().items(Joi.string()).optional(),
                                      portions: Joi.alternatives().try(Joi.string(), Joi.number().positive())
                                 }),
};

exports.check = function (schema, body)
{
    if (!schemas[schema])  return {};
    return Joi.validate(body, schemas[schema], { presence: 'required' });
};

