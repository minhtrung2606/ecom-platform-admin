import BaseError from "./BaseError";

const getRequestErrorMessage = (e) => {
  if (e instanceof BaseError) {
    return e.message;
  }

  const { msg } = e.response?.data;
  return msg || e.message;
};

const axiosUtils = {
  getRequestErrorMessage,
};

export default axiosUtils;
