import { Observable } from "rxjs"

export interface IOrder {
  id: number;
  userId: number;
  shippingAddress:string;
  paymentMethod:string;
  paymentResultId:string;
  paymentResultStatus:string;
  taxPrice:number;
  shippingPrice:number;
  totalPrice:number;
  isPaid:string;
  paidAt:string;
  isDelivered:string;
  deliveredAt:string;
  createdAt?:string;
  updatedAt?:string;
  JWT:string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword:string;
  isDeleted?: boolean;
  isAdmin: boolean;
}

export interface Profile {
  name: string;
  email: string;
  // password: string;
} 

export interface CanDeactivateComponent {
  canDeactive: () => Promise<boolean> | Observable<boolean> | boolean
}