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
    password: "$2b$10$h.UxSp7TfI2qmtq/zQjixeObdi7KrR2rltRz6b9hQ4c74dCSpFyqG",
    roles: ["user"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "test-admin-1",
    emailAddress: "testadmin1@example.com",
    password: "$2b$10$gLk9vZ57FaRwUTjDz1Ien.pfYZ0UEPek6xKbinvEmeXKNBxGi1tqS",
    roles: ["user", "admin"],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    username: "testUser2",
    emailAddress: "testuser2@example.com",
    password: "$2b$10$mqYIbZMWRdTUcLNkTNm2R.iD.fkvwtpBA7gpgx9ZN7MWrS.oU8hM2",
    roles: ["user"],
  },
];
