import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import { validateUrl } from "../middlewares/validateUrl.js";
import { postUrl } from "../controllers/urlsController.js";

const router = Router();

router.post("/urls/shorten", validateToken, validateUrl, postUrl);
// router.get("/urls/:id", );
// router.get("/urls/open/:shortUrl", );
// router.delete("/urls/:id", );

export default router;