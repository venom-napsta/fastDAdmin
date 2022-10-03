import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

// // Alter defaults after instance has been created
// const token = JSON.parse(localStorage.getItem('userToken'))
//   ? JSON.parse(localStorage.getItem('userToken'))
//   : null;
// axios.defaults.headers.common['Authorization'] = token;

// null == success(usu. handled for auditing), error == fail
axios.interceptors.response.use(null, (error) => {
  const ExpectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!ExpectedError) {
    // logger.log(error.message);
    logger.log(error);

    // console.log('Logging the error', error);
    // alert('An expected Error Occured');

    toast.error('An expected Error Occured');
    // toast == all colors, .err == red, .success == green
  }
  toast(`Bammer !!!: ${error}`);

  return Promise.reject(error);
});

let x = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
export default x;
