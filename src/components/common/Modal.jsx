import React, { Fragment } from 'react';
import {
  AiFillCar,
  AiFillCheckCircle,
  AiFillCompass,
  AiFillFile,
  AiFillFileUnknown,
  AiFillQuestionCircle,
  AiFillTrophy,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';

function Modal({ onClose, driver: user }) {
  return (
    <Fragment>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-7/12 my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <div className="text-[#010080] text-center text-xl font-medium">
                  Driver Details
                </div>
                <button
                  className="p-1 ml-auto bg-gray-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={onClose}
                >
                  <FaTimes size={20} color="black" />
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form className="overflow-auto " autoComplete="off">
                  <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Name: {user.firstname + ' ' + user.lastname}
                    <AiOutlineUserAdd className="absolute right-3 top-5 text-gray-400" />
                  </div>
                  <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Email: {user.email}
                    <AiOutlineUser className="absolute right-3 top-5 text-gray-400" />
                  </div>
                  <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Phone: {user.contact}
                    <AiOutlinePhone className="absolute right-3 top-5 text-gray-400" />
                  </div>
                  <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                    Location: {user.location}
                    <AiOutlineMail className="absolute right-3 top-5 text-gray-400" />
                  </div>
                  <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                    Ride Status: {user.ride_status}
                    <AiFillQuestionCircle className="absolute right-3 top-5 text-gray-400" />
                  </div>

                  <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                    Documents :
                    <AiFillFile className="absolute right-3 top-5 text-gray-400" />
                    <div>
                      <ul style={{ listStyle: 'inside' }}>
                        <li>Document 1</li>
                        <li>Document 2</li>
                        <li>Document 3</li>
                      </ul>
                    </div>
                  </div>

                  {user.approval_status === 'approved' && (
                    <>
                      <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                        Vehicles :
                        <AiFillCar className="absolute right-3 top-5 text-gray-400" />
                        <div>
                          <ul style={{ listStyle: 'inside' }}>
                            <li>Vehicle 1</li>
                            <li>Vehicle 2</li>
                            <li>Vehicle 3</li>
                          </ul>
                        </div>
                      </div>

                      <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                        Trips :
                        <AiFillCompass className="absolute right-3 top-5 text-gray-400" />
                        <div>
                          <ul style={{ listStyle: 'inside' }}>
                            <li>Trips 1</li>
                            <li>Trips 2</li>
                            <li>Trips 3</li>
                          </ul>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                    Approval Status: {user.approval_status}
                    {user.approval_status === 'pending' ? (
                      <AiFillFileUnknown className="absolute right-3 top-5 text-gray-400" />
                    ) : (
                      <AiFillCheckCircle
                        color="green"
                        className="absolute right-3 top-5 text-gray-400"
                      />
                    )}
                  </div>
                  <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                    Overall Rating: {user.overal_rating}
                    <AiFillTrophy className="absolute right-3 top-5 text-gray-400" />
                  </div>
                </form>
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </Fragment>
  );
}

export default Modal;
