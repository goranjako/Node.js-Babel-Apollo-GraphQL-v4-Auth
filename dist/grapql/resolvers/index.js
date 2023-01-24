"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _user = _interopRequireDefault(require("./user.resolver"));
module.exports = {
  // modifier - the name of the type, and each time ANY mutation or subscription that returns a post, it will go through this modifier and apply these modifications

  Query: {
    ..._user.default.Query
  },
  Mutation: {
    ..._user.default.Mutation
  }
};