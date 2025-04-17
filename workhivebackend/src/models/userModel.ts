export interface User {
  email: string;
  password: string;
  otp?: string;
  name?: string;
  profilePicture?: string;
}

export const users: User[] = [];
