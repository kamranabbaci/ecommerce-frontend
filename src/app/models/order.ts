import { OrderItem } from './order-item';

export interface Order {
  id?: number;
  userId?: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  totalAmount: number;
  orderStatus?: string;
  orderDate?: string;
  orderItems: OrderItem[];
}
