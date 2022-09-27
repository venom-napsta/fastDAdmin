// import { Spinner } from 'flowbite-react/lib/cjs/components/Spinner';
// import React, { Fragment, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import {
//   userSelector,
//   fetchUserBytoken,
//   clearState,
// } from './features/slice/userSlice';

// const HomTest = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isFetching, isError } = useSelector(userSelector);
//   useEffect(() => {
//     dispatch(fetchUserBytoken({ token: localStorage.getItem('token') }));
//   }, []);

//   const { username, email } = useSelector(userSelector);

//   useEffect(() => {
//     if (isError) {
//       dispatch(clearState());
//       navigate('/login');
//     }
//   }, [isError]);

//   const onLogOut = () => {
//     localStorage.removeItem('token');

//     navigate('/login');
//   };

//   return (
//     <div>
//       <div className="container mx-auto">
//         {isFetching ? (
//           <Spinner aria-label="Extra large spinner example" size="xl" />
//         ) : (
//           <Fragment>
//             <div className="container mx-auto">
//               Welcome back <h3>{username}</h3>
//             </div>

//             <button
//               onClick={onLogOut}
//               className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Log Out
//             </button>
//           </Fragment>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomTest;

import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import { loginStatusChange } from './features/slice/authSlice';

import { Button } from 'flowbite-react/lib/cjs/components/Button';

const HomTest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthD, loading, error } = useSelector((state) => state.user);

  try {
    dispatch(loginStatusChange(false));
    navigate('/login', { replace: true });
  } catch (error) {
    if (error.response && error.response.status === 400) {
    }
    console.log('Response Error:', error.message);
  }

  // useEffect(() => {
  //   if (!isAuthD) {
  //     navigate('/login');
  //   }
  // }, [isAuthD, user, loading, error, navigate]);
  return (
    <div>
      <div>Username</div>
      <Button
        onClick={() => dispatch(loginStatusChange(false))}
        title="logout"
      />
    </div>
  );
};

export default HomTest;
