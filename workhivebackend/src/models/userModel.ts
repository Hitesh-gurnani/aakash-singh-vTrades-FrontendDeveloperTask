export interface User {
  email: string;
  password: string;
  otp?: string;
}

export const users: User[] = [];
