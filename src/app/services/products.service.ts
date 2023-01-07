import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(
      'https://fakestoreapi.com/products',
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`https://fakestoreapi.com/products/null`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `https://fakestoreapi.com/products/${product.id}`,
      product
    );
  }
}
