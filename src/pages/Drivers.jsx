import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaSortAlphaUpAlt, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import EditModal from '../components/common/EditModal';
import DataTable from 'react-data-table-component';

const Drivers = () => {
  const deleteDriver = (id) => {
    console.log('Del Component', id);
  };

  const { drivers, loading, error } = useSelector((state) => state.driver);

  const customerTableHead = [
    'ID',
    'name',
    'email',
    'contact',
    'location',
    'ride_Status',
    'approval_Status',
    'overal_rating',
    'Action',
  ];

  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr
      onClick={() => {
        console.log('Item Selected', item);
        setDriver(item);
        setShowModal(true);
      }}
      className="hover:cursor-pointer"
      key={index}
    >
      <td>{item.id}</td>
      <td>
        {item.firstname} {item.lastname}
      </td>
      <td>{item.email}</td>
      <td>{item.contact}</td>
      <td>{item.location === 'za' ? 'South Africa' : 'Zimbabwe'}</td>
      <td>{item.ride_status}</td>
      <td>{item.approval_status}</td>
      <td>{item.overal_rating}</td>
      {
        <>
          <td>
            <FaEdit
              className="rounded-r hover:border sm:rounded sm:border-r-1 border-r border-b  hover:border-green-400 py-1 px-2"
              color="green"
              size={40}
              onClick={(e) => {
                e.stopPropagation();
                setDriver(item);
                setShowEditModal(true);
              }}
            />
          </td>
          <td>
            <FaTrashAlt
              className="rounded-r hover:border sm:rounded sm:border-r-1 border-r border-b  hover:border-red-400 py-1 px-2"
              color="brown"
              size={40}
              onClick={(e) => {
                e.stopPropagation();
                window.confirm(
                  'Are you sure you wish to delete this driver?'
                ) && deleteDriver(item.id);
              }}
            />
          </td>
        </>
      }
    </tr>
  );

  const [driver, setDriver] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [sortOption, setSortOption] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [tableFilter, setTableFilter] = useState([]);
  // const [dataShow, setDataShow] = useState(initDataShow);
  const [searchValue, setSearchValue] = useState('');
  const [currPage, setCurrPage] = useState(0);

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
        name: 'Firstname',
        selector: (row) => row.firstname,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Lastname',
        selector: (row) => row.lastname,
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
        selector: (row) => row.contact,
      },
      {
        name: 'Location',
        selector: (row) => row.location,
        filterable: true,
        sortable: true,
        conditionalCellStyles: [
          {
            when: (row) => row.location === 'za',
            style: {
              backgroundColor: 'rgba(30, 10, 260, 0.9)',
              color: 'white',
              '&:hover': {
                cursor: 'not-allowed',
              },
            },
          },
        ],
      },
      {
        name: 'Approval Status',
        selector: (row) => row.approval_status,
        filterable: true,
        sortable: true,
        // right: true,
        // conditional Styling
        conditionalCellStyles: [
          {
            when: (row) => row.approval_status === 'approved',
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
        name: 'Ride Status',
        selector: (row) => row.ride_status,
        filterable: true,
        sortable: true,
      },
      {
        name: 'Overal Rating',
        selector: (row) => row.overal_rating,
        filterable: true,
        sortable: true,
        conditionalCellStyles: [
          {
            // when: row => row.overal_rating <=0 && row.calories < 400,
            when: (row) => row.overal_rating <= 0,
            style: {
              backgroundColor: 'orange',
              color: 'white',
              '&:hover': {
                cursor: 'pointer',
              },
            },
          },
        ],
      },
      {
        cell: () => (
          <button onClick={(row) => console.log('Action Btn', row)}>
            Action
          </button>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      },
      /* {
      name: 'Action',
      selector: (row) => (
        <p>
          <button
            onClick={() => console.log('Del', row)}
            className="bg-gray-300 text-red-700"
          >
            Delete
          </button>
        </p>
      ),
      filterable: true,
      sortable: true,
    }, */
    ],
    []
  );

  const sortOptions = [
    'date',
    'name',
    'trips',
    'amount',
    // { value: 'date', label: 'Date' },
    // { value: 'name', label: 'Name' },
    // { value: 'trips', label: 'Trips' },
    // { value: 'amount', label: 'Amount' },
  ];

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
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', selectedRows);
  };

  const paginationOptions = {
    rowsPerPageText: 'Drivers per Page',
    rangeSeparatorText: 'of',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'All Drivers',
  };

  const rowDisabledCriteria = (row) => row.approval_status === 'blocked';
  // console.log('disab', row.approval_status === 'pending');

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <input
        id="search"
        type="text"
        placeholder="Filter By Name"
        aria-label="Search Input"
        value={filterText}
        onChange={onFilter}
      />
      <button type="button" onClick={onClear}>
        X
      </button>
    </>
  );

  const handleSearch = (e) => {
    let searchString = e.target.value;
    e.preventDefault();
    if (searchString !== '') {
      setSearchValue(searchString);
      const searchTable = drivers.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(searchString.toLowerCase())
        )
      );
      setTableFilter([...searchTable]);
    } else if (searchString === '') {
      setSearchValue(searchString);
      // setDataShow([...dataShow]);
    }
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="flex sm:flex-row flex-col">
              <h1 className="ml-2 font-bold text-2xl">Drivers</h1>
            </div>
            <div className="card__body sm:flex-row flex-col">
              {/* <Table
                  limit="10"
                  headData={customerTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={drivers}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="">Time Filter</option>
                      <option>0-24 hrs</option>
                      <option>24-48 hrs</option>
                      <option>2-7 days</option>
                      <option>Last 2 weeks</option>
                      <option>Last 1 month</option>
                    </select>
                  </div>
                  <div className="">
                    <select
                      name="country"
                      value={filterValue}
                      // onChange={handleFilter}
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option defaultValue="">Country</option>
                      <option value="zw">Zimbabwe</option>
                      <option value="za">South Africa</option>
                    </select>
                  </div>
                </div>
                <div className="relative">
                  <div className="topnav__search ">
                    <form className="flex items-center" onSubmit={handleSearch}>
                      <input
                        className="border rounded-md"
                        value={searchValue}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearchValue(e.target.value);
                          console.log('Search Value', searchValue);
                        }}
                        type="text"
                        placeholder="Search here..."
                      />
                      <i
                        onClick={handleSearch}
                        className="ml-1 bx bx-search"
                      ></i>
                    </form>
                    <button
                      onClick={() => {
                        setSearchValue('');
                      }}
                      className="border-solid border hover:bg-slate-400 p-2 px-5 rounded-md"
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
                      columns={columns}
                      data={drivers}
                      selectableRows
                      onSelectedRowsChange={handleChange}
                      selectableRowDisabled={rowDisabledCriteria}
                      onRowClicked={(row) => console.log('row', row)}
                      className="text-2xl"
                      responsive
                      pagination
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

export default Drivers;
