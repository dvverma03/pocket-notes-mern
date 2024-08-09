import { Router } from "express";
import { createGroup, fetchAllGroup } from "../controllers/group.controller.js";

const router = Router();

router.route("/").get(fetchAllGroup);
router.route("/create").post(createGroup);

export default router;