import express from "express";
import productsRoutes  from "./products/productsRoutes";

const router = express.Router();

// products Routes
router.use("/products", productsRoutes);

export default router;