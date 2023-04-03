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
    productCount: string[] = ['1', '2', '3', '4', '5'];

    constructor(private productService: ProductService) {}

    ngOnInit(): void {}

}
