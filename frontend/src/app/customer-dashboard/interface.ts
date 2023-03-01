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

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  isDeleted?: boolean;
  isAdmin: boolean;
}
