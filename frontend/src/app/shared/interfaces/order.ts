export interface IOrderItem {
  id: number;
  userId: number;
  shippingAddress: string;
  paymentMethod: string;
  paymentResultId: string;
  paymentResultStatus: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
  createdAt: string;
  updatedAt: string;
}
