import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateUrl } from "../middlewares/validateUrl.js";
import { postUrl, getUrlId, getShortUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrl, postUrl);
router.get("/urls/:id", getUrlId);
router.get("/urls/open/:shortUrl", getShortUrl);
// router.delete("/urls/:id", );

export default router;