import mongoose from "mongoose";

export const submissions = [
  {
    username: "test-user-1",
    emailAddress: "testuser1@example.com",
    password: "password@1234",
  },
  {
    username: "test-admin-1",
    emailAddress: "testadmin1@example.com",
    password: "admin$1234",
  },
  {
    username: "testUser2",
    emailAddress: "testuser2@example.com",
    password: "user2*000",
  },
];

export const documents = [
  {
    _id: new mongoose.Types.ObjectId(),
    username: "test-user-1",
    emailAddress: "testuser1@example.com",
    password: "hashedPassword1",
    roles: ["user"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "test-admin-1",
    emailAddress: "testadmin1@example.com",
    password: "hashedPassword2",
    roles: ["user", "admin"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "testUser2",
    emailAddress: "testuser2@example.com",
    password: "hashedPassword3",
    roles: ["user"],
  },
];
