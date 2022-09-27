import React from 'react';
import { Link } from 'react-router-dom';

// import Badge from '../components/badge/Badge';
import Table from '../components/table/Table';
import Dropdown from '../components/dropdown/Dropdown';

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <p className="button">
      <i className="bx bx-filter"></i>&nbsp;Filter
    </p>
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

// Transactions
const latestTransactions = {
  header: ['Trans id', 'Driver', 'Amount', 'date & time', 'method'],
  body: [
    {
      id: '#OD1711',
      user: 'john doe',
      date: '17 Jun 2021 - 17:30',
      price: '$900',
      method: 'cash',
      status: 'enroute',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 02:33',
      price: '$400',
      method: 'transfer',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 11:20',
      price: '$200',
      method: 'transfer',
      status: 'pending',
    },
    {
      id: '#OD1712',
      user: 'frank iva',
      date: '1 Jun 2021 - 15:10',
      price: '$400',
      method: 'cash',
      status: 'processing',
    },
    {
      id: '#OD1713',
      user: 'anthony baker',
      date: '27 Jun 2021 - 00:28',
      price: '$200',
      method: 'transfer',
      status: 'refund',
    },
  ],
};

const renderTransHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>{item.method}</td>
    {/* <td>
      <Badge type={driverStatus[item.status]} content={item.status} />
    </td> */}
  </tr>
);

const Transactions = () => {
  const filterCriteria = [
    {
      // icon: 'bx bx-user',
      content: 'Zimbabwe',
    },
    {
      // icon: 'bx bx-cog',
      content: 'South Africa',
    },
  ];
  return (
    <div>
      <h2 className="page-header">Transactions</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="filter">
              <div className="topnav__right-item">
                {/* dropdown here */}
                <Dropdown
                  customToggle={() => renderUserToggle(filterCriteria)}
                  contentData={filterCriteria}
                  renderItems={(item, index) => renderMenu(item, index)}
                />
              </div>

              <form
                onSubmit={() => console.log('search')}
                className="topnav__search"
              >
                <input type="text" placeholder="Enter ID here..." />
                <i className="bx bx-search"></i>
              </form>
            </div>
            <div className="card__body">
              <Table
                limit="10"
                headData={latestTransactions.header}
                renderHead={(item, index) => renderTransHead(item, index)}
                bodyData={latestTransactions.body}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
