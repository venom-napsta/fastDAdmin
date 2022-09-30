import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  FaCar,
  FaEdit,
  FaEye,
  FaPercent,
  FaPlus,
  FaTrash,
} from 'react-icons/fa';
import { Button } from 'flowbite-react/lib/esm/components/Button';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';

function Settings() {
  const { userInfo, userToken, loading } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, userToken, history]);

  const [showModal, setShowModal] = useState(false);

  return (
    <Fragment>
      {/* Card Start */}
      <div className="m-4 grid grid-cols-1 md:grid-cols-2 row-gap-4 col-gap-4">
        <div className="flex flex-col justify-center m-4 items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-indigo-200">
          <div className="flex text-2xl font-bold bg-indigo-200 p-4 border-r-8 cursor-pointer rounded-full justify-center text-center">
            {'8'}
            <FaPercent size={40} className="ml-2 p-1" />
          </div>
          <div className="text-lg font-medium my-2">Commission</div>
          <div className="p-2">
            <Button
              pill
              size="lg"
              color="dark"
              onClick={() => setShowModal(true)}
            >
              <FaEdit color="green" />
              &nbsp;&nbsp; Edit
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center m-4 items-center col-span-1 bg-white p-6 shadow-lg hover:shadow-none cursor-pointer transition-all duration-300 ease-in border-b-4 border-opacity-0 hover:border-opacity-100 border-indigo-200">
          <div className="flex text-2xl font-bold bg-indigo-200 p-4 border-r-8 cursor-pointer rounded-full justify-center text-center">
            {'4'}
            <FaCar size={40} className="ml-2 p-1" />
          </div>
          <div className="text-lg font-medium my-2">Ride Types</div>
          <div className="p-2 flex flex-row gap-1 sm:flex-col md:flex-col">
            <Button pill size="lg" color="dark">
              <FaPlus color="white" />
              &nbsp;&nbsp; Add
            </Button>
            <Button pill size="lg" color="dark">
              <FaEdit color="green" />
              &nbsp;&nbsp; Edit
            </Button>
            <Button pill size="lg" color="dark">
              <FaTrash color="brown" />
              &nbsp;&nbsp; Remove
            </Button>
            {/* 
            <Button pill size="lg" color="dark">
              <FaEye color="gray" />
              &nbsp;&nbsp; View
            </Button> */}
          </div>
        </div>
      </div>{' '}
      {/* <Show Modal> */}
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Modal Title</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form>
                    <div className="text-[#010080] text-center text-4xl font-medium">
                      Login
                    </div>
                    <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                      <input
                        className={`w-full h-14 border-1 rounded-md bg-transparent`}
                        placeholder="Email"
                        type="email"
                        required
                      />
                      <AiOutlineMail className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                      <input
                        type="password"
                        required
                        placeholder="Password"
                        className={`w-full h-14 border-1 rounded-md bg-transparent`}
                      />
                      <AiFillLock className="absolute right-3 top-5 text-gray-400" />
                    </div>

                    {loading ? (
                      <button
                        type="submit"
                        className="button w-full transform rounded-md bg-[#010080] py-2 font-bold duration-300 hover:text-[#FF6D1C]"
                      >
                        <Spinner aria-label="Large spinner example" size="md" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="button w-full transform rounded-md bg-[#010080] py-2 font-bold duration-300 hover:text-[#FF6D1C]"
                      >
                        LOG IN
                      </button>
                    )}
                  </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Fragment>
  );
}

export default Settings;
