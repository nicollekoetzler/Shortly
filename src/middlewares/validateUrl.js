import { urlSchema } from "../schemas/urlSchema";

export async function validateUrl(req, res, next){

    const isBodyValid = urlSchema.validate(req.body, { abortEarly: false});

    if (isBodyValid.error){
        return res.sendStatus(422);
    }
    next();
}