import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

// import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import EditModal from '../components/common/EditModal';
import DataTable from 'react-data-table-component';

const Transactions = () => {
  const deleteDriver = (drvr) => {
    console.log('Del Component', drvr);
  };

  const { transactions, loading, error } = useSelector((state) => state.trans);
  const [driver, setDriver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [dataShow, setDataShow] = useState(transactions);
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
      },

      {
        name: 'Name',
        selector: (row) => row.user,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Country',
        selector: (row) => row.country,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Date',
        selector: (row) => row.date,
      },
      {
        name: 'Price',
        selector: (row) => row.price,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Method',
        selector: (row) => row.method,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Status',
        selector: (row) => row.status,
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
    rowsPerPageText: 'transactions Per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All transactions',
  };

  const rowDisabledCriteria = (row) => row.approval_status === 'blocked';
  // console.log('disab', row.approval_status === 'pending');

  const handleSearch = (e) => {
    e.preventDefault();
    // const filteredItems = transactions.filter(
    //   drv => drv.firstname && drv.firstname.toLowerCase().includes(searchValue.toLowerCase()),
    // );

    let searchString = e.target.value;
    e.preventDefault();
    if (searchString !== '') {
      setSearchValue(searchString);
      const searchTable = transactions.filter((o) =>
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
      const searchTable = transactions.filter((o) =>
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
      setDataShow(transactions);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleClear = () => {
    if (searchValue) {
      setSearchValue('');
      setDataShow(transactions);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleRowClick = (row) => {
    setDriver(row);
    setShowModal(true);
  };

  useEffect(() => {}, [
    transactions,
    searchValue,
    resetPaginationToggle,
    dataShow,
  ]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="flex sm:flex-row flex-col">
              <h1 className="ml-2 font-bold text-2xl">transactions</h1>
            </div>
            <div className="card__body sm:flex-row flex-col">
              {/* <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={transactions}
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
              <div className="relative">
                <div className="table-wrapper">
                  <>
                    <DataTable
                      title=""
                      columns={columns}
                      data={dataShow}
                      selectableRows
                      onSelectedRowsChange={handleChange}
                      selectableRowDisabled={rowDisabledCriteria}
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

export default Transactions;

// import React, { useEffect } from 'react';
// import { Link, useHistory } from 'react-router-dom';

// // import Badge from '../components/badge/Badge';
// import Table from '../components/table/Table';
// import Dropdown from '../components/dropdown/Dropdown';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllDrivers } from '../features/slice/driverSlice';

// const renderUserToggle = (user) => (
//   <div className="topnav__right-user">
//     <p className="button">
//       <i className="bx bx-filter"></i>&nbsp;Filter
//     </p>
//   </div>
// );

// const renderMenu = (item, index) => (
//   <Link to="/" key={index}>
//     <div className="notification-item">
//       {/* <i className={item.icon}></i> */}
//       <span>{item.content}</span>
//     </div>
//   </Link>
// );

// // Transactions
// const latestTransactions = {
//   header: ['Trans id', 'Driver', 'Amount', 'date & time', 'method'],
//   body: [
//     {
//       id: '#OD1711',
//       user: 'john doe',
//       country: 'za',
//       date: '17 Jun 2021 - 17:30',
//       price: '$900',
//       method: 'cash',
//       status: 'enroute',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'zw',
//       date: '1 Jun 2021 - 02:33',
//       price: '$400',
//       method: 'transfer',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'zw',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'za',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'zw',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'zw',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'zw',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'za',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'za',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'zw',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'za',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'zw',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'zw',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 11:20',
//       price: '$200',
//       method: 'transfer',
//       status: 'pending',
//     },
//     {
//       id: '#OD1712',
//       user: 'frank iva',
//       country: 'za',
//       date: '1 Jun 2021 - 15:10',
//       price: '$400',
//       method: 'cash',
//       status: 'processing',
//     },
//     {
//       id: '#OD1713',
//       user: 'anthony baker',
//       country: 'za',
//       date: '27 Jun 2021 - 00:28',
//       price: '$200',
//       method: 'transfer',
//       status: 'refund',
//     },
//   ],
// };

// const renderTransHead = (item, index) => <th key={index}>{item}</th>;

// const renderBody = (item, index) => (
//   <tr key={index}>
//     <td>{item.id}</td>
//     <td>{item.user}</td>
//     <td>{item.price}</td>
//     <td>{item.date}</td>
//     <td>{item.method}</td>
//     {/* <td>
//       <Badge type={driverStatus[item.status]} content={item.status} />
//     </td> */}
//   </tr>
// );

// const Transactions = () => {
//   const filterCriteria = [
//     {
//       // icon: 'bx bx-user',
//       content: 'Zimbabwe',
//     },
//     {
//       // icon: 'bx bx-cog',
//       content: 'South Africa',
//     },
//   ];

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
//       <h2 className="page-header">Transactions</h2>
//       <div className="row">
//         <div className="col-12">
//           <div className="card">
//             <div className="filter">
//               <div className="topnav__right-item">
//                 {/* dropdown here */}
//                 <Dropdown
//                   customToggle={() => renderUserToggle(filterCriteria)}
//                   contentData={filterCriteria}
//                   renderItems={(item, index) => renderMenu(item, index)}
//                 />
//               </div>

//               <form
//                 onSubmit={() => console.log('search')}
//                 className="topnav__search"
//               >
//                 <input type="text" placeholder="Enter ID here..." />
//                 <i className="bx bx-search"></i>
//               </form>
//             </div>
//             <div className="card__body">
//               <Table
//                 limit="10"
//                 headData={latestTransactions.header}
//                 renderHead={(item, index) => renderTransHead(item, index)}
//                 bodyData={latestTransactions.body}
//                 renderBody={(item, index) => renderBody(item, index)}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Transactions;
