import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Product } from '../../models/product';
import { Order } from '../../models/order';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: Product[] = [];
    totalPrice: string = '';
    fullName: string = '';
    address: string = '';
    cc: number | string = '';

    constructor(private router: Router, private productService: ProductService) { }

    ngOnInit() {
        this.cartItems = this.productService.getCart();
        this.totalPrice = this.calculateTotal().toFixed(2);
    }

    calculateTotal():number {
        let total:number = 0;
        total = this.cartItems.reduce((accumulator, item) => {
            const quantity: number = parseInt(item.quantity as unknown as string);
            const itemPrice: number = parseFloat((item.price * quantity).toFixed(2));
            const newPrice: number = parseFloat((accumulator + itemPrice).toFixed(2));
            total = newPrice;
            return total;
        }, 0); 
        return total;
    }

    updateQuantity(id: number, event: Event): void {
        const quantity = (event.target as HTMLInputElement).value as unknown as number;
        if (quantity > 0) {
            this.productService.updateQuantity(id, quantity);
            this.ngOnInit();
        }
    }

    removeFromCart(id: number): void {
        this.productService.removeFromCart(id);
        this.ngOnInit();
    }

    clearCart(): void {
        this.productService.emptyStorage();
    }

    onSubmit(): void {
        const order: Order = {
            fullName: this.fullName,
            address: this.address,
            cc: this.cc as string,
            totalPrice: this.totalPrice,
            cartItems: this.cartItems
        };

        this.productService.setOrder(order);
        this.router.navigate(['/success']);
    }
}
