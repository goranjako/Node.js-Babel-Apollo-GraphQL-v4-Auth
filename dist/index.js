"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _server = require("@apollo/server");
var _express = require("@apollo/server/express4");
var _drainHttpServer = require("@apollo/server/plugin/drainHttpServer");
var _http = _interopRequireDefault(require("http"));
var _cors = _interopRequireDefault(require("cors"));
var _compression = _interopRequireDefault(require("compression"));
var _express2 = _interopRequireDefault(require("express"));
var _helmet = _interopRequireDefault(require("helmet"));
var _xssClean = _interopRequireDefault(require("xss-clean"));
var _hpp = _interopRequireDefault(require("hpp"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _resolvers = _interopRequireDefault(require("./grapql/resolvers"));
var _shemas = _interopRequireDefault(require("./grapql/shemas"));
var _db = require("./config/db");
var _expressRateLimit = _interopRequireDefault(require("express-rate-limit"));
// npm install @apollo/server express graphql cors body-parser

// Required logic for integrating with Express
const app = (0, _express2.default)();
const corsOption = {
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["x-auth-token"]
};
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = _http.default.createServer(app);
const serverStart = async () => {
  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const server = new _server.ApolloServer({
    typeDefs: _shemas.default,
    resolvers: _resolvers.default,
    plugins: [(0, _drainHttpServer.ApolloServerPluginDrainHttpServer)({
      httpServer
    })]
  });
  // Ensure we wait for our server to start
  await server.start();
  const rootResolveFunction = (parent, args, context, info) => {
    //perform action before any other resolvers
  };
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  app.use('/graphql', (0, _cors.default)(corsOption), _bodyParser.default.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  (0, _express.expressMiddleware)(server, {
    context: req => ({
      req
    })
  }));
  app.use((0, _helmet.default)()); // Set security headers
  app.use((0, _xssClean.default)()); // Prevent xss attacks
  app.use((0, _hpp.default)()); // Prevent http param polution
  app.use((0, _compression.default)());
  // Rate limiting
  const limiter = (0, _expressRateLimit.default)({
    windowMs: 10 * 60 * 1000,
    // 10 minuates
    max: 100 // 100 requests
  });

  app.use(limiter);
  // Catch all route
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Not a valid route"
    });
  });
  // Modified server startup
  await new Promise(resolve => httpServer.listen({
    port: 4000
  }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
  (0, _db.connectDB)();
};
serverStart();