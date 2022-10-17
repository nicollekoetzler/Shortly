import { signInSchema } from "../schemas/userSchema.js";

export async function validateSignIn(req, res, next){

    const isBodyValid = signInSchema.validate(req.body, {abortEarly: false});

    if (isBodyValid.error){
        return res.sendStatus(422);
    }
    
    next();
}
