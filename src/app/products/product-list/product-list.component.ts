import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts()
            .subscribe({
                next: (data) => {
                    this.products = data;
                },
                error: (err) => console.log(err)
        });
    }

    addProduct(product: Product){
        this.productService.addToCart(product);
    }
}
