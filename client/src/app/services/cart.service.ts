import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from "@angular/material";

@Injectable({
  providedIn: "root"
})
export class CartService {
  constructor(private http: HttpClient) {}

  cart = {};
  isLoading = false;
  lastOrder;
  cartItems = [];
  dataSource = new MatTableDataSource(this.cartItems);
  totalPrice = 0;
  headers;
  fileUrl;

  isOrdered = false;

  getCart(_id) {
    this.http
      .get(`http://localhost:3000/cart?_id=${_id}`, { headers: this.headers })
      .subscribe(res => {
        console.log(res);
        this.cart = res["cart"];
        if (res["lastOrder"]) {
          this.lastOrder = res["lastOrder"];
        }
        if (res["cartItems"]) {
          this.cartItems = res["cartItems"];

          this.dataSource = new MatTableDataSource(this.cartItems);
          for (let i = 0; i < this.cartItems.length; i++) {
            this.totalPrice += this.cartItems[i].price;
          }
        }
        this.isLoading = false;
      });
  }

  addProductToCart(product, amount, userId) {
    this.http
      .post(
        `http://localhost:3000/cart?user=${userId}&cart=${this.cart["_id"]}`,
        {
          product,
          amount
        },
        { headers: this.headers }
      )
      .subscribe(res => {
        if (res["cart"]) {
          this.cart = res["cart"];
        }
        this.cartItems.push(res["newCartItem"]);
        this.dataSource = new MatTableDataSource(this.cartItems);
        this.totalPrice += res["newCartItem"].price;
      });
  }

  removeProductFromCart(item) {
    this.http
      .delete(
        `http://localhost:3000/cart?item=${item._id}&cart=${this.cart["_id"]}`,
        { headers: this.headers }
      )
      .subscribe(res => {
        let index;
        for (let i = 0; i < this.cartItems.length; i++) {
          if (res["_id"] === this.cartItems[i]._id) {
            index = i;
          }
        }
        this.totalPrice -= this.cartItems[index].price;
        const newCartItems = [...this.cartItems];
        newCartItems.splice(index, 1);
        this.cartItems = newCartItems;
        this.dataSource = new MatTableDataSource(this.cartItems);
      });
  }

  logOut() {
    this.isOrdered = false;
    this.cart = {};
    this.lastOrder = null;
    this.cartItems = [];
    this.totalPrice = 0;
  }
}
