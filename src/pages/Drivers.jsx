import React, { Fragment, useEffect } from 'react';

import Table from '../components/table/Table';

import customerList from '../assets/JsonData/customers-list.json';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllDrivers, searchDriver } from '../features/slice/driverSlice';
import { useState } from 'react';
import { Badge } from 'flowbite-react/lib/cjs/components/Badge';

const customerTableHead = [
  'id',
  'name',
  'email',
  'phone',
  'total orders',
  'total spend',
  'location',
];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>
      {item.firstname}&nbsp;{item.lastname}
    </td>
    <td>{item.email}</td>
    <td>{item.contact}</td>
    <td>{item.role}</td>
    <td></td>
    <td>{item.ride_status}</td>
    <td>{item.approval_status}</td>
    <td>{item.overall_rating}</td>
  </tr>
);

const Drivers = () => {
  const { user, isAuthD, loading, error } = useSelector((state) => state.auth);

  const { drivers } = useSelector((state) => state.driver);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect');
    console.log(dispatch(getAllDrivers()));
  }, [isAuthD, dispatch, user, loading, error, history]);

  const [query, setQuery] = useState('');
  if (error) {
    return (
      <>
        {' '}
        <Badge color="failure" size="sm">
          {error.message}
        </Badge>
      </>
    );
  }

  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="topnav__search">
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search here..."
                />
                <i
                  onClick={() => dispatch(searchDriver(query))}
                  className="bx bx-search"
                ></i>
              </div>
              <div className="card__body">
                <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={customerList}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Drivers;
