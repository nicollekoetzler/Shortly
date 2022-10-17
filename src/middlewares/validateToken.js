import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

export async function validateToken(req, res, next) {

  const { authorization } = req.headers;

  try {
    const token = authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.PRIVATE_KEY_JWT);

    res.locals.userId = userId;

    next();

  } catch(err) {
    return res.status(401).send(err);
  }
}