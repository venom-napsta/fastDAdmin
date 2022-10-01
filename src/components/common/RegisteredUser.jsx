import React from 'react';
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
  AiOutlineUserAdd,
} from 'react-icons/ai';

function RegisteredUser({ registeredUser }) {
  return (
    <>
      <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
        <div className="text-[#010080] text-center text-xl font-medium">
          Recently Created User Details
        </div>
      </div>
      {/*body*/}
      <div className="relative p-3 flex-auto">
        <div className="w-full mb-2 my-2 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
          <p>
            User : {registeredUser.data.firstname}{' '}
            {registeredUser.data.lastname}
          </p>
          <AiOutlineUserAdd className="absolute right-3 top-5 text-gray-400" />
        </div>
        <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
          <p>Email: {registeredUser.data.email}</p>

          <AiOutlineUser className="absolute right-3 top-5 text-gray-400" />
        </div>
        <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
          <p>Contact Number: {registeredUser.data.contact}</p>

          <AiOutlineMail className="absolute right-3 top-5 text-gray-400" />
        </div>
        <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
          <p>Role: {registeredUser.data.role}</p>

          <AiOutlinePhone className="absolute right-3 top-5 text-gray-400 mb-3" />
        </div>
        {/* <div className="flex items-start my-3 border-t-2 border-solid border-slate-200 rounded-t" /> */}
      </div>
    </>
  );
}

export default RegisteredUser;
