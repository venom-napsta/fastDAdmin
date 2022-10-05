import React, { Fragment } from 'react';

import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaSortAlphaUpAlt, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux';
import EditModal from '../components/common/EditModal';

const Drivers = () => {
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
        <Fragment>
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
                if (
                  window.confirm('Are you sure you wish to delete this item?')
                )
                  console.log('Del', item);
              }}
            />
          </td>
        </Fragment>
      }
    </tr>
  );

  const [driver, setDriver] = React.useState({});
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0 topnav__search mx-2">
                  <div className="mx-3 border border-r-0 p-3 border-gray-400-200">
                    <FaSortAlphaUpAlt />
                  </div>
                  <div className="relative flex items-center">
                    <select className="ml-2 h-full border-l-0 rounded-r border sm:rounded sm:border-l-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <option>Sort by:</option>
                      <option>Date</option>
                      <option>Name</option>
                      <option>Trips</option>
                      <option>Amount</option>
                    </select>
                  </div>
                  <div className="mx-3 border border-r-0 p-3 border-gray-400-200">
                    <FaFilter />
                  </div>
                  <div className="relative flex items-center ">
                    <label htmlFor="date">Time </label>
                    <select
                      name="date"
                      id="date"
                      className="ml-2 h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option>All</option>
                      <option>0-24 hrs</option>
                      <option>24-48 hrs</option>
                      <option>2-7 days</option>
                      <option>Last 2 weeks</option>
                      <option>Last 1 month</option>
                    </select>
                  </div>
                  <div className="relative flex items-center ">
                    <label htmlFor="coutry">Country </label>
                    <select className="ml-2 h-full rounded-r border sm:rounded sm:border-r-1 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                      <option value="zw">Zimbabwe</option>
                      <option value="za">South Africa</option>
                    </select>
                  </div>
                </div>
                <div className="block relative">
                  <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 fill-current text-gray-500"
                    >
                      <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                    </svg>
                  </span>
                  <div className="topnav__search">
                    <input type="text" placeholder="Search here..." />
                    <i className="bx bx-search"></i>
                  </div>
                </div>
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
