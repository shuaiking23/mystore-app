import { Product } from './product';

export interface Order {
    fullName: string,
    address: string,
    cc: string,
    totalPrice: string,
    cartItems: Product[]
} 