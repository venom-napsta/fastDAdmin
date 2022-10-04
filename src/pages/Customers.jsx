import React, { useEffect } from 'react';

import Table from '../components/table/Table';

import customerList from '../assets/JsonData/customers-list.json';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const customerTableHead = [
  '',
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
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
  </tr>
);

const Customers = () => {
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!userToken) {
  //     history.replace('/login');
  //   }
  // }, [loading, userInfo, userToken, history]);

  return (
    <div>
      <h2 className="page-header">customers</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
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
  );
};

export default Customers;
