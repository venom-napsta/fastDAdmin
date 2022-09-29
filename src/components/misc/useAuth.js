import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function useAuth() {
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, userToken, history]);
  return;
}
