import axios from "axios";

// SNA for every middleware

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== "apiCallBegan") return next(action);

    next(action);

    const { url, method, data, onSuccess, onError } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:9001/api",
        url, // /hello
        method,
        data,
      });

      dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      if (onError) dispatch({ type: onError, payload: error });
    }
  };
export default api;
