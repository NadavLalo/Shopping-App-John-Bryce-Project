import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class OrderService {
  constructor(private http: HttpClient) {}
  headers;
  orderSubmitted = false;

  getNumberOfOrders() {
    return this.http.get<[]>("http://localhost:3000/order");
  }

  orderSubmit(shippingAddress, userId, cart, totalPrice) {
    return this.http.post(
      "http://localhost:3000/order",
      {
        shippingAddress,
        cart,
        totalPrice: totalPrice,
        user: userId
      },
      { headers: this.headers }
    );
  }
}
