import React, { Fragment, useEffect } from 'react';

import './topnav.css';

import { Link, useHistory } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

// import ThemeMenu from '../thememenu/ThemeMenu';

import notifications from '../../assets/JsonData/notification.json';

import user_image from '../../assets/images/tuat.png';

import { useDispatch, useSelector } from 'react-redux';
import {
  // getUserProfile,
  loginStatusChange,
  // logout,
} from '../../features/slice/authSlice';
import { Dropdown as DrpDwn } from 'flowbite-react/lib/esm/components/Dropdown';

const renderNotificationItem = (item, index) => (
  <Fragment key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Fragment>
);

const Topnav = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (user.token) {
    //   dispatch(getUserProfile());
    // }
  }, [user, dispatch]);

  const curr_user = {
    display_name: 'Napsta',
    image: user_image,
  };
  // redux/db
  // const curr_user = {
  //   display_name: user.displayName,
  //   image: user.user_image,
  // };
  return (
    <div className="topnav">
      <div className="bg-white-200">
        <h1>Control Panel</h1>
      </div>
      {/* <div className="topnav__search">
                <input type="text" placeholder='Search here...' />
                <i className='bx bx-search'></i>
            </div> */}
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}

          <DrpDwn
            color="inherit"
            label={
              <div className="topnav__right-user">
                <div className="topnav__right-user__image">
                  <img src={curr_user.image} alt="usr" />
                </div>
                <div className="topnav__right-user__name">
                  {curr_user.display_name}
                </div>
              </div>
            }
          >
            <Link to="/settings">
              <DrpDwn.Item>Settings</DrpDwn.Item>
            </Link>
            <DrpDwn.Item
              onClick={() => {
                // dispatch(logout());
                dispatch(loginStatusChange(false));
                history.replace('/login');
              }}
            >
              Sign out
            </DrpDwn.Item>
          </DrpDwn>
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => (
              <div className="button">
                <Link to="/">View All</Link>
              </div>
            )}
          />
        </div>
        {/* 
        <div className="topnav__right-item">
          <ThemeMenu />
        </div> */}
      </div>
    </div>
  );
};

export default Topnav;
