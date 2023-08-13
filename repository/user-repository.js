import dbPool from "../utils/db.js";

export const getAlluser = () => {
  const sql = "SELECT name, email, created_at, updated_at FROM users";

  const result = dbPool.query(sql);
  return result;
};

export const createUser = (name, email, password) => {
  const sql =
    "INSERT INTO users (name, email, password, created_at) VALUE(?,?,?,?)";
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");

  const value = [name, email, password, dateNow];

  return dbPool.query(sql, value);
};

export const updateUser = (name, email, id) => {
  const sql =
    "UPDATE users SET name = ?, email = ?, updated_at = ? WHERE user_id = ?";
  const dateNow = new Date().toISOString().slice(0, 19).replace("T", " ");
  const value = [name, email, dateNow, id];

  return dbPool.query(sql, value);
};

export const getUserById = (id) => {
  const sql =
    "SELECT name, email, created_at, updated_at FROM users WHERE user_id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};

export const deleteUser = (id) => {
  const sql = "DELETE FROM users WHERE user_id = ?";
  const value = [id];

  return dbPool.query(sql, value);
};

export const getDataByEmail = (email) => {
  const sql =
    "SELECT user_id, name, email, password, created_at, updated_at FROM users WHERE email = ?";
  const value = [email];

  return dbPool.query(sql, value);
};
