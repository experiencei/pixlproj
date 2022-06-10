import express from "express";
import { createRobot, deleteRobot, getRobots, updateRobot } from "../controllers/robot.js";



const router = express.Router();

//CREATE
router.post("/" , createRobot);

//GET ALL
router.get("/" , getRobots)

//UPDATE
router.put("/:id" , updateRobot);

//DELETE
router.delete("/:id" , deleteRobot);

export default router;