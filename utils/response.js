export const successResponse = (res, message, data, code = 200) => {
  res.send({
    code,
    message,
    data,
  });
};

export const errorResponse = (res, message, code = 404) => {
  res.send({
    code,
    message,
  });
};
