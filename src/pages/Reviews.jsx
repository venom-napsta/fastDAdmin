import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Reviews = () => {
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, userToken, history]);
  return <div>Reviews</div>;
};

export default Reviews;
