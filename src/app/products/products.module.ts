import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductItemDetailComponent } from './product-item-detail/product-item-detail.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
    declarations: [
        ProductItemDetailComponent,
        ProductItemComponent,
        ProductListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ProductsModule { }
