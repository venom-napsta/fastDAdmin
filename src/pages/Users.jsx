import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaEdit, FaTimes, FaTrashAlt } from 'react-icons/fa';

/* Form Validation and handling */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Table from '../components/table/Table';

import { Dropdown as DrpDwn } from 'flowbite-react/lib/esm/components/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { /* getAllUsers */ saveUsers } from '../features/slice/userSlice';
import { registerUser } from '../features/slice/authSlice';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
import http from '../services/httpService';
import {
  AiFillLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import RegisteredUser from '../components/common/RegisteredUser';

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>
      {item.firstname}&nbsp;{item.lastname}
    </td>
    <td>{item.email}</td>
    <td>{item.contact}</td>
    <td>{item.is_verified}</td>
    <td>{item.role}</td>
    <>
      {
        <>
          <td>
            <FaEdit color="green" size={20} />
          </td>
          <td>
            <FaTrashAlt color="brown" size={20} />
          </td>
        </>
      }
    </>
  </tr>
);

const userTableHead = ['id', 'Name', 'email', 'contact', 'is_verified', 'role'];
function Users() {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    firstname: yup.string().min(3).max(50).required(),
    lastname: yup.string().min(3).max(50).required(),
    email: yup.string().email().required(),
    contact: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid.')
      .min(9)
      .max(15)
      .required(),
    password: yup.string().min(6).max(32).required(),
    password_confirmation: yup.string().min(6).max(32).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  /* Form Sublmision */
  const onSubmitHandler = async (data) => {
    console.log('sign up details', data);
    dispatch(registerUser(data));
    reset();
  };

  function handleFilter(nyika) {
    console.log(users.filter((user) => user.country === nyika));
  }

  const { userInfo, userToken, loading, registeredUser } = useSelector(
    (state) => state.auth
  );
  const {
    users,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  const history = useHistory();
  const dispatch = useDispatch();

  const [usrLoading, setUsrLoading] = useState(true);
  const [usrErr, setUsrErr] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    http
      .get('/users')
      .then(({ data }) => {
        console.log('Axios data', data.data);
        dispatch(saveUsers(data.data));
        // setUserList(data.data);
      })
      .catch((err) => {
        console.log('axios err', err);
        setUsrErr(err.message);
      })
      .finally(() => setUsrLoading(false));
  }, []);

  useEffect(() => {
    // dispatch(getAllUsers());
    if (!userToken) {
      history.replace('/login');
    }
  }, [loading, userInfo, users, userToken, history, registeredUser, dispatch]);

  const [filter, setFilter] = useState('');
  // const filteredUsers = useMemo(
  //   () => users.filter((user) => user.firstname.startsWith(filter)),
  //   [filter, users]
  // );

  if (usrLoading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <Spinner size="xl" aria-label="Center-aligned spinner example" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex">
        {' '}
        <p></p>
        {/* <h2 className="font-bold page-header">All Users</h2> */}
        <button onClick={() => setShowModal(true)} className="button">
          Add New User
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            {/* Newly registered User */}
            {registeredUser ? (
              <RegisteredUser registeredUser={registeredUser} />
            ) : null}
            <div className="card__body">
              <div className="filter">
                {/*<div className="topnav__right-item">
                  {/* dropdown here */}

                {/* <div
                    style={{
                      backgroundColor: '#455560',
                      color: 'white',
                      padding: '8px',
                      borderRadius: '50px',
                    }}
                    className="dropdown dropdown__toggle "
                  >
                    <DrpDwn
                      color="inherit"
                      label={
                        <div className="topnav__right-user">
                          <i className="fa fa-filter" />
                          &nbsp;&nbsp;Filter
                        </div>
                      }
                    >
                      <DrpDwn.Item onClick={() => handleFilter('zimbabwe')}>
                        Zimbabwe
                      </DrpDwn.Item>
                      <DrpDwn.Item onClick={() => handleFilter('south')}>
                        South Africa
                      </DrpDwn.Item>
                    </DrpDwn>
                  </div>
                    </div> */}
              </div>
              <div className="topnav__search mb-5">
                <input
                  onChange={(e) => setFilter(e.target.value)}
                  type="text"
                  placeholder="Search here..."
                />
                <i className="bx bx-search"></i>
              </div>

              <>
                <Table
                  limit="10"
                  headData={userTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={users}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              </>
            </div>
            {usrErr ? (
              <>
                <div className="flex flex-col gap-2">
                  <div className="text-center">
                    <div
                      class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                      role="alert"
                    >
                      <span class="font-medium">Error, Request Failed!</span>{' '}
                      {' : '}
                      {usrErr}
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-7/12 my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <div className="text-[#010080] text-center text-xl font-medium">
                    User Details
                  </div>
                  <button
                    className="p-1 ml-auto bg-gray-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <FaTimes size={20} color="black" />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    onSubmit={handleSubmit(onSubmitHandler)}
                    autoComplete="off"
                  >
                    <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                      <input
                        className={
                          !errors.firstname
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        placeholder="Firstname"
                        type="text"
                        required
                        {...register('firstname')}
                      />
                      <AiOutlineUserAdd className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                      <input
                        className={
                          !errors.lastname
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        placeholder="Last Name"
                        type="text"
                        required
                        {...register('lastname')}
                      />
                      <AiOutlineUser className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                      <input
                        className={
                          !errors.email
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        placeholder="Email"
                        type="email"
                        required
                        {...register('email')}
                      />
                      <AiOutlineMail className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                      <input
                        className={
                          !errors.contact
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        placeholder="Contact Number"
                        type="text"
                        required
                        {...register('contact')}
                      />
                      <AiOutlinePhone className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                      <input
                        type="password"
                        required
                        placeholder="Password"
                        className={
                          !errors.password
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        {...register('password')}
                      />
                      <AiFillLock className="absolute right-3 top-5 text-gray-400" />
                    </div>
                    <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                      <input
                        type="password"
                        required
                        placeholder="Confirm Password"
                        className={
                          !errors.password_confirmation
                            ? `w-full h-14 border-1 rounded-md bg-transparent`
                            : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
                        }
                        {...register('password_confirmation')}
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
                        Submit
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
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}

export default Users;
