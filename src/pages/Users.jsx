import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import EditModal from '../components/common/EditModal';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../features/slice/userSlice';
import AddUser from '../components/common/AddUser';
import NewRoleModal from '../components/common/NewRoleModal.jsx';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUserAdd,
} from 'react-icons/ai';

const Users = () => {
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const { users, loading, error } = useSelector((state) => state.users);
  const {
    userInfo,
    registeredUser,
    userToken,
    regErr,
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

  const [driver, setDriver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewUserModal, setNewUserModal] = useState(false);
  const [newUserRoleModal, setNewUserRoleModal] = useState(false);

  const [dataShow, setDataShow] = useState(users);
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
        name: 'User Type',
        selector: (row) => row.userType,
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
    rowsPerPageText: 'users Per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All users',
  };

  // const rowDisabledCriteria = (row) => row.approval_status === 'blocked';
  // // console.log('disab', row.approval_status === 'pending');

  const handleSearch = (e) => {
    e.preventDefault();
    // const filteredItems = users.filter(
    //   drv => drv.firstname && drv.firstname.toLowerCase().includes(searchValue.toLowerCase()),
    // );

    let searchString = e.target.value;
    e.preventDefault();
    if (searchString !== '') {
      setSearchValue(searchString);
      const searchTable = users.filter((o) =>
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
      const searchTable = users.filter((o) =>
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
      setDataShow(users);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleClear = () => {
    if (searchValue) {
      setSearchValue('');
      setDataShow(users);
      setResetPaginationToggle(!resetPaginationToggle);
    }
  };

  const handleRowClick = (row) => {
    setDriver(row);
    setShowModal(true);
  };

  useEffect(() => {}, [users, searchValue, resetPaginationToggle, dataShow]);

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="flex sm:flex-row flex-col">
              <h1 className="ml-2 font-bold text-2xl">Users Data</h1>
              <button
                className="bg-gray-300 p-3 rounded-md hover:bg-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  setNewUserModal(true);
                }}
              >
                Add New User
              </button>
              <button
                className="bg-gray-300 p-3 rounded-md hover:bg-gray-400"
                onClick={(e) => {
                  e.preventDefault();
                  setNewUserRoleModal(true);
                }}
              >
                Add Role
              </button>
            </div>
            {registeredUser && (
              <div
                className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <div className="card__body sm:flex-row flex-col">
                  <h4>Newly Registered User</h4>
                  <div className="w-full h-10 border rounded-md p-2 mb-4 my-3 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Name:{' '}
                    {registeredUser.firstname + ' ' + registeredUser.lastname}
                    <AiOutlineUserAdd className="absolute right-3 top-3 text-gray-400" />
                  </div>
                  <div className="w-full h-10 border rounded-md p-2 mb-4 my-3 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Email: {registeredUser.email}
                    <AiOutlineMail className="absolute right-4 top-3 text-gray-400" />
                  </div>
                  <div className="w-full h-10 border rounded-md p-2 mb-4 my-3 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Phone: {registeredUser.phone_number}
                    <AiOutlinePhone className="absolute right-4 top-3 text-gray-400" />
                  </div>
                </div>
              </div>
            )}
            <div className="card__body sm:flex-row flex-col">
              {/* <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={users}
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
        {showNewUserModal && (
          <AddUser showModal onClose={() => setNewUserModal(false)} />
        )}
        {newUserRoleModal && (
          <NewRoleModal showModal onClose={() => setNewUserRoleModal(false)} />
        )}
      </div>
    </Fragment>
  );
};

export default Users;
