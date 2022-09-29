import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

import Table from '../components/table/Table';

import { Dropdown as DrpDwn } from 'flowbite-react/lib/esm/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';

/* import {
  // getAllUsers,
  // searchUserProfile,
} from '../features/slice/userSlice'; */

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>
      {item.firstname}&nbsp;{item.lastname}
    </td>
    <td>{item.email}</td>
    <td>{item.contact}</td>
    <td>{item.is_verified}</td>
    <td>{item.role}</td>
    <>
      {
        <>
          <td>
            <FaEdit color="green" size={20} />
          </td>
          <td>
            <FaTrashAlt color="brown" size={20} />
          </td>
        </>
      }
    </>
  </tr>
);

const userTableHead = ['id', 'Name', 'email', 'contact', 'is_verified', 'role'];
function Users() {
  // const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);

  function handleFilter(nyika) {
    console.log(users.filter((user) => user.country === nyika));
  }

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

                  <div
                    style={{
                      backgroundColor: '#455560',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '50px',
                    }}
                    className="dropdown dropdown__toggle"
                  >
                    <DrpDwn
                      color="inherit"
                      label={
                        <div className="topnav__right-user">
                          <i className="fa fa-filter" />
                          &nbsp;&nbsp;Filter
                        </div>
                      }
                    >
                      <DrpDwn.Item onClick={() => handleFilter('zimbabwe')}>
                        Zimbabwe
                      </DrpDwn.Item>
                      <DrpDwn.Item onClick={() => handleFilter('south')}>
                        South Africa
                      </DrpDwn.Item>
                    </DrpDwn>
                  </div>
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
                bodyData={users}
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
