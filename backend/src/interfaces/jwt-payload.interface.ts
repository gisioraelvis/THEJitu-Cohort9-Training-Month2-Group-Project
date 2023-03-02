export interface IJWTPayload {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}
