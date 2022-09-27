import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

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

    toast(`Bammer !!!: ${error}`);
    // toast.error("An expected Error Occured");
    // toast == all colors, .err == red, .success == green
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  // Cofiguring default headers
  axios.defaults.headers.common['x-auth-token'] = jwt;
}
let x = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
export default x;
