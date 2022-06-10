import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.js";

const router = express.Router();

//CREATE
router.post("/" , createProduct);

//GET ALL
router.get("/" , getProducts)

//UPDATE
router.put("/:id" , updateProduct);

//DELETE
router.delete("/:id" , deleteProduct);

export default router;