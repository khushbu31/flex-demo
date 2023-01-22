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
  imageSrc!: string;

  constructor(
    private productService: ProductsService,
    @Inject(MAT_DIALOG_DATA) private data: Product,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(this.data ? this.data.title : ''),
      description: new FormControl(this.data ? this.data.description : ''),
      image: new FormControl(this.data ? this.imageSrc=this.data.image : ''),
      price: new FormControl(this.data ? this.data.price : ''),
      category: new FormControl(this.data ? this.data.category : ''),
    });

    // if (this.data.image) {
    //   console.log( new File([''], this.data.image, { type: 'image/jpg' }));
    //   const file =  new File([''], this.data.image, { type: 'image/jpg' });
    //   this.imageSrc = file.name;
    //   // this.productForm.patchValue({image:new File([''], this.data.image, { type: 'image/jpg' })});
    // }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
        this.productForm.patchValue({image: this.imageSrc});
      };
      reader.readAsDataURL(file);
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
