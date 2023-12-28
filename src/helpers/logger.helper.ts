import morganBody from "morgan-body";
import winston from "winston";

const Logger = (app) => {
  const loggerStream = {
    write: (message) => {
      console.log(message);
    },
  };

  morganBody(app, {
    // @ts-expect-error
    stream: loggerStream,
    logRequestId: true,
    filterParameters: ["password"],
  });
};

const _log = console.log;
const _error = console.error;

console.error = function (log) {
  if (process.env.NODE_ENV === "production") {
    winston.error(log);
  }
  // eslint-disable-next-line prefer-rest-params
  _error.apply(console, arguments);
};

console.log = function (log) {
  if (process.env.NODE_ENV === "production") {
    winston.log(log);
  }
  // eslint-disable-next-line prefer-rest-params
  _log.apply(console, arguments);
};


export default Logger