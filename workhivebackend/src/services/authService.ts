import { users, User } from "../models/userModel";

export const findUserByEmail = (email: string): User | undefined => {
  return users.find((user) => user.email === email);
};

export const createUser = (email: string, password: string): User => {
  const newUser: User = { email, password };
  users.push(newUser);
  return newUser;
};

export const updateUserPassword = (
  email: string,
  newPassword: string
): boolean => {
  const user = findUserByEmail(email);
  if (user) {
    user.password = newPassword;
    return true;
  }
  return false;
};

export const setOTP = (email: string, otp: string): boolean => {
  const user = findUserByEmail(email);
  if (user) {
    user.otp = otp;
    return true;
  }
  return false;
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const user = findUserByEmail(email);
  return user?.otp === otp;
};
