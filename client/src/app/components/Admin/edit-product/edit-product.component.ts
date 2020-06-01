import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Product } from "src/app/products.model";

@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"]
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  product: {};
  file: File;
  isEdited = false;
  onDelete = false;
  isDeleted = false;
  validationErrors = {};
  ngOnInit() {}

  onFileChange(event) {
    this.file = event.target.files[0];
  }

  onSubmit(form) {
    const EditedProductData = new FormData();
    if (this.file) {
      EditedProductData.append("image", this.file);
    }
    EditedProductData.append("name", form.value.name);
    EditedProductData.append("price", form.value.price);
    EditedProductData.append("category", form.value.category);
    this.productService
      .editProduct(this.data.product, EditedProductData)
      .subscribe(
        (updatedProduct: Product) => {
          //Get index of edited product
          let index;
          for (let i = 0; i < this.productService.products.length; i++) {
            if (this.productService.products[i]._id === this.data.product._id) {
              index = i;
              break;
            }
          }
          const newProducts = [...this.productService.products];
          //If product category was changed, remove from current array
          if (this.data.product.category !== updatedProduct.category) {
            newProducts.splice(index, 1);
          } else {
            // Else change product with new details
            newProducts[index] = updatedProduct;
          }
          this.productService.products = newProducts;
          this.isEdited = true;
          setTimeout(() => {
            this.isEdited = false;
            this.closeDialog();
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

  onDeleteClick() {
    this.onDelete = true;
  }

  onInputChange(input) {
    this.validationErrors[input.name] = false;
  }

  onDeleteConfirm(product_id) {
    this.productService.deleteProduct(product_id);
    this.onDelete = false;
    this.isDeleted = true;
    setTimeout(() => {
      this.closeDialog();
      this.isDeleted = false;
    }, 1000);
  }
}
