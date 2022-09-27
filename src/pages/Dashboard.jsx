import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Chart from 'react-apexcharts';

import StatusCard from '../components/status-card/StatusCard';
import Table from '../components/table/Table';
import statusCards from '../assets/JsonData/status-card-data.json';

const chartOptions = {
  series: [
    {
      name: 'Rides',
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60, 89],
    },
    {
      name: 'Packages',
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
    {
      name: 'Food',
      data: [20, 52, 68, 89, 23, 95, 62, 20, 29, 30],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      background: 'transparent',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
      ],
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: false,
    },
  },
};

const topDrivers = {
  head: ['Driver', 'total Rides', 'total earnings', 'Rating'],
  body: [
    {
      username: 'john doe',
      driver: '490',
      price: '$15,870',
      avgRating: '10*',
    },
    {
      username: 'frank iva',
      driver: '250',
      price: '$12,251',
      avgRating: '5*',
    },
    {
      username: 'anthony baker',
      driver: '120',
      price: '$10,840',
      avgRating: '8*',
    },
    {
      username: 'frank iva',
      driver: '110',
      price: '$9,251',
      avgRating: '23*',
    },
    {
      username: 'anthony baker',
      driver: '80',
      price: '$8,840',
      avgRating: '4*',
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.driver}</td>
    <td>{item.price}</td>
    <td>{item.avgRating}</td>
  </tr>
);

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
  ],
};

const renderdriverHead = (item, index) => <th key={index}>{item}</th>;

const renderdriverBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>{item.method}</td>
    {/* 
    <td>
      <Badge type={driverStatus[item.status]} content={item.status} />
    </td> */}
  </tr>
);

const Dashboard = () => {
  // const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const history = useHistory();
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-4" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div onClick={() => history.push('/analytics')} className="col-12">
          <div className="card full-height">
            {/* chart */}
            {/* <Chart
              options={
                
                mode:'light'
                // themeReducer === 'theme-mode-dark'
                //   ? {
                //       ...chartOptions.options,
                //       theme: { mode: 'dark' },
                //     }
                //   : {
                //       ...chartOptions.options,
                //       theme: { mode: 'light' },
                //     }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            /> */}
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>top Drivers</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topDrivers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={topDrivers.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/drivers">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>Latest Transactions</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestTransactions.header}
                renderHead={(item, index) => renderdriverHead(item, index)}
                bodyData={latestTransactions.body}
                renderBody={(item, index) => renderdriverBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/transactions">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
