import React, { useEffect, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDriver } from '../features/slice/driverSlice';

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = useState(1);
  const [openHistTab, setOpenHistTab] = useState(1);
  const [view, setView] = useState('');

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex xs:flex-col mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1
                    ? `text-white bg-[${color}] hover:text-gray-300`
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <p className="flex">
                  Profile
                  <AiOutlineUserAdd
                    className="relative right-8 top-0 text-gray-400"
                    size={20}
                  />
                </p>
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2
                    ? `text-white bg-[${color}] hover:text-gray-300`
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <p className="flex">
                  Documents
                  <AiOutlineUserAdd
                    className="relative right-8 m-0 p-0 text-gray-400"
                    size={20}
                  />
                </p>
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 3
                    ? `text-white bg-[${color}] hover:text-gray-300`
                    : 'text-' + color + '-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <p className="flex">
                  History
                  <AiOutlineUserAdd
                    className="relative right-8 m-0 p-0 text-gray-400"
                    size={20}
                  />
                </p>
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                  <p>Show full user profile here.</p>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                  <p>Show all user Documents here. Including Images</p>
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
                  {/* <p>
                    Efficiently unleash cross-media information without
                    cross-media value. Quickly maximize timely deliverables for
                    real-time schemas.
                    <br />
                    <br /> Dramatically maintain clicks-and-mortar solutions
                    without functional solutions.
                  </p> */}
                  <div className="w-full">
                    <div>
                      <ul
                        className="flex xs:flex-col mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                        role="tablistHist"
                      >
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                          <a
                            className={
                              'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                              (openHistTab === 1
                                ? `text-white bg-[${color}] hover:text-gray-300`
                                : 'text-' + color + '-600 bg-white')
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenHistTab(1);
                            }}
                            data-toggle="tab"
                            href="#histLink1"
                            role="tablist"
                          >
                            <p className="flex">
                              Ride Status
                              <AiOutlineUserAdd
                                className="relative right-8 top-0 text-gray-400"
                                size={20}
                              />
                            </p>
                          </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                          <a
                            className={
                              'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                              (openHistTab === 2
                                ? `text-white bg-[${color}] hover:text-gray-300`
                                : 'text-' + color + '-600 bg-white')
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenHistTab(2);
                            }}
                            data-toggle="tab"
                            href="#histLink2"
                            role="tablist"
                          >
                            <p className="flex">
                              Ride History
                              <AiOutlineUserAdd
                                className="relative right-8 m-0 p-0 text-gray-400"
                                size={20}
                              />
                            </p>
                          </a>
                        </li>
                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                          <a
                            className={
                              'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                              (openHistTab === 3
                                ? `text-white bg-[${color}] hover:text-gray-300`
                                : 'text-' + color + '-600 bg-white')
                            }
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenHistTab(3);
                            }}
                            data-toggle="tab"
                            href="#histLink3"
                            role="tablist"
                          >
                            <p className="flex">
                              Transaction History
                              <AiOutlineUserAdd
                                className="relative right-8 m-0 p-0 text-gray-400"
                                size={20}
                              />
                            </p>
                          </a>
                        </li>
                      </ul>
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                        <div className="px-4 py-5 flex-auto">
                          <div className="tab-content tab-space">
                            <div
                              className={openHistTab === 1 ? 'block' : 'hidden'}
                              id="histLink1"
                            >
                              <p>Show Driver Ride Status</p>
                            </div>
                            <div
                              className={openHistTab === 2 ? 'block' : 'hidden'}
                              id="histLink2"
                            >
                              <p>Show Ride History</p>
                            </div>
                            <div
                              className={openHistTab === 3 ? 'block' : 'hidden'}
                              id="histLink3"
                            >
                              <div className="w-full">
                                <div>
                                  <p>Driver Trans Hist</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Driver() {
  let { driverId } = useParams();
  const dispatch = useDispatch();

  const [driver, setDriver] = useState({
    approval_status: 'pending',
  });
  useEffect(() => {
    // dispatch(getDriver(driverId))
    // dispatch(getDriverRides(driverId))
    // dispatch(getDriverDocs(driverId))
    // dispatch(getDriverHistory(driverId))
    // dispatch(getDriverTransactions(driverId))
  }, []);
  return (
    <React.Fragment>
      <div className="flex justify-between items-center mb-3">
        <div>Driver: {driverId}</div>
        <div className="m-2">
          {driver?.approval_status === 'pending' ? (
            <>
              <button className="px-3 bg-green-500 rounded-md p-2 mx-2 text-white hover:text-[#010080]">
                Approve
              </button>
              <button className="px-3 bg-red-500 rounded-md p-2 mx-2 text-white hover:text-[#010080]">
                Reject
              </button>
            </>
          ) : (
            <>
              {driver?.approval_status === 'rejected' ? (
                <>
                  <button className="px-3 bg-red-500 rounded-md p-2 mx-2 text-white hover:text-[#010080]">
                    Reject
                  </button>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
      <Tabs color="#010080" />
    </React.Fragment>
  );
}
