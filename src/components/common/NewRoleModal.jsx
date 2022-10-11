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

function NewRoleModal({ onClose, onSubmit }) {
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
      <div className="justify-center items-center flex overflow-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-9/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
              <div className="text-[#010080] text-center text-xl font-medium">
                Add New User Role
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
                    name="roleName"
                    className={
                      !errors.firstname
                        ? `w-full h-12 border-1 rounded-md bg-transparent`
                        : `w-full h-12 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Role Name"
                    type="text"
                    required
                    {...register('roleName')}
                  />
                  <AiOutlineUserAdd className="absolute right-4 top-3 text-gray-400" />
                </div>
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <p className="mb-4">Permissions</p>

                  <label
                    for="default-toggle"
                    className="hover:text-gray-200 inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      id="default-toggle"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="mx-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Super Admin
                    </span>
                  </label>
                  <hr className="py-1" />
                  <label
                    for="checked-toggle"
                    className="inline-flex relative items-center  cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      id="checked-toggle"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="mx-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Sales Admin
                    </span>
                  </label>
                  <hr className="py-1" />

                  <label
                    for="inquiries"
                    className="inline-flex relative items-center mb-4 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value=""
                      id="inquiries"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className="mx-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Inquiries Admin
                    </span>
                  </label>
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

export default NewRoleModal;
