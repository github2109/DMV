const logger = require("./logger");
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization !== undefined) {
    if (authorization.toLowerCase().startsWith("bearer ")) {
      return authorization.substring(7);
    }
  }
  return null;
};
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ message: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ message: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      message: "invalid token",
    });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      message: "token expired",
    });
  }

  return response.status(500).json({ message: error.message });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
