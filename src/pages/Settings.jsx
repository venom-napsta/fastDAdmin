import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Settings() {
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, userToken, history]);
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-12">
          <div className="col-6">
            <div className="card">
              <div className="card__header">
                <h3>top Drivers</h3>
              </div>
              <div className="card__body"></div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card__header">
                <h3>top Drivers</h3>
              </div>
              <div className="card__body"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
