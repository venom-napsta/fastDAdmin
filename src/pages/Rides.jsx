import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import EditModal from '../components/common/EditModal';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';

const Rides = () => {
  const {
    userInfo,
    userToken,
    loading: userLoading,
  } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [userLoading, userInfo, userToken, history]);

  const deleteDriver = (drvr) => {
    console.log('Del Component', drvr);
  };

  const { rides, loading, error } = useSelector((state) => state.rides);
  const [driver, setDriver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [dataShow, setDataShow] = useState(rides);
  const [searchValue, setSearchValue] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // react-data-table
  const columns = useMemo(
    () => [
      {
        name: 'ID',
        selector: (row) => row.id,
        filterable: false,
        sortable: true,
        width: '80px',
      },

      {
        name: 'Name',
        selector: (row) => row.name,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Email',
        selector: (row) => row.email,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Contact',
        selector: (row) => row.phone,
      },
      {
        name: 'Country',
        selector: (row) => row.location,
        filterable: true,
        sortable: true,
        // conditionalCellStyles: [
        //   {
        //     when: (row) => row.location === 'za',
        //     style: {
        //       backgroundColor: '#010080',
        //       color: 'white',
        //       '&:hover': {
        //         cursor: 'not-allowed',
        //       },
        //     },
        //   },
        //   {
        //     when: (row) => row.location === 'zw',
        //     style: {
        //       backgroundColor: '#ff6d1c',
        //       color: 'white',
        //       '&:hover': {
        //         cursor: 'not-allowed',
        //       },
        //     },
        //   },
        // ],
      },
      {
        name: 'Total Spent',
        selector: (row) => row.total_spend,
        filterable: true,
        sortable: true,
        // right: true,
        // conditional Styling
        conditionalCellStyles: [
          {
            when: (row) => row.total_orders < 80000,
            style: {
              backgroundColor: 'rgba(63, 195, 128, 0.9)',
              color: 'white',
              '&:hover': {
                cursor: 'pointer',
              },
            },
          },
        ],
      },
      {
        name: 'Total Orders',
        selector: (row) => row.total_orders,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Action',
        right: true,
        selector: (row) => (
          <p className="flex">
            <FaEdit
              className="rounded-r hover:border sm:rounded sm:border-r-1 border-r border-b  hover:border-green-400 p-2"
              color="green"
              size={40}
              onClick={(e) => {
                e.stopPropagation();
                console.log('Edit', row);

                setDriver(row);
                setShowEditModal(true);
              }}
            />
            &nbsp; &nbsp;
            <FaTrashAlt
              className="rounded-r hover:border sm:rounded sm:border-r-1 border-r border-b  hover:border-red-400 p-2"
              color="brown"
              size={40}
              onClick={(e) => {
                e.stopPropagation();
                window.confirm(
                  'Are you sure you wish to delete this driver?'
                ) && deleteDriver(row);
              }}
            />
          </p>
        ),
      },
    ],
    []
  );

  // conditional Row Styles
  const conditionalRowStyles = [
    {
      when: (row) => row.id % 2 === 0,
      style: {
        backgroundColor: 'lightgray',
      },
    },
    {
      when: (row) => row.approval_status === 'blocked',
      style: {
        color: 'gray',
        backgroundColor: '#ffcccb',
      },
    },
  ];

  const customStyles = {
    header: {
      style: {
        fontSize: '50px',
      },
    },
    headRow: {
      style: {
        fontSize: '14px',
        backgroundColor: 'gray',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
      },

      headCells: {
        style: {
          color: '#202124',
          fontSize: '14px',
        },
      },
      rows: {
        highlightOnHoverStyle: {
          backgroundColor: 'gray',
          borderBottomColor: 'red',
          borderRadius: '25px',
          outline: '1px solid #FFFFFF',
        },
      },
      pagination: {
        style: {
          border: 'red 1px solid',
        },
      },
    },
  };

  const handleChange = ({ selectedRows }) => {
    let ids = [];
    ids = selectedRows.map((row) => row.id);
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
    console.log('Selected Rows Count: ', selectedRows.length);
    console.log('Selected Rows IDs: ', ids);
  };

  const paginationOptions = {
    rowsPerPageText: 'Customers Per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All customers',
  };

  const rowDisabledCriteria = (row) => row.approval_status === 'blocked';
  // console.log('disab', row.approval_status === 'pending');

  const handleSearch = (e) => {
    e.preventDefault();
    // const filteredItems = customers.filter(
    //   drv => drv.firstname && drv.firstname.toLowerCase().includes(searchValue.toLowerCase()),
    // );

    let searchString = e.target.value;
    e.preventDefault();
    if (searchString !== '') {
      setSearchValue(searchString);
      const searchTable = rides.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(searchString.toLowerCase())
        )
      );
      setDataShow([...searchTable]);
      setResetPaginationToggle(!resetPaginationToggle);
    } else if (searchString === '') {
      handleClear();
    }
  };

  const handleTimeFilter = (e) => {
    e.preventDefault();

    let option = e.target.value;
    console.log('HandleFilter', timeFilter);
    e.preventDefault();
    if (option !== '') {
      const searchTable = rides.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(option.toLowerCase())
        )
      );
      setDataShow([...searchTable]);
      setResetPaginationToggle(!resetPaginationToggle);
    } else if (option === '') {
      handleTimeClear();
    }
  };

  const handleTimeClear = () => {
    if (timeFilter === '') {
      setTimeFilter('');
      setDataShow(rides);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleClear = () => {
    if (searchValue) {
      setSearchValue('');
      setDataShow(rides);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleRowClick = (row) => {
    setDriver(row);
    setShowModal(true);
  };

  useEffect(() => {}, [rides, searchValue, resetPaginationToggle, dataShow]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="flex sm:flex-row flex-col">
              <h1 className="ml-2 font-bold text-2xl">Dummy Data</h1>
            </div>
            <div className="card__body sm:flex-row flex-col">
              {/* <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={rides}
                  renderBody={(item, index) => renderBody(item, index)}
                /> */}
              <div className="flex flex-row justify-self-auto mb-4 sm:mb-3 topnav__search mx-2">
                <div className="flex xs:flex-col sm:flex-row">
                  <div className="relative flex items-center mr-3">
                    <div className="mx-3 border border-r-0 p-3 border-gray-400-200">
                      <FaFilter />
                    </div>
                    <select
                      name="date"
                      id="date"
                      value={timeFilter}
                      onChange={handleTimeFilter}
                      className="bg-gray-50 border w-52 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="">Filter By Daye/Time</option>
                      <option value="last24hrs">0-24 hrs</option>
                      <option value="last24_48hrs">24-48 hrs</option>
                      <option value="last2_7days">2-7 days</option>
                      <option value="last2_weeks">Last 2 weeks</option>
                      <option value="lastCustom">Last 1 month</option>
                    </select>
                    <button
                      onClick={handleTimeClear}
                      className="ml-2 border-solid border hover:bg-gray-200 p-2 px-5 rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                  {/* <div className="">
                    <select
                      name="country"
                      // value={filterValue}
                      // onChange={handleFilter}
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="">Country</option>
                      <option value="zw">Zimbabwe</option>
                      <option value="za">South Africa</option>
                    </select>
                  </div> */}
                </div>
                <div className="relative">
                  <div className="topnav__search">
                    <form className="flex items-center" onSubmit={handleSearch}>
                      <input
                        className="border rounded-md w-full"
                        value={searchValue}
                        type="text"
                        id="search"
                        aria-label="Search Input"
                        placeholder="Search here..."
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                          handleSearch(e);
                        }}
                      />
                      <i
                        onClick={handleSearch}
                        className="ml-1 bx bx-search"
                      ></i>
                    </form>
                    <button
                      onClick={handleClear}
                      className="border-solid border hover:bg-gray-200 p-2 px-5 rounded-md"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              {loading ? (
                <Spinner size="xl" color="blue" />
              ) : (
                <div className="relative">
                  <div className="table-wrapper">
                    <>
                      <DataTable
                        title=""
                        columns={columns}
                        data={dataShow}
                        // selectableRows
                        onSelectedRowsChange={handleChange}
                        // selectableRowDisabled={rowDisabledCriteria}
                        onRowClicked={(row) => handleRowClick(row)}
                        className="text-2xl"
                        responsive
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle}
                        paginationComponentOptions={paginationOptions}
                        customStyles={customStyles}
                        conditionalRowStyles={conditionalRowStyles}
                        fixedHeader
                        highlightOnHover
                        paginationRowsPerPageOptions={[10, 50, 100]}
                        pointerOnHover
                      />
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {showModal && (
          <Modal
            driver={driver}
            showModal
            onClose={() => setShowModal(false)}
          />
        )}
        {showEditModal && (
          <EditModal
            driver={driver}
            showEditModal
            onClose={() => setShowEditModal(false)}
          />
        )}
      </div>
    </Fragment>
  );
};

export default Rides;

// import React, { useEffect } from 'react';

// import Table from '../components/table/Table';

// import customerList from '../assets/JsonData/customers-list.json';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';

// const customerTableHead = [
//   '',
//   'name',
//   'email',
//   'phone',
//   'total orders',
//   'total spend',
//   'location',
// ];

// const renderHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index) => (
//   <tr key={index}>
//     <td>{item.id}</td>
//     <td>{item.name}</td>
//     <td>{item.email}</td>
//     <td>{item.phone}</td>
//     <td>{item.total_orders}</td>
//     <td>{item.total_spend}</td>
//     <td>{item.location}</td>
//   </tr>
// );

// const Customers = () => {
//   const { userInfo, userToken, loading } = useSelector((state) => state.auth);
//   const history = useHistory();
//   const dispatch = useDispatch();

//   // useEffect(() => {
//   //   if (!userToken) {
//   //     history.replace('/login');
//   //   }
//   // }, [loading, userInfo, userToken, history]);

//   return (
//     <div>
//       <h2 className="page-header">customers</h2>
//       <div className="row">
//         <div className="col-12">
//           <div className="card">
//             <div className="card__body">
//               <Table
//                 limit="10"
//                 headData={customerTableHead}
//                 renderHead={(item, index) => renderHead(item, index)}
//                 bodyData={customerList}
//                 renderBody={(item, index) => renderBody(item, index)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Customers;

// import React, { Fragment, useEffect, useState } from 'react';

// import Table from '../components/table/Table';

// // import customerList from '../assets/JsonData/customers-list.json';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
// import http from '../services/httpService';
// import { saveRides } from '../features/slice/rideSlice';

// // const Subheading = [

// //   'pick_from',
// //   'pick_from',
// //   'drop_to',
// //   'role',
// //   '-',
// //   'approval status',
// //   'Overal Rating',
// //   'ride status',
// // ];
// const rideHeader = [
//   'id',
//   'customer_id',
//   'driver_id',
//   'pick_from',
//   'drop_to',
//   'ride_cost',
//   'ride_status',
//   'rating',
// ];

// // const driversHeadHeader = ['Driving Info', 'Profile'];

// const renderHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index) => (
//   <tr key={index}>
//     <td>{item.id}</td>
//     <td>
//       {item.profile.firstname}&nbsp;{item.profile.lastname}
//     </td>
//     <td>{item.profile.email}</td>
//     <td>{item.profile.contact}</td>
//     <td>{item.profile.role}</td>
//     <td>-</td>
//     <td>{item.driving_info.approval_status}</td>
//     <td>{item.driving_info.overall_rating}</td>
//     <td>{item.driving_info.ride_status}</td>
//   </tr>
// );

// const Rides = () => {
//   const {
//     rides,
//     error: getRideError,
//     loading: getRideLoading,
//   } = useSelector((state) => state.rides);

//   const history = useHistory();
//   const dispatch = useDispatch();

//   const { userInfo, userToken, loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const [loadingRides, setLoadingRides] = useState(true);
//   const [ridesErr, setRidesErr] = useState(false);

//   useEffect(() => {
//     http
//       .get('/rides')
//       .then(({ data }) => {
//         console.log('Axios data: rides', data.data);
//         dispatch(saveRides(data.data));
//         // setUserList(data.data);
//       })
//       .catch((err) => {
//         console.log('axios err', err);
//         setRidesErr(err.message);
//       })
//       .finally(() => setLoadingRides(false));
//   }, []);

//   // useEffect(() => {
//   //   // dispatch(getAllDrivers());
//   //   if (!userToken) {
//   //     history.replace('/login');
//   //   }
//   // }, [loading, dispatch, userInfo, userToken, history]);

//   const [query, setQuery] = useState('');

//   if (loadingRides) {
//     return (
//       <div className="flex flex-col gap-2">
//         <div className="text-center">
//           <Spinner size="xl" aria-label="Center-aligned spinner example" />
//         </div>
//       </div>
//     );
//   }
//   // if (ridesErr) {
//   //   return (
//   //     <>
//   //       {' '}
//   //       <Badge color="failure" size="sm">
//   //         {ridesErr}
//   //       </Badge>
//   //     </>
//   //   );
//   // }

//   return (
//     <Fragment>
//       <div>
//         <div className="row">
//           <div className="col-12">
//             <div className="card">
//               {rides ? (
//                 <>
//                   <div className="topnav__search">
//                     <input
//                       onChange={(e) => setQuery(e.target.value)}
//                       type="text"
//                       placeholder="Search here..."
//                     />
//                     <i className="bx bx-search"></i>
//                   </div>
//                   <div className="card__body">
//                     <Table
//                       limit="10"
//                       headData={rideHeader}
//                       renderHead={(item, index) => renderHead(item, index)}
//                       bodyData={rides}
//                       renderBody={(item, index) => renderBody(item, index)}
//                     />
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="flex flex-col gap-2">
//                     <div className="text-center">
//                       <div
//                         className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
//                         role="alert"
//                       >
//                         <span className="font-medium">
//                           Error, Request Failed!
//                         </span>
//                         {' : '}
//                         {ridesErr}
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Rides;
