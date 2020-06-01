import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.service";
import { AuthService } from "../../../services/auth.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"]
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  displayedColumns: string[] = ["product", "amount", "price", "img", "delete"];

  ngOnInit() {}

  onProductRemoveFromCart(product) {
    this.cartService.removeProductFromCart(product);
  }

  onOrderClick() {
    this.cartService.isOrdered = true;
  }
}
