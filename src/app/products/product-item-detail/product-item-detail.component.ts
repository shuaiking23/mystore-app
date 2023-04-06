import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-product-item-detail',
    templateUrl: './product-item-detail.component.html',
    styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {
    pid!: number;
    product!: Product;
    productCount: number[] = Array.from({length: 10}, (_, i) => i + 1);
    quantity: number = 1;

    constructor(private route: ActivatedRoute, private productService: ProductService) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.pid = Number(params.get('id'));
        });

        if (this.pid) {
            this.productService.getProduct(this.pid)
                .subscribe({
                    next: (data) => {
                        this.product = data;
                    },
                    error: (err) => console.log(err)
            });
        }
    }

    addToCart(product: Product): void {
        product.quantity = this.quantity as number;
        this.productService.addToCart(product);
    }
}
