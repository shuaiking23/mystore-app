# MystoreApp

This project was generated with [Angular CLI]

MyStore is a simple product order application.

## Navigation

### Product List

[/]

View a list of products
Click into a product to view more details
Add product to cart

### Product Details

[/product/:id]

Provide more description of the selected product
Add prouduct to cart

### Cart

[/cart]

View a list of products added to cart
Alter the quantity of products in cart
View Total price of products in cart
Remove product from cart
Clear cart
Fill in order information and submit order

### Success

[/success]

Confirmation of successful order

## Specification

Angular CLI: 15.2.4
Node: 18.15.0 
Package Manager: npm 9.6.3

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.

## Notes

`ngModelChange` is not explicitly used because there is no necessity for additional change event for the requirement of this application.

Besides, 

* DOM event (change) has not been used
* In my understanding, e.g. `[(ngModel)]="fullName"` used is implicitly interpreted by Angular as `[ngModel]="email" (ngModelChange)="fullName = $event"`. This is the shorthand method for a combination of component property binding and event binding.
