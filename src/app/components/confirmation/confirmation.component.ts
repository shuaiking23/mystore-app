import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Order } from '../../models/order';

import { ProductService } from '../../services/product.service';

@Component({
    selector: 'app-confirmation',
    templateUrl: './confirmation.component.html',
    styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
    order: Order | null = null;

    constructor(private router: Router, private productService: ProductService) { }

    ngOnInit(): void {
        this.order = this.productService.getOrder();

        if (this.order == null) {
            this.router.navigate(['/cart']);
        }
    }
}
