
import bcrypt from "bcrypt-nodejs";
import User from '../../models/users';
import { GraphQLError } from 'graphql';
import authHeader from "../../config/auth";
import jwt from "jsonwebtoken";
import { signUp, signIn } from "../../config/verify";
import dotenv from "dotenv";
dotenv.config();

export default {
  Query: {
    //getById
    userId: async (parent, args, { req }) => {
      await authHeader(req);
      try {
        const user = await User.findById({ _id: args.id });
        return user;
      } catch (error) {
        throw new GraphQLError ("User not found");
      }
    },
    users: async (parent, args, { req }) => {
      await authHeader(req);
      try {
        const user = await User.find({});
        return user;
      } catch (error) {
        throw new GraphQLError ("User not found");
      }
    },
    //Login
    login: async (paren, { input }) => {
      await signIn.validate(input, { abortEarly: false });
      try {
        const user = await User.findOne({ email:input.email });
        if (!user) {
          throw new GraphQLError ("User  not found");
        }
        const isEqual = await bcrypt.compareSync(input.password, user.password);
        if (!isEqual) {
          throw new  error("Wrong credentials!");
        }
        const token = jwt.sign({ user }, process.env.SECRET_TOKEN, {
          expiresIn: 60 * 60,
        });
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
  Mutation: {
    //Register
    register: async (paren, { input }) => {
      await signUp.validate(input, { abortEarly: false });
      try {
        const user = await User.findOne({ email: input.email });
        if (user) {
          throw new GraphQLError ("User already Exists");
        }
        let newUser = new User({
          fullName: input.fullName,
          email: input.email,
          password: input.password,
        });
        const saveduser = await newUser.save();
        const token = jwt.sign({ saveduser }, process.env.SECRET_TOKEN, {
          expiresIn: 60 * 60,
        });
        return { token };
      } catch (error) {
        throw error;
      }
    },
  },
};
