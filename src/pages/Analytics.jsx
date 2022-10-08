import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import StatusCard from '../components/status-card/StatusCard';
import statusCards from '../assets/JsonData/status-card-data.json';

const chartOptionsZW = {
  series: [
    {
      name: 'Rides',
      data: [40, 70, 20, 60, 36, 80, 30, 50, 60, 89],
    },
    {
      name: 'Packages',
      data: [40, 30, 70, 60, 40, 16, 40, 20, 51, 80],
    },
    {
      name: 'Drivers',
      data: [20, 52, 48, 62, 23, 75, 62, 38, 56, 93],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9', '#111'],
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
        'Oct',
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

const chartOptionsZA = {
  series: [
    {
      name: 'Rides',
      data: [40, 70, 20, 60, 36, 80, 30, 50, 60, 89],
    },
    {
      name: 'Packages',
      data: [40, 30, 30, 60, 40, 16, 40, 20, 51, 80],
    },
    {
      name: 'Drivers',
      data: [20, 52, 48, 62, 23, 75, 62, 38, 56, 93],
    },
  ],
  options: {
    color: ['#6ab04c', '#2980b9', '#111'],
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
        'Oct',
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

const Analytics = () => {
  // const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  const [country, setCountry] = useState('Zimbabwe');

  // useEffect(() => {
  //   if (!userToken) {
  //     history.replace('/login');
  //   }
  // }, [loading, userInfo, userToken, history]);

  const handleChange = (e) => {
    e.preventDefault();
    setCountry(e.target.value);
    console.log('Selectd', country);
  };
  return (
    <div>
      <h2 className="page-header">Analytics</h2>
      <div>
        <div className="row">
          <div className="col-12">
            <fieldset className="bg-gray-200 rounded-md p-4 pb-1">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  setCountry('zw');
                  console.log('Selectd', country);
                }}
                className="flex items-center mb-4 bg-[#010080] rounded-md p-4"
              >
                <label
                  for="country-option-1"
                  className="text-gray-100 block ml-2 text-sm font-medium dark:text-gray-300"
                >
                  Zimbabwe
                </label>
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  setCountry('za');
                  console.log('Selectd', country);
                }}
                className="flex items-center mb-4 bg-gray-300 rounded-md p-4"
              >
                <label
                  for="country-option-2"
                  className="block ml-2 text-sm font-medium text-gray-100 dark:text-gray-300"
                >
                  South Africa
                </label>
              </div>
            </fieldset>
          </div>
        </div>
        {country === 'zw' ? (
          <>
            <div className="row mt-4 px-4">
              {statusCards.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
            <div className="card full-height col-12">
              {/* chart */}
              <Chart
                options={chartOptionsZW.options}
                series={chartOptionsZW.series}
                type="line"
                height="100%"
              />
            </div>
          </>
        ) : (
          <>
            <div className="row mt-4 px-4">
              {statusCards.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </div>
              ))}
            </div>
            <div className="card full-height col-12">
              {/* chart */}
              <Chart
                options={chartOptionsZA.options}
                series={chartOptionsZA.series}
                type="line"
                height="100%"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
