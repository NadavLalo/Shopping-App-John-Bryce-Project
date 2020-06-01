import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../services/auth.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MustMatch } from "./custom-validation/validation";
import * as data from "../../../../assets/cities.json";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<SignupComponent>
  ) {}
  stepOneComplete = false;
  errors = {};
  stepOneForm: FormGroup;
  cities = data["default"];

  ngOnInit() {
    this.stepOneForm = this.formBuilder.group(
      {
        _id: ["", [Validators.required, Validators.minLength(6)]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(4)]],
        confirmPassword: ["", [Validators.required]]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  stepOneSubmit() {
    this.authService.stepOneSignUp(this.stepOneForm.value).subscribe(
      res => {
        this.stepOneComplete = true;
      },
      err => {
        err.error.errors.map(e => {
          if (e.param) {
            const param = e.param;
            this.errors[param] = "required";
          } else {
            const key = Object.keys(e);
            const value = Object.values(e);
            this.errors[key[0]] = value[0];
          }
        });
      }
    );
  }

  inputChangeAfterError(input) {
    delete this.errors[input];
  }

  onSignUp(stepOne, stepTwo) {
    const mergedForms = { ...stepOne.value, ...stepTwo.value };
    mergedForms.role = "User";
    this.authService.finalSignUp(mergedForms).subscribe(
      res => {
        localStorage.setItem("token", res["accessToken"]);
        this.authService.isLogged = true;
        this.authService.user = res;
        this.dialogClose();
      },
      err => {
        err.error.errors.map(e => {
          const param = e.param;
          this.errors[param] = "required";
        });
      }
    );
  }

  dialogClose() {
    this.dialogRef.close();
  }
}
