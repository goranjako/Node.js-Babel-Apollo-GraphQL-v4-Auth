"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.user = exports.signUp = exports.signIn = void 0;
var yup = _interopRequireWildcard(require("yup"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * USER MODEL Validation Rules
 */

const fullName = yup.string().required('Username is required.').trim().min(5, 'Username should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.').matches(/^\w+$/, 'Should be alphanumeric.');
const password = yup.string().required('password is required.').min(3, 'password should have atleast 5 characters.').max(20, 'Username should have atmost 10 characters.');
const email = yup.string().required('Email is required.').trim().email('This is invalid email.');
const userId = yup.string().required('userId is required.');
const item = yup.string().required('item is required.');

// User Registeration Validation Schema
const signUp = yup.object().shape({
  email,
  fullName,
  password
});
exports.signUp = signUp;
const signIn = yup.object().shape({
  email,
  password
});
exports.signIn = signIn;
const user = yup.object().shape({
  userId,
  item
});
exports.user = user;