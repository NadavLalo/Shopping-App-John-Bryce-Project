import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from "./material-module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/Shared/login/login.component";
import { NavbarComponent } from "./components/Shared/navbar/navbar.component";
import { AdminDashboardComponent } from "./components/Admin/admin-dashboard/admin-dashboard.component";
import { NewProductComponent } from "./components/Admin/new-product/new-product.component";
import { EditProductComponent } from "./components/Admin/edit-product/edit-product.component";
import { UserDashboard } from "./components/User/user-dashboard/user-dashboard";
import { SignupComponent } from "./components/User/signup/signup.component";
import { LoggedInComponent } from "./components/User/logged-in/logged-in.component";
import { ShoppingCartComponent } from "./components/User/shopping-cart/shopping-cart.component";
import {
  ProductsComponent,
  AmountModalComponent
} from "./components/Shared/products/products.component";
import { OrderPageComponent } from "./components/User/order/order-page.component";
import { OrderSubmittedComponent } from "./components/User/order-submitted/order-submitted.component";
import { CartService } from "./services/cart.service";
import { ProductService } from "./services/product.service";
import { AuthService } from "./services/auth.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { OrderService } from "./services/order.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    AdminDashboardComponent,
    NewProductComponent,
    EditProductComponent,
    UserDashboard,
    SignupComponent,
    LoggedInComponent,
    ShoppingCartComponent,
    ProductsComponent,
    OrderPageComponent,
    OrderSubmittedComponent,
    AmountModalComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, CartService, ProductService, OrderService],
  bootstrap: [AppComponent],
  entryComponents: [
    AmountModalComponent,
    EditProductComponent,
    NewProductComponent,
    SignupComponent
  ]
})
export class AppModule {}
