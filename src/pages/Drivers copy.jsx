import React, { Fragment, useEffect, useState } from 'react';

import Table from '../components/table/Table';

// import customerList from '../assets/JsonData/customers-list.json';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  getAllDrivers,
  searchDriver,
  saveDrivers,
} from '../features/slice/driverSlice';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
import http from '../services/httpService';

const customerTableHead = [
  'id',

  'name',
  'email',
  'contact',
  'role',
  '-',
  'approval status',
  'Overal Rating',
  'ride status',
];

// const driversHeadHeader = ['Driving Info', 'Profile'];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>
      {item.profile.firstname}&nbsp;{item.profile.lastname}
    </td>
    <td>{item.profile.email}</td>
    <td>{item.profile.contact}</td>
    <td>{item.profile.role}</td>
    <td>-</td>
    <td>{item.driving_info.approval_status}</td>
    <td>{item.driving_info.overall_rating}</td>
    <td>{item.driving_info.ride_status}</td>
  </tr>
);

const Drivers = () => {
  const {
    driver,
    drivers,
    documents,
    error: driverError,
    loading: driverLoading,
  } = useSelector((state) => state.driver);

  const history = useHistory();
  const dispatch = useDispatch();

  // const { userInfo, userToken, loading, error } = useSelector(
  //   (state) => state.auth
  // );

  // const [loadingDrv, setLoading] = useState(true);
  // const [drvErr, setDrvErr] = useState(false);

  // useEffect(() => {
  //   http
  //     .get('/drivers')
  //     .then(({ data }) => {
  //       console.log('Axios data: drvrs', data.data);
  //       dispatch(saveDrivers(data.data));
  //       // setUserList(data.data);
  //     })
  //     .catch((err) => {
  //       console.log('axios err', err);
  //       setDrvErr(err.message);
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  //   // dispatch(getAllDrivers());
  //   if (!userToken) {
  //     history.replace('/login');
  //   }
  // }, [loading, drivers, dispatch, userInfo, userToken, history]);

  const [query, setQuery] = useState('');

  // if (loadingDrv) {
  //   return (
  //     <div className="flex flex-col gap-2">
  //       <div className="text-center">
  //         <Spinner size="xl" aria-label="Center-aligned spinner example" />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              {drivers ? (
                <>
                  {' '}
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
                      bodyData={drivers}
                      renderBody={(item, index) => renderBody(item, index)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <div className="text-center">
                      <div
                        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                        role="alert"
                      >
                        <span className="font-medium">
                          Error, Request Failed!
                        </span>
                        {' : '}
                        {/* {drvErr} */}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Drivers;
