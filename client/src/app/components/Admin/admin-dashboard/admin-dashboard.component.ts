import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.component.html",
  styleUrls: ["./admin-dashboard.component.css"]
})
export class AdminDashboardComponent implements OnInit {
  constructor(private productService: ProductService) {}
  product;

  ngOnInit() {
    this.productService.getCategories();
    this.productService.headers = new HttpHeaders().set(
      "token",
      localStorage.getItem("token")
    );
    this.productService.searchable = true;
  }
}
