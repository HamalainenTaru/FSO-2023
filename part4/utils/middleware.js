const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response) => {
  const { name } = error;

  switch (name) {
    case "CastError":
      return response.status(400).send({
        title: "Cast Error",
        message: "malformatted id",
        stackTrace: error.stack,
      });
    case "ValidationError":
      return response.status(400).json({
        title: "Validation Error",
        message: error.message,
        stackTrace: error.stack,
      });
    case "JsonWebTokenError":
      return response.status(400).json({
        title: "JsonWebTokenError",
        message: "token missing or invalid",
        stackTrace: error.stack,
      });
    case "TokenExpiredError":
      return response.status(400).json({
        title: "TokenExpiredError",
        message: "token expired",
        stackTrace: error.stack,
      });

    default:
      return response.status(500).send({
        title: "Internal Server Error",
        message: error.message,
        stackTrace: error.stack,
      });
  }
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };
