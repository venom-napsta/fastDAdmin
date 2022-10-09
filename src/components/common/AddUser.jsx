import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

/* Form Validation and handling */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  AiFillLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUpload,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
import { registerUser } from '../../features/slice/authSlice';

function AddUser({ onClose, onSubmit }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const { registeredUser, loading, regErr } = useSelector(
    (state) => state.auth
  );

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    firstname: yup
      .string()
      .min(3, 'Minimum is 3 characters')
      .max(50)
      .required(),
    lastname: yup.string().min(3).max(50).required(),
    email: yup.string().email().required(),
    phone_number: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid.')
      .min(9)
      .max(15)
      .required(),
    password: yup.string().min(6).max(500).required(),
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
    console.log('Add User details', data);
    dispatch(registerUser(data));
    reset();
  };

  const [imgErr, setImgErr] = useState('');

  const onChangeFile = (event) => {
    const image = event.target.files[0];
    if (!image) {
      console.log('image is required');
      return false;
    }
    if (!image.name.match(/\.(jpg|jpeg|png)$/)) {
      console.log('select valid image.');
      setImgErr('Please Select Valid Image');
      return false;
    }
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-7/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
              <div className="text-[#010080] text-center text-xl font-medium">
                Add New User
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
              <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    name="firstname"
                    className={
                      !errors.firstname
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Firstname"
                    type="text"
                    required
                    {...register('firstname')}
                  />
                  <AiOutlineUserAdd className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    name="lastname"
                    className={
                      !errors.lastname
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Last Name"
                    type="text"
                    required
                    {...register('lastname')}
                  />
                  <AiOutlineUser className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    name="email"
                    className={
                      !errors.email
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Email"
                    type="email"
                    required
                    {...register('email')}
                  />
                  <AiOutlineMail className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    name="phone_number"
                    className={
                      !errors.phone_number
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Phone Number e.g 000000001"
                    type="text"
                    required
                    {...register('phone_number')}
                  />
                  <AiOutlinePhone className="absolute right-3 top-5 text-gray-400" />
                  <small className="text-red-600">
                    {errors.phone_number?.message}
                  </small>
                </div>
                <div className="w-full border  rounded-md mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    type="file"
                    className=" rounded-md w-full"
                    onChange={onChangeFile}
                  />
                  <small className="text-red-600">{imgErr}</small>
                </div>
                <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                  <input
                    name="password"
                    type="password"
                    required
                    {...register('password')}
                    placeholder="Password"
                    className={
                      !errors.password
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                  />
                  <AiFillLock className="absolute right-3 top-5 text-gray-400" />
                  <small className="text-red-600">
                    {errors.password?.message}
                  </small>
                </div>
                <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                  <input
                    name="password_confirmation"
                    type="password"
                    required
                    {...register('password_confirmation')}
                    placeholder="Password Confirmation"
                    className={
                      !errors.password_confirmation
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                  />
                  <AiFillLock className="absolute right-3 top-5 text-gray-400" />
                  <small className="text-red-600">
                    {errors.password_confirmation?.message}
                  </small>
                </div>

                {regErr && (
                  <div
                    className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                    role="alert"
                  >
                    Registration Error: {regErr}
                  </div>
                )}
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
                    Register
                  </button>
                )}
              </form>
              {/* <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    className={
                      !errors.firstname
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Firstname"
                    type="text"
                    value={user.firstname}
                    required
                    {...register('firstname')}
                  />
                  <AiOutlineUserAdd className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    className={
                      !errors.lastname
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Last Name"
                    type="text"
                    value={user.lastname}
                    required
                    {...register('lastname')}
                  />
                  <AiOutlineUser className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    className={
                      !errors.email
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Email"
                    type="email"
                    value={user.email}
                    required
                    {...register('email')}
                  />
                  <AiOutlineMail className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    className={
                      !errors.phone_number
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="phone Number"
                    type="text"
                    value={user.phone_number}
                    required
                    {...register('phone_number')}
                  />
                  <AiOutlinePhone className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
                  <label htmlFor="approval_status">Approval Status:</label>
                  <select id="approval_status" name="approval_status">
                    <option defaultChecked value="approved">
                      Pending
                    </option>
                    <option value="pending">Approved</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="button w-full transform rounded-md bg-[#010080] py-2 font-normal duration-300 hover:text-[#FF6D1C]"
                >
                  Submit
                </button>
                {/* 
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
                )} *
              </form> */}
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
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
  );
}

export default AddUser;
