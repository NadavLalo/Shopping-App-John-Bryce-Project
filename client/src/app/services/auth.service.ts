import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as data from "../../assets/cities.json";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) { }
  user = {};
  error = false;
  isLogged = false;
  isAdmin = false;
  isLoading;
  cities = data;

  logIn(inputs) {
    this.http.post("http://localhost:3000/user/login", inputs).subscribe(
      res => {
        this.user = res;
        if (res.hasOwnProperty("accessToken")) {
          localStorage.setItem("token", res["accessToken"]);
          if (res["role"] === "Admin") {
            this.isAdminAction();
          } else if (res["role"] === "User") {
            this.isLogged = true;
          }
        }
      },
      err => {
        this.error = true;
      }
    );
  }

  stepOneSignUp(inputs) {
    return this.http.post("http://localhost:3000/user/steponesignup", inputs);
  }

  finalSignUp(signUpForm) {
    return this.http.post("http://localhost:3000/user/finalsignup", signUpForm);
  }

  isAdminAction() {
    this.isAdmin = true;
    this.router.navigate(["admin"]);
  }

  logOut() {
    localStorage.removeItem("token");
    this.isLogged = false;
    this.isAdmin = false;
    this.user = {};
  }

  verifyToken(token) {
    this.http
      .post("http://localhost:3000/user/auth", null, {
        headers: { token }
      })
      .subscribe(
        res => {
          this.user = res;
          if (res["role"] === "Admin") {
            this.isAdminAction();
          } else if (res["role"] === "User") {
            this.isLogged = true;
          }
        },
        err => {
          localStorage.removeItem("token");
        }
      );
    this.isLoading = false;
  }
}
