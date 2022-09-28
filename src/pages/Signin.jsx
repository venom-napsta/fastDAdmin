import React, { useEffect } from 'react';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';

/* Form Validation and handling */
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSelector, useDispatch } from 'react-redux';

import { useHistory } from 'react-router-dom';

import { login, loginStatusChange } from '../features/slice/authSlice';
// import auth from '../services/authService';

import logo from '../assets/Logo.png';

function Signin() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user, isAuthD, loading, error } = useSelector((state) => state.auth);

  const schema = yup.object().shape({
    email: yup.string().email().required(),
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
    console.log('sign in details', data);
    // auth.login(data.email, data.password);
    // dispatch(login(data));
    dispatch(loginStatusChange(true));
    history.replace('/dashboard');
    reset();
  };
  // console.log("form err", errors);

  useEffect(() => {
    if (isAuthD) {
      console.log('User Logged In', user);
      // <Redirect to={'/dashboard'} />;
      history.replace('/dashboard');
      // window.location.pathname = '/dashboard';
    }

    // if(isAuthD) &&<Redirect to={'/dashboard'} />;
  }, [isAuthD, user, loading, error, history]);

  return (
    <div className="mx-auto flex min-h-screen w-full items-center justify-center bg-[#f3f3f3]">
      {/* component */}
      <div className="px-5 flex w-[35rem] flex-col space-y-10 ">
        <div className="items-center w-90 h-70 sidebar__logo">
          <img src={logo} alt="company logo" />
        </div>
        {/* sm:w-[50vw] */}
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="text-[#010080] text-center text-4xl font-medium">
            Login
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
            <small className="text-red-600">{errors.email?.message}</small>
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

          {error && <p className="text-red-600 mb-5">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="button w-full transform rounded-md bg-[#010080] py-2 font-bold duration-300 hover:text-[#FF6D1C]"
          >
            LOG IN
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signin;
