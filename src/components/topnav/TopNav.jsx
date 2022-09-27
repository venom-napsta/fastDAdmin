import React, { Fragment } from 'react';

import './topnav.css';

import { Link } from 'react-router-dom';

import Dropdown from '../dropdown/Dropdown';

import ThemeMenu from '../thememenu/ThemeMenu';

import notifications from '../../assets/JsonData/notification.json';

import user_image from '../../assets/images/tuat.png';

import user_menu from '../../assets/JsonData/user_menus.json';

const curr_user = {
  display_name: 'Napsta',
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <Fragment key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Fragment>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
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
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
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
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
