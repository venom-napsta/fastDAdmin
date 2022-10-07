import React, { useEffect } from 'react';
import { AiFillLock, AiOutlinePhone } from 'react-icons/ai';

/* Form Validation and handling */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { login } from '../features/slice/authSlice';
// import auth from '../services/authService';

import logo from '../assets/Logo.png';
import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
import { toast } from 'react-toastify';

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    userInfo,
    userToken,

    loading,
    error: loginErr,
  } = useSelector((state) => state.auth);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const schema = yup.object().shape({
    contact: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid.')
      .min(9)
      .max(15)
      .required(),
    password: yup.string().min(6).max(32).required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  /* Form Sublmision */
  const onSubmitHandler = async (data) => {
    // const { contact: phone_number, password } = data;
    console.log('sign in details', data);
    dispatch(login(data));

    // auth.login(data.email, data.password);
    // dispatch(loginStatusChange(true));
    // history.replace('/dashboard');
    reset();
  };

  useEffect(() => {
    if (loginErr) {
      console.log('login err');
    }

    if (userToken) {
      console.log('User Logged In', userInfo);
      history.push('/');
    }
  }, [loginErr, userInfo, history, userToken]);

  return (
    <div className="mx-auto py-10 flex items-center justify-center ">
      {/* component */}
      <div className="px-5 w-[35rem] items-center mt-8 justify-center flex-col space-y-10 ">
        <img
          src={logo}
          className="px-5 items-center justify-center "
          alt="company logo"
        />
        {/* <div className="items-center w-100 h-80 sidebar__logo"></div> */}

        <form autoComplete="off" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="text-[#010080] text-center text-4xl font-medium">
            Login
          </div>
          <div className="w-full mb-6 my-4 transform bg-transparent text-lg duration-200 focus-within:rounded-md">
            <input
              name="contact"
              className={
                !errors.contact
                  ? `w-full h-14 border-1 rounded-md bg-transparent`
                  : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
              }
              placeholder="Contact Number e.g 000000001"
              type="text"
              required
              {...register('contact')}
            />
            <AiOutlinePhone className="absolute right-3 top-5 text-gray-400" />
            <small className="text-red-600">{errors.contact?.message}</small>
          </div>
          <div className="w-full mb-6 transform bg-transparent text-lg duration-200 focus-within:border-[bg-primary]">
            <input
              type="password"
              required
              {...register('password')}
              placeholder="Password"
              className={
                !errors.password
                  ? `w-full h-14 border-1 rounded-md bg-transparent`
                  : `w-full h-14 border-1 border-red-600 rounded-md bg-transparent`
              }
            />
            <AiFillLock className="absolute right-3 top-5 text-gray-400" />
            <small className="text-red-600">{errors.password?.message}</small>
          </div>

          {loginErr && <p className="text-red-600 mb-5">{loginErr}</p>}
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
    </div>
  );
}

export default Signin;
