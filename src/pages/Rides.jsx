import React, { Fragment, useEffect, useState } from 'react';

import Table from '../components/table/Table';

// import customerList from '../assets/JsonData/customers-list.json';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
import http from '../services/httpService';
import { saveRides } from '../features/slice/rideSlice';

// const Subheading = [

//   'pick_from',
//   'pick_from',
//   'drop_to',
//   'role',
//   '-',
//   'approval status',
//   'Overal Rating',
//   'ride status',
// ];
const rideHeader = [
  'id',
  'customer_id',
  'driver_id',
  'pick_from',
  'drop_to',
  'ride_cost',
  'ride_status',
  'rating',
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

const Rides = () => {
  const {
    rides,
    error: getRideError,
    loading: getRideLoading,
  } = useSelector((state) => state.rides);

  const history = useHistory();
  const dispatch = useDispatch();

  const { userInfo, userToken, loading, error } = useSelector(
    (state) => state.auth
  );

  const [loadingRides, setLoadingRides] = useState(true);
  const [ridesErr, setRidesErr] = useState(false);

  useEffect(() => {
    http
      .get('/rides')
      .then(({ data }) => {
        console.log('Axios data: rides', data.data);
        dispatch(saveRides(data.data));
        // setUserList(data.data);
      })
      .catch((err) => {
        console.log('axios err', err);
        setRidesErr(err.message);
      })
      .finally(() => setLoadingRides(false));
  }, []);

  // useEffect(() => {
  //   // dispatch(getAllDrivers());
  //   if (!userToken) {
  //     history.replace('/login');
  //   }
  // }, [loading, dispatch, userInfo, userToken, history]);

  const [query, setQuery] = useState('');

  if (loadingRides) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <Spinner size="xl" aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }
  // if (ridesErr) {
  //   return (
  //     <>
  //       {' '}
  //       <Badge color="failure" size="sm">
  //         {ridesErr}
  //       </Badge>
  //     </>
  //   );
  // }

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
                <i className="bx bx-search"></i>
              </div>
              <div className="card__body">
                {rides ? (
                  <Table
                    limit="10"
                    headData={rideHeader}
                    renderHead={(item, index) => renderHead(item, index)}
                    bodyData={rides}
                    renderBody={(item, index) => renderBody(item, index)}
                  />
                ) : null}
              </div>
            </div>

            {ridesErr ? (
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
                      {ridesErr}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Rides;
