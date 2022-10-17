import db from '../databases/database.js';
import { nanoid } from "nanoid";


export async function postUrl (req, res){

    const userId = res.locals.userId
    const { url } = req.body;
    const shortUrl = nanoid();

    try{
        const isUrlExistent = await db.query(
            `SELECT * from urls WHERE url = $1`, 
            [url]
        )
        
        if(isUrlExistent.rows.length !== 0){
            return res.sendStatus(409)
        }

        await db.query(
            `INSERT INTO urls (url, "userId", "shortUrl") VALUES ($1, $2, $3)`,
            [url, userId, shortUrl]
        )

        res.status(201).send({ shortUrl })

    }catch(err){
        res.sendStatus(500);
    }
}

export async function getUrlId (req, res) {

    const id = req.params.id;
  
    try {
        const { rows: urlData } = await db.query(
            `SELECT id, "shortUrl", url FROM urls WHERE id = $1`,
            [id]
        )

        if(urlData.length === 0){
            return res.status(404).send("Url não encontrada")
        }

        res.status(200).send(urlData);
  
    }catch (err) {
      return res.status(500).send(err);
    }
  } 

export async function getShortUrl () {

}