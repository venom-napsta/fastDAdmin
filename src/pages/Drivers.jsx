import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from '../components/table/Table';

import { FaEdit, FaFilter, FaSortAlphaUpAlt, FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/common/Modal';
import EditModal from '../components/common/EditModal';

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

  return (
    <Fragment>
      <div>
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="my-2 flex sm:flex-row flex-col">
                {/* relative bar */}
                {/* <div className="relative">
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
                  </div>
                      </div>*/}
              </div>
              {/* 
              <button onClick={handleReset} className=" text-gray-400">
                Reset
              </button> */}
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
