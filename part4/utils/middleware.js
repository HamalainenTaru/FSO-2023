const { info, error } = require("./logger");

const requestLogger = (request, response, next) => {
  info("Method:", request.method);
  info("Path:", request.path);
  info("Body:", request.body);
  info("---");
  next();
};

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, request, response, next) => {
  error(err.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

module.exports = {
  requestLogger,
  unknownEndPoint,
  errorHandler,
};
