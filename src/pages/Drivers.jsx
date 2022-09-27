import React, { Fragment } from 'react';

import Table from '../components/table/Table';

import customerList from '../assets/JsonData/customers-list.json';

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

const Drivers = () => {
  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="topnav__search">
                <input type="text" placeholder="Search here..." />
                <i className="bx bx-search"></i>
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
