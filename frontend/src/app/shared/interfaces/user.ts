export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin?: boolean;
  JWT: string;
}

export interface Login {
  email: string;
  password: string;
  JWT: string;
  isAdmin?: boolean;
}

export interface IUserProfile {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}
