const app = require('./app');
const http = require("http");
const config = require('./utils/config')
const logger = require("./utils/logger");

const server = http.createServer(app)

// Defining a logger
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
