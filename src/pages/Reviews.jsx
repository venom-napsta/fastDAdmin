import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useMemo } from 'react';

const Reviews = () => {
  const { drivers, error } = useSelector((state) => state.driver);
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, userToken, history]);

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
              backgroundColor: 'rgba(248, 148, 6, 0.9)',
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
              backgroundColor: 'rgba(242, 38, 19, 0.9)',
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

  // conditional Row Styles
  const conditionalRowStyles = [
    {
      when: (row) => row.id % 2 === 0,
      style: {
        backgroundColor: 'lightgray',
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

  const rowDisabledCriteria = (row) => row.approval_status === 'pending';
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

  return (
    <>
      <h1>Drivers</h1>
      <FilterComponent />
      <DataTable
        columns={columns}
        data={drivers}
        // selectableRows
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
        subHeaderComponent={() => <div className="bg-red-500">hello</div>}
      />
    </>
  );
};

export default Reviews;
