"use server";

import { collection, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export const postUser = async (payload) => {
  const { email, password, name } = payload;
  // check payload
  if (!email || !password) return null;
  // check user
  const isExist = await dbConnect(collection.Users).findOne({ email });
  if (isExist) {
    return null;
  }
  // create user
  const newUser = {
    providerId: "credentials",
    name,
    email,
    password: await bcrypt.hash(password, 14),
    role: "user",
  };
  // insert user
  const result = await dbConnect(collection.Users).insertOne(newUser);
  if (result.acknowledged) {
    return {
      ...result,
      insertedId: result.insertedId.toString(),
    };
  }
};

export const LoginUser = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) return null;

  const user = await dbConnect(collection.Users).findOne({ email });
  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    return user;
  } else {
    return null;
  }
};
