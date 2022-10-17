validateSignUp, signUp

import signupSchema from "../schemas/signupSchema.js";

function validateSignUp(req, res, next){

    const user = req.body;   

    const {error} = signupSchema.validate(user, {abortEarly:false });
    if(error){
        const erros = error.details.map(erro=> erro.message)
        return res.status(422).send(erros)
    }

    next()
}

export default validateSignUp;

export async function validateSignUp(req, res, next){

    const validation = signUpSchema.validate(req.body, {abortEarly: false});

    if (validation.error){
        console.log(validation.error.details);
        res.sendStatus(422);
        return;
    }
    next();
}