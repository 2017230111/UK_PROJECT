import * as ProductService from "../service/product-service.js";
import express from "express";

const productRouter = express.Router();

productRouter.get("/products", ProductService.getAllProduct);
productRouter.post("/products", ProductService.createProduct);
productRouter.get("/products/:id", ProductService.getProductById);
productRouter.put("/products/:id", ProductService.updatedProduct);
productRouter.delete("/products/:id", ProductService.deleteProduct);

export default productRouter;
