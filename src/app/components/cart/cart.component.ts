import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: Product[] = [];
    totalPrice: string = '';
    fullName: string='';
    address: string='';
    cc: number | string = '';

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.cartItems = this.productService.getCart();
        this.totalPrice = this.calculateTotal().toFixed(2);
    }

    calculateTotal() {
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

    updateQuantity(id: number, event: Event) {
        const quantity = (event.target as HTMLInputElement).value as unknown as number;
        if (quantity > 0) {
            this.productService.updateQuantity(id, quantity);
            this.ngOnInit();
        }
    }

    removeFromCart(id: number) {
        this.productService.removeFromCart(id);
        this.ngOnInit();
    }

    clearCart() {
        this.productService.emptyCart();
    }
}
