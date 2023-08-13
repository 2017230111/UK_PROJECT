import * as UserRepository from "../repository/user-repository.js";
import bcrypt from "bcrypt";
import { successResponse, errorResponse } from "../utils/response.js";
import jwt from "jsonwebtoken";

const SECRET_AT = "kelas.com";
const SECRET_RT = "Akbar";

export const getAlluser = async (req, res, next) => {
  try {
    const [result] = await UserRepository.getAlluser();

    successResponse(res, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = await bcrypt.hash(req.body.password, 10);
    const result = await UserRepository.createUser(name, email, password);

    successResponse(res, "Data berhasil ditambahkan", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;

    const [result] = await UserRepository.getUserById(id);

    if (result.length > 0) {
      successResponse(res, "ok", result[0]);
    } else {
      errorResponse(res, "Data tidak ditemukan");
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const email = req.body.email;

    const [checkUser] = await UserRepository.getUserById(id);

    if (checkUser.length > 0) {
      await UserRepository.updateUser(name, email, id);
      res.json({
        code: 200,
        message: "Data berhasil diubah",
      });
    } else {
      errorResponse(res, "Data tidak ditemukan");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const [checkUser] = await UserRepository.getUserById(id);

    if (checkUser.length > 0) {
      await UserRepository.deleteUser(id);
      res.json({
        code: 200,
        message: "Data berhasil dihapus",
      });
    } else {
      errorResponse(res, "Data tidak ditemukan");
    }
  } catch (error) {
    next(error);
  }
};

export const authUser = async (request, response, next) => {
  try {
    let email = request.body.email;
    let pass = request.body.password;
    const [result] = await UserRepository.getDataByEmail(email);
    const user = result[0];

    if (result.length > 0) {
      bcrypt.compare(pass, user.password, (err, result) => {
        if (result) {
          let claims = {
            id: user.user_id,
            email: user.email,
            name: user.name,
            created_at: user.created_at,
            updated_at: user.updated_at,
          };
          const accessToken = jwt.sign(claims, SECRET_AT, { expiresIn: "15m" });
          const refreshToken = jwt.sign(claims, SECRET_RT, {
            expiresIn: "30m",
          });
          let respData = {
            access_token: accessToken,
            refresh_token: refreshToken,
            data: claims,
          };
          successResponse(response, "Ok", respData);
        } else {
          errorResponse(response, "email atau password salah!", 400);
        }
      });
    } else {
      errorResponse(response, "email atau password salah!", 400);
    }
  } catch (error) {
    next(error);
  }
};
