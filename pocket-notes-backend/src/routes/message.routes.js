import { Router } from "express";
import { fetchAllMessage, sendMessageToGroup } from "../controllers/message.controller.js";

const router = Router();

router.route("/send").post(sendMessageToGroup);
router.route("/").post(fetchAllMessage);

export default router;