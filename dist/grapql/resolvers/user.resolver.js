"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _bcryptNodejs = _interopRequireDefault(require("bcrypt-nodejs"));
var _users = _interopRequireDefault(require("../../models/users"));
var _graphql = require("graphql");
var _auth = _interopRequireDefault(require("../../config/auth"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _verify = require("../../config/verify");
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv.default.config();
var _default = {
  Query: {
    //getById
    userId: async (parent, args, {
      req
    }) => {
      await (0, _auth.default)(req);
      try {
        const user = await _users.default.findById({
          _id: args.id
        });
        return user;
      } catch (error) {
        throw new _graphql.GraphQLError("User not found");
      }
    },
    //getAll
    users: async (parent, args, {
      req
    }) => {
      await (0, _auth.default)(req);
      try {
        const user = await _users.default.find({});
        return user;
      } catch (error) {
        throw new _graphql.GraphQLError("User not found");
      }
    },
    //Login
    login: async (paren, {
      input
    }) => {
      await _verify.signIn.validate(input, {
        abortEarly: false
      });
      try {
        const user = await _users.default.findOne({
          email: input.email
        });
        if (!user) {
          throw new _graphql.GraphQLError("User  not found");
        }
        const isEqual = await _bcryptNodejs.default.compareSync(input.password, user.password);
        if (!isEqual) {
          throw new error("Wrong credentials!");
        }
        const token = _jsonwebtoken.default.sign({
          user
        }, process.env.SECRET_TOKEN, {
          expiresIn: 60 * 60
        });
        return {
          token
        };
      } catch (error) {
        throw error;
      }
    }
  },
  Mutation: {
    //Register
    register: async (paren, {
      input
    }) => {
      await _verify.signUp.validate(input, {
        abortEarly: false
      });
      try {
        const user = await _users.default.findOne({
          email: input.email
        });
        if (user) {
          throw new _graphql.GraphQLError("User already Exists");
        }
        let newUser = new _users.default({
          fullName: input.fullName,
          email: input.email,
          password: input.password
        });
        const saveduser = await newUser.save();
        const token = _jsonwebtoken.default.sign({
          saveduser
        }, process.env.SECRET_TOKEN, {
          expiresIn: 60 * 60
        });
        return {
          token
        };
      } catch (error) {
        throw error;
      }
    }
  }
};
exports.default = _default;