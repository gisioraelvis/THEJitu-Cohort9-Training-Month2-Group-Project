export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isDeleted?: boolean;
  isAdmin: boolean;
}
