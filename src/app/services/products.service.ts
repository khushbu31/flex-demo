import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseAPI = environment.baseAPI;
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.baseAPI}products`);
  }

  saveProduct(product: Product) {
    return this.http.post<Product>(
      `${this.baseAPI}products`,
      product
    );
  }

  deleteProduct(id: number) {
    return this.http.delete<Product>(`${this.baseAPI}products/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(
      `${this.baseAPI}products/${product.id}`,
      product
    );
  }
}
