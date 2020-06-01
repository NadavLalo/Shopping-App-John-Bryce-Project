import { Component, OnInit } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { NgForm } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.css"]
})
export class NewProductComponent implements OnInit {
  file: File;
  isAdded = false;
  validationErrors = {};
  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<NewProductComponent>
  ) {}

  ngOnInit() {}

  onFileChange(event) {
    this.file = event.target.files[0];
    this.validationErrors["image"] = false;
  }

  onInputChange(input) {
    this.validationErrors[input.name] = false;
  }

  onSubmit(form: NgForm) {
    const productData = new FormData();
    productData.append("image", this.file);
    productData.append("name", form.value.name);
    productData.append("price", form.value.price);
    productData.append("category", form.value.category);
    this.productService.addProduct(productData).subscribe(
      product => {
        if (product.category === this.productService.activeCategory) {
          this.productService.products.push(product);
        } else {
          this.productService.activeCategory = product.category;
          this.productService.getProductsByCategory(product.category);
        }
        this.isAdded = true;
        setTimeout(() => {
          this.closeDialog();
          this.isAdded = false;
        }, 500);
      },
      err => {
        err.error.errors.map(e => {
          const param = e.param;
          this.validationErrors[param] = true;
        });
        console.log(this.validationErrors);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
