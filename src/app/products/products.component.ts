import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productData$!: Observable<any>;


  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productData$ = this.productService.getProducts();
  }

}
