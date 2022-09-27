// import Raven from 'raven-js';

function init() {
  // Raven.config()
  console.log("Logger initialised");
}

function log(error) {
  // Raven.captureException(error);
  console.log("Error captured", error);
}
const logger = {
  init,
  log,
};
export default logger;
