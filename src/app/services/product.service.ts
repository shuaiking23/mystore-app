import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Product } from '../models/product';

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

    getProduct(pid: number): Observable<Product> | null {
        const found: Observable<Product> = this.getProducts().pipe(
            map((products: Product[]) => products.find(product => product.id == pid)!)
        );
        return found ? found : null;
    }

    addToCart(product: Product): void {
        var cartItems: Product[] = JSON.parse(this.storage.getItem('cart') as string) || [];
        var foundIndex = cartItems.findIndex(item => item.id == product.id);
        if (foundIndex >= 0 && product.quantity) {
            cartItems[foundIndex].quantity = cartItems[foundIndex].quantity ? 
                cartItems[foundIndex].quantity as number + product.quantity as number :
                product.quantity as number;
        }
        else {
            cartItems.push(product);
        }
        this.storage.setItem('cart', JSON.stringify(cartItems));
        console.log(this.storage.getItem('cart'));
    }

    getCart(): Product[] | [] {
        const cartItems = this.storage.getItem('cart');
        return cartItems? JSON.parse(cartItems) : [];
    }

    removeFromCart(pid: number): void {
        var cartItems: Product[] = JSON.parse(this.storage.getItem('cart') as string) || [];
        var foundIndex = cartItems.findIndex(item => item.id == pid);
        if (foundIndex >= 0) {
            delete cartItems[foundIndex];
            this.storage.setItem('cart', JSON.stringify(cartItems));
        }
    }

    emptyCart(): void {
        this.storage.clear();
    }
}
