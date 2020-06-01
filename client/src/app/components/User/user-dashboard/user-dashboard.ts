import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../services/product.service";
import { CartService } from "../../../services/cart.service";
import { AuthService } from "../../../services/auth.service";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.css"]
})
export class UserDashboard implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.productService.searchable = true;
    this.productService.getCategories();
  }
}
