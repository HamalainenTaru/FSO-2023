const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("body:", request.body);
  console.log("-----------------");
  next();
};

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

module.exports = { requestLogger, unknownEndPoint };
