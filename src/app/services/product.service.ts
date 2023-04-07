import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    storage = window.localStorage;
    apiUrl = 'http://localhost:4200/assets/data.json';

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getProduct(pid: number): Observable<Product> {
        return this.getProducts().pipe(
            map((products: Product[]) => products.find(product => product.id == pid)!)
        );
    }

    getCart(): Product[] | [] {
        const cartItems = this.storage.getItem('cart');
        return cartItems? JSON.parse(cartItems) : [];
    }

    setCart(cartItems: Product[] | []): void {
        this.storage.setItem('cart', JSON.stringify(cartItems));
        console.log(this.storage.getItem('cart'));
    }

    addToCart(product: Product): void {
        var cartItems: Product[] = this.getCart();
        var foundIndex = cartItems.findIndex(item => item.id == product.id);
        if (foundIndex >= 0 && product.quantity) {
            cartItems[foundIndex].quantity = cartItems[foundIndex].quantity ? 
                cartItems[foundIndex].quantity as number + product.quantity as number :
                product.quantity as number;
        }
        else {
            cartItems.push(product);
        }
        this.setCart(cartItems);
        alert("Item added to cart.");
    }

    removeFromCart(id: number): void {
        var cartItems: Product[] = this.getCart();
        if (id >= 0 && id < cartItems.length) {
            cartItems.splice(id, 1);
            this.setCart(cartItems);
            alert("Item removed to cart.");
        }
    }

    emptyStorage(): void {
        this.storage.clear();
    }

    updateQuantity(id: number, quantity: number): void {
        var cartItems: Product[] = this.getCart();
        if (id >= 0 && id < cartItems.length) {
            cartItems[id].quantity = quantity;
        }
        this.setCart(cartItems);
    }

    setOrder(order: Order) {
        this.storage.setItem('order', JSON.stringify(order));
        console.log(this.storage.getItem('order'));
    }

    getOrder(): Order | null {
        const order = this.storage.getItem('order');
        if (order != null) this.emptyStorage();
        return order? JSON.parse(order) : null;
    }
}
