import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types/product';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';
import { retry } from 'rxjs';

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private productService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];
  totalRecords: number = 0;
  rows: number = 5;
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;
  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  toogleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toogleDeletePopup(product: Product) {
    if (!product.id) return;
    this.deleteProduct(product.id);
  }

  toogleAddPopup() {
    this.displayAddPopup = true;
  }

  resetPaginatort() {
    this.paginator?.changePage(0);
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) return;
    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  fetchProducts(page: number, perPage: number) {
    this.productService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          this.fetchProducts(0, this.rows);
          this.resetPaginatort();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteProduct(id: number) {
    this.productService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          this.fetchProducts(0, this.rows);
          this.resetPaginatort();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (data) => {
          this.fetchProducts(0, this.rows);
          this.resetPaginatort();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }

  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }
}
