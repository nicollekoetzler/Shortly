import { signUpSchema } from "../schemas/userSchema.js";

export async function validateSignUp(req, res, next){

    const isBodyValid = signUpSchema.validate(req.body, {abortEarly: false});

    if (isBodyValid.error){
        return res.sendStatus(422);
    }

    next();
}