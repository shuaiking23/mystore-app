import { Component, Input, OnInit } from '@angular/core';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-item',
    templateUrl: './product-item.component.html',
    styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
    @Input() product!: Product;
    productCount: number[] = Array.from({length: 5}, (_, i) => i + 1);
    quantity: number = 1;

    constructor(private productService: ProductService) {}

    ngOnInit(): void {}

    addToCart(product: Product): void {
        product.quantity = this.quantity as number;
        this.productService.addToCart(product);
    }

}
