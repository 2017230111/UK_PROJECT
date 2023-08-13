import dbPool from "../utils/db.js";

export const getAllProduct = () => {
  const sql = "SELECT * FROM products";
  return dbPool.query(sql);
};

export const createProduct = (
  name,
  description,
  price,
  quantity,
  category,
  type
) => {
  const sql =
    "INSERT INTO products (name, description, price, quantity, category, type, created_at) VALUES (?,?,?,?,?,?,?)";
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");

  const value = [name, description, price, quantity, category, type, dateNow];
  return dbPool.query(sql, value);
};

export const getProductById = (id) => {
  const sql =
    "SELECT name, description, price, quantity, category, type, created_at, updated_at FROM products WHERE product_id = ?";
  return dbPool.query(sql, [id]);
};

export const updateProduct = (
  name,
  description,
  price,
  quantity,
  category,
  type,
  id
) => {
  const sql =
    "UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category = ?, type = ?, updated_at = ? WHERE product_id = ?";
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
  const value = [
    name,
    description,
    price,
    quantity,
    category,
    type,
    dateNow,
    id,
  ];

  return dbPool.query(sql, value);
};

export const deleteProduct = (id) => {
  const sql = "DELETE FROM products WHERE product_id = ?";
  return dbPool.query(sql, [id]);
};
