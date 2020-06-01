import { Component, OnInit } from "@angular/core";
import { CartService } from "../../../services/cart.service";
import { AuthService } from "../../../services/auth.service";
import { Router } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-logged-in",
  templateUrl: "./logged-in.component.html",
  styleUrls: ["./logged-in.component.css"]
})
export class LoggedInComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    const headers = new HttpHeaders().set(
      "token",
      localStorage.getItem("token")
    );
    this.cartService.headers = headers;
    this.orderService.headers = headers;
    this.cartService.isLoading = true;
    this.cartService.getCart(this.authService.user["_id"]);
  }

  onShoppingClick() {
    this.router.navigate(["/home"]);
  }
}
