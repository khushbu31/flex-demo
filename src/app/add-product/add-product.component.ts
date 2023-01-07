import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;

  srcResult: any;

  constructor(
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(this.data ? this.data.title : ''),
      description: new FormControl(this.data ? this.data.description : ''),
      image: new FormControl(this.data ? this.data.image : ''),
      price: new FormControl(this.data ? this.data.price : ''),
      category: new FormControl(this.data ? this.data.category : ''),
    });
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  saveProduct() {
    const product = this.productForm.value as Product;
    if (this.data) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe(console.log);
    } else {
      this.productService.saveProduct(product).subscribe(console.log);
    }
  }
}
