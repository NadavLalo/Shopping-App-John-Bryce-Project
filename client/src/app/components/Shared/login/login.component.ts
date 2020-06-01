import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { CartService } from "../../../services/cart.service";
import { ProductService } from "../../../services/product.service";
import { MatDialog } from "@angular/material/dialog";
import { SignupComponent } from "../../User/signup/signup.component";
import { OrderService } from "src/app/services/order.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  totalProducts;
  totalOrders;

  ngOnInit() {
    if (localStorage.getItem("token") !== null) {
      this.authService.isLoading = true;
      const token = localStorage.getItem("token");
      this.authService.verifyToken(token);
    }
    this.productService
      .getNumberOfProducts()
      .subscribe(
        totalProducts => (this.totalProducts = totalProducts["amount"])
      );
    this.orderService
      .getNumberOfOrders()
      .subscribe(totalOrders => (this.totalOrders = totalOrders["amount"]));
  }

  login(inputs) {
    this.authService.logIn(inputs.value);
  }

  handleChange() {
    this.authService.error = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: "400px",
      autoFocus: false
    });
  }
}
