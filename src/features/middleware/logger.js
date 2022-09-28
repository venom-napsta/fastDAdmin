const logger = (state) => (next) => (action) => {
  console.log('Toastify Logger');
  // console.log('Toastify Logger:', action.payload.message);
  next();
};

export default logger;
