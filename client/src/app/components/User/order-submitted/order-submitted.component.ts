import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { CartService } from "src/app/services/cart.service";
import { OrderService } from "src/app/services/order.service";
import { ProductService } from "src/app/services/product.service";
@Component({
  selector: "app-order-submitted",
  templateUrl: "./order-submitted.component.html",
  styleUrls: ["./order-submitted.component.css"]
})
export class OrderSubmittedComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  fileUrl;

  ngOnInit() {
    let data = "";
    this.cartService.cartItems.map(item => {
      return (data += `Product: ${item.product.name}, Amount: ${item.amount}, Price: ${item.price}$ \n`);
    });
    const blob = new Blob(
      [`${data}\nTotal Price: $${this.cartService.totalPrice}`],
      {
        type: "text/plain",
        endings: "native"
      }
    );
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }

  backToShop() {
    this.orderService.orderSubmitted = false;
    this.cartService.isOrdered = false;
    this.cartService.cart = {};
    this.cartService.cartItems = [];
    this.cartService.totalPrice = 0;
  }
}
