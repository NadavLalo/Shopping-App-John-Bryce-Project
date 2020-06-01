import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { CartService } from "../../../services/cart.service";
import { ProductService } from "../../../services/product.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { NewProductComponent } from "../../Admin/new-product/new-product.component";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    public dialog: MatDialog
  ) {}

  panelOpenState = false;

  ngOnInit() {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewProductComponent, {
      width: "400px",
      autoFocus: false
    });
  }

  onLogOut() {
    this.authService.logOut();
    this.cartService.logOut();
    this.productService.logOut();
    this.router.navigate([""]);
  }

  onSearch(form) {
    this.productService.searchProduct(form.value.searchInput);
    form.reset();
  }

  userCartSearch(filter) {
    this.cartService.dataSource.filterPredicate = function(
      data,
      filter: string
    ) {
      return data.product.name
        .toLowerCase()
        .includes(filter.toLocaleLowerCase());
    };
    this.cartService.dataSource.filter = filter;
  }

  resetInput(form) {
    form.reset();
  }

  toggleSideBar() {
    this.panelOpenState = !this.panelOpenState;
  }
}
