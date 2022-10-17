import bcrypt from 'bcrypt';
import db from '../databases/database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export async function signUp(req, res){
    
    try{
        const { name, email, password } = req.body;

        // caso exista algum usuário cadastrado com o e-mail enviado no corpo da requisição
        const { rows: isEmailRegistered } = await db.query(
            `SELECT * FROM users WHERE email = $1`,
            [email]
        )
        console.log("aoba")
        if(isEmailRegistered.length > 0){
            return res.sendStatus(409);
        }

        // cria usuário
        const cryptedPassword = bcrypt.hashSync(password, 10);

        await db.query(
            `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`, 
            [name, email, cryptedPassword]
        )   
        
        res.sendStatus(201);

    }catch(err){
        console.log(err)
        return res.status(400).send(err);
    }
}

export async function signIn(req, res){
    
    const { email, password } = req.body;

    const { rows: user } = await db.query(
        `SELECT * FROM USERS WHERE email = $1`, 
        [email]
    )

    if(user.length === 0){
        return res.sendStatus(401); // usuário não existe - não autorizado
    }

    // valida senha
    const isValidPassword = bcrypt.compareSync(password, user[0].password);
    if(!isValidPassword) return res.sendStatus(401);

    const config = {expiresIn:60*60}
    const token = jwt.sign({userId:user[0].id}, process.env.PRIVATE_KEY_JWT, config);
    
    res.send({token}).status(200);
}