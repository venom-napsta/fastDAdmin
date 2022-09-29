import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PrivateRoute({ children }) {
  const { isAuthD } = useSelector((state) => state.auth);

  return isAuthD ? children : <Redirect to="/login" />;
}

export default PrivateRoute;
