import { Component, OnInit, Inject } from "@angular/core";
import { ProductService } from "src/app/services/product.service";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { EditProductComponent } from "../../Admin/edit-product/edit-product.component";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    public dialog: MatDialog
  ) {}

  product;

  ngOnInit() {}

  openDialog(product): void {
    let myModal;
    let w;
    if (this.authService.isLogged) {
      myModal = AmountModalComponent;
      w = "250px";
    } else if (this.authService.isAdmin) {
      myModal = EditProductComponent;
      w = "400px";
    }
    const dialogRef = this.dialog.open(myModal, {
      width: w,
      data: { product },
      autoFocus: w === "250px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && this.authService.isLogged) {
        this.onProductAddToCart(result.product, result.amount);
      }
    });
  }

  onGetProducts(id: string) {
    this.productService.getProductsByCategory(id);
  }

  onProductAddToCart(product, amount) {
    const user_id = this.authService.user["_id"];
    this.cartService.addProductToCart(product, amount, user_id);
  }
}

@Component({
  selector: "amount-modal",
  template: `
    <div mat-dialog-content>
      <form #addProductForm="ngForm">
        <mat-form-field>
          <input
            matInput
            required
            type="number"
            min="1"
            name="amount"
            [(ngModel)]="data.amount"
            placeholder="Product Amount"
          />
        </mat-form-field>
      </form>
    </div>
    <div mat-dialog-actions>
      <button
        mat-raised-button
        class="primary-button"
        [mat-dialog-close]="data"
        [disabled]="!addProductForm.valid"
      >
        Add
      </button>
      <button mat-raised-button class="cancel-button" (click)="dialogClose()">
        Cancel
      </button>
    </div>
  `
})
export class AmountModalComponent {
  constructor(
    public dialogRef: MatDialogRef<AmountModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  dialogClose(): void {
    this.dialogRef.close();
  }
}
