import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.defaults.baseURL = 'https://fastdapi.malingreatssmartsystems.co.zw';
// // Alter defaults after instance has been created
const token = JSON.parse(localStorage.getItem('userToken'))
  ? JSON.parse(localStorage.getItem('userToken'))
  : null;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// null == success(usu. handled for auditing), error == fail
axios.interceptors.response.use(null, (error) => {
  const ExpectedError =
    error?.response &&
    error?.response?.status >= 400 &&
    error?.response?.status < 500;

  if (!ExpectedError) {
    logger.log(error);
    logger.log(error?.message);

    // toast.error('An unexpected Error Occured');
  }
  toast(
    `Request Failed !!!: ${
      error?.response?.data?.errors?.message || error?.message
    }`
  );

  return Promise.reject(error);
});

let x = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default x;
