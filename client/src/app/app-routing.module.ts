import { NgModule } from "@angular/core";
import { Routes, RouterModule, CanActivate } from "@angular/router";
import { LoginComponent } from "./components/Shared/login/login.component";
import { AdminDashboardComponent } from "./components/Admin/admin-dashboard/admin-dashboard.component";

import { UserDashboard } from "./components/User/user-dashboard/user-dashboard";
import { SignupComponent } from "./components/User/signup/signup.component";
import { AuthGuardService } from "./services/guard.service";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [{ path: "signup", component: SignupComponent }]
  },
  {
    path: "admin",
    component: AdminDashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "home",
    component: UserDashboard,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
