const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("Authentication error");
    },

   
  },
  Mutation: {
    addUser: async (
      parent,
      { username, email, password, firstName, lastName }
    ) => {
      try {
        const user = await User.create({
          username,
          email,
          password,
          firstName,
          lastName,
        });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        // Handle the error here, e.g., log it or return an error message.
        throw new Error("An error occurred while creating a user.");
      }
    },

    updateUser: async (
      parent,
      { firstName, lastName, username, email, profilePic },
      context) => {
        if (context.user){
          const contextUserId = context.user._id;

          const updatedUser = await User.findOneAndUpdate(
            { _id: contextUserId },
            { firstName, lastName, username, email, profilePic },
            { new: true }
        );
        return  updatedUser ;
      } else {
        throw new Error("Error updating user");
      }
    },

    deleteUser: async (parent, { username }, context) => {
      const contextUserId = context.user._id;
      try {
        const deletedUser = await User.findOneAndDelete({ _id: contextUserId });
        console.log("deletedUser", deletedUser);
        console.log("contextUserId", contextUserId);
        return { deletedUser };
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new Error("Error deleting user");
      }
    },

    login: async (parent, { username, password }) => {

      const user = await User.findOne({ username });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },

   
};

module.exports = resolvers;
