import * as ProductRepository from "../repository/product-repository.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const getAllProduct = async (req, res, next) => {
  try {
    const [result] = await ProductRepository.getAllProduct();
    successResponse(res, "Ok", result);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const type = req.body.type;

    const [result] = await ProductRepository.createProduct(
      name,
      description,
      price,
      quantity,
      category,
      type
    );
    successResponse(res, "Data berhasil ditambahkan", result.insertId);
  } catch (error) {
    next(error);
  }
};

export const updatedProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const category = req.body.category;
    const type = req.body.type;

    const [checkProduct] = await ProductRepository.getProductById(id);

    if (checkProduct.length > 0) {
      await ProductRepository.updateProduct(
        name,
        description,
        price,
        quantity,
        category,
        type,
        id
      );
      res.send({
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

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [result] = await ProductRepository.getProductById(id);

    if (result.length > 0) {
      successResponse(res, "Ok", result[0]);
    } else {
      errorResponse(res, "Data tidak ditemukan");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    const [checkProduct] = await ProductRepository.getProductById(id);

    if (checkProduct.length > 0) {
      await ProductRepository.deleteProduct(id);
      res.send({
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
