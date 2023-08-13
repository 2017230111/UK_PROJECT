import express from "express";
import userRouter from "./route/user-route.js";
import productRouter from "./route/product-route.js";

const app = express();

const PORT = 8080;
app.listen(PORT, () => {
  console.log("Server running on port 8080");
});

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", productRouter);
