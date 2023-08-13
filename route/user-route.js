import * as UserService from "../service/user-service.js";
import express from "express";

const userRouter = express.Router();

userRouter.get("/users", UserService.getAlluser);
userRouter.post("/users", UserService.createUser);
userRouter.get("/users/:id", UserService.getUserById);
userRouter.delete("/users/:id", UserService.deleteUser);
userRouter.put("/users/:id", UserService.updateUser);
userRouter.post("/users/login", UserService.authUser);

export default userRouter;
