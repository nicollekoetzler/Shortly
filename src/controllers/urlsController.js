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

export async function getShortUrl (req, res) {

    const shortUrl = req.params.shortUrl;

    try{
        const shortUrlData = await db.query(
            `SELECT * FROM urls WHERE "shortUrl" = $1`,
            [shortUrl]
        )
        console.log(shortUrlData.rows)
        
        if(shortUrlData.rows.length === 0){
            return res.status(404).send("Url não encontrada")
        }
        console.log("oaps")
        
        const urlVisitCount = shortUrlData.rows[0].visitCount + 1;

        await db.query(
            `UPDATE urls SET "visitCount" = $1 WHERE "shortUrl" = $2`, 
            [urlVisitCount, shortUrl]
        )

        res.redirect(shortUrlData.rows[0].url);

    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}

export async function deleteUrl (req, res) {

    const id = req.params.id;

    try{
        const userId = res.locals.userId;

        const urlData = await db.query(
            `SELECT * FROM urls WHERE "id" = $1`, 
            [id]
        )

        if(urlData.rows.length === 0){
            return res.status(404).send("Url não encontrada");
        }

        if(urlData.rows[0].userId !== userId){
            return res.sendStatus(401)
        }

        await db.query(
            `DELETE FROM urls WHERE id = $1`,
            [id]
        )

        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500)
    }
}

export async function getRanking(req, res) {
    try {
      const usersRanking = await db.query(
        `SELECT users.id,
            users.name,
            COUNT(urls."userId") AS "linksCount",
            COALESCE(SUM(urls."visitCount"), 0) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls."userId"
        GROUP BY users.id
        ORDER BY "visitCount" DESC
        LIMIT 10;`
    );
      return res.status(200).send(usersRanking.rows);
  
    } catch (err) {
        console.log(err)
      return res.status(500).send(err);
    }
  } 