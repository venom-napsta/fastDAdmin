import React from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import Table from '../components/table/Table';
import Dropdown from '../components/dropdown/Dropdown';

import userList from '../assets/JsonData/users.json';

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.userType}</td>
    <tr>
      {
        <tr>
          <td>
            <FaEdit color="green" size={20} />
          </td>
          <td>
            <FaTrashAlt color="brown" size={20} />
          </td>
        </tr>
      }
    </tr>
  </tr>
);

const renderUserToggle = () => (
  <div className="topnav__right-user">
    <button className="button">
      <i className="bx bx-filter"></i>&nbsp;Filter
    </button>
  </div>
);

const renderMenu = (item, index) => (
  <Link to="/" key={index}>
    <div className="notification-item">
      {/* <i className={item.icon}></i> */}
      <span>{item.content}</span>
    </div>
  </Link>
);
const userTableHead = ['', 'name', 'email', 'phone', 'Type', 'Action'];
function Users() {
  const filterCriteria = [
    {
      icon: 'fa fa-heart',
      content: 'Zimbabwe',
    },
    {
      icon: 'bx bx-cog',
      content: 'South Africa',
    },
  ];

  return (
    <div>
      <div className="flex">
        {' '}
        <h2 className="page-header">Users</h2>
        <button className="button">Add New User</button>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div className="filter">
                <div className="topnav__right-item">
                  {/* dropdown here */}
                  <Dropdown
                    customToggle={() => renderUserToggle(filterCriteria)}
                    contentData={filterCriteria}
                    renderItems={(item, index) => renderMenu(item, index)}
                  />
                </div>

                <div className="topnav__search">
                  <input type="text" placeholder="Search here..." />
                  <i className="bx bx-search"></i>
                </div>
              </div>
              <Table
                limit="10"
                headData={userTableHead}
                renderHead={(item, index) => renderHead(item, index)}
                bodyData={userList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
