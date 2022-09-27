const logger = (state) => (next) => (action) => {
  console.log('Toastify:', action.payload.message);
};

export default logger;
