import React from 'react';
import { FaTimes } from 'react-icons/fa';

/* Form Validation and handling */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';

function EditModal({ onClose, driver: user, onSubmit }) {
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  /* Form Sublmision */
  const onSubmitHandler = async (data) => {
    console.log('Edit Driver details', data);
    reset();
  };

  console.log('Edit Modal', user);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-7/12 my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
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
              <form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
                <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
                  <input
                    className={
                      !errors.firstname
                        ? `w-full h-10 border-1 rounded-md bg-transparent`
                        : `w-full h-10 border-1 border-red-600 rounded-md bg-transparent`
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
                        ? `w-full h-10 border-1 rounded-md bg-transparent`
                        : `w-full h-10 border-1 border-red-600 rounded-md bg-transparent`
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
                        ? `w-full h-10 border-1 rounded-md bg-transparent`
                        : `w-full h-10 border-1 border-red-600 rounded-md bg-transparent`
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
                      !errors.contact
                        ? `w-full h-10 border-1 rounded-md bg-transparent`
                        : `w-full h-10 border-1 border-red-600 rounded-md bg-transparent`
                    }
                    placeholder="Contact Number"
                    type="text"
                    value={user.contact}
                    required
                    {...register('contact')}
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
                )} */}
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

export default EditModal;
