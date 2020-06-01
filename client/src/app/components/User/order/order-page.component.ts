import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../..//services/auth.service";
import { ProductService } from "../../../services/product.service";
import { CartService } from "../../../services/cart.service";
import { FormGroup } from "@angular/forms";
import * as data from "../../../../assets/cities.json";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-order-page",
  templateUrl: "./order-page.component.html",
  styleUrls: ["./order-page.component.css"]
})
export class OrderPageComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  orderForm: FormGroup;
  cities = data["default"];
  dateError = false;

  city;
  street;

  ngOnInit() {
    this.city = this.authService.user["city"];
    this.street = this.authService.user["street"];
  }

  cancelOrder() {
    this.cartService.isOrdered = false;
  }

  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  onOrderSubmit(orderForm) {
    const { city, street, creditcard } = orderForm.value;

    const dateToShip = this.convert(orderForm.value.date);

    this.orderService
      .orderSubmit(
        { city, street, creditcard, dateToShip },
        this.authService.user["_id"],
        this.cartService.cart["_id"],
        this.cartService.totalPrice
      )
      .subscribe(
        res => {
          this.productService.getActive = false;
          this.productService.activeCategory = null;
          this.productService.products = [];
          this.cartService.isOrdered = false;
          this.orderService.orderSubmitted = true;
        },
        err => {
          this.dateError = true;
        }
      );
  }
}
