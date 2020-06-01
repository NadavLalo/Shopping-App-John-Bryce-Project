import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../products.model";
@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private http: HttpClient) {}

  products: Product[] = [];
  categories = [];
  getActive = false;
  searchable = false;
  activeCategory;
  headers;
  wasAdded = false;

  getCategories() {
    this.http
      .get<[]>("http://localhost:3000/products/categories")
      .subscribe(categories => (this.categories = categories));
  }

  getNumberOfProducts() {
    return this.http.get<Product[]>("http://localhost:3000/products");
  }

  getProductsByCategory(id: string) {
    this.http
      .get<Product[]>(`http://localhost:3000/products/${id}`)
      .subscribe(products => {
        this.getActive = true;
        this.activeCategory = id;
        this.products = products;
      });
  }

  addProduct(productData) {
    return this.http.post<Product>(
      "http://localhost:3000/products",
      productData,
      {
        headers: this.headers
      }
    );
  }

  editProduct(product, editedProduct) {
    //Check if product was changed
    if (
      product.name === editedProduct.name &&
      product.price === editedProduct.price &&
      editedProduct.image === "" &&
      product.category === editedProduct.category
    ) {
      return;
    } else {
      return this.http.put(
        `http://localhost:3000/products/${product._id}`,
        editedProduct,
        {
          headers: this.headers
        }
      );
    }
  }

  deleteProduct(product_id) {
    this.http
      .delete(`http://localhost:3000/products/${product_id}`, {
        headers: this.headers
      })
      .subscribe(product => {
        const index = this.products.findIndex(
          product => product._id === product_id
        );
        const newProducts = [...this.products];
        newProducts.splice(index, 1);
        this.products = newProducts;
        if (this.products.length === 0 && this.activeCategory === "") {
          this.getActive = false;
        }
      });
  }

  searchProduct(input) {
    this.http
      .get<Product[]>(`http://localhost:3000/products/search?input=${input}`)
      .subscribe(products => {
        this.products = products;
        this.getActive = true;
        this.activeCategory = "";
      });
  }

  logOut() {
    this.products = [];
    this.categories = [];
    this.getActive = false;
    this.activeCategory = null;
    this.searchable = false;
  }
}
