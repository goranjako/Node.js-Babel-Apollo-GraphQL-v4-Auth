import * as yup from 'yup';

/**
 * USER MODEL Validation Rules
 */

const fullName = yup
    .string()
    .required('Username is required.')
    .trim()
    .min(5, 'Username should have atleast 5 characters.')
    .max(20, 'Username should have atmost 10 characters.')
    .matches(/^\w+$/, 'Should be alphanumeric.')
    
    const password = yup
    .string()
    .required('password is required.')
    .min(3, 'password should have atleast 5 characters.')
    .max(20, 'Username should have atmost 10 characters.')
    

const email = yup
    .string()
    .required('Email is required.')
    .trim()
    .email('This is invalid email.')
    
  const userId= yup
  .string()
  .required('userId is required.')
  const item= yup
  .string()
  .required('item is required.')
  
  


// User Registeration Validation Schema
export const signUp = yup.object().shape({
     email,
    fullName,
    password
});

export const signIn = yup.object().shape({
  email,
  password
});

export const user = yup.object().shape({
   userId,
   item
});

