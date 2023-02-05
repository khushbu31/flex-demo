import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup;
  imageSrc!: string;

  constructor(
    private productService: ProductsService,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: Product | undefined,
    private dialogRef: MatDialogRef<AddProductComponent>
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      title: new FormControl(this.data ? this.data.title : ''),
      description: new FormControl(this.data ? this.data.description : ''),
      image: new FormControl(this.data ? this.imageSrc = this.data.image : ''),
      price: new FormControl(this.data ? this.data.price : ''),
      category: new FormControl(this.data ? this.data.category : ''),
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProduct() {
    const product = this.productForm.value as Product;
    if (this.data) {
      product.id = this.data.id;
      this.productService.updateProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Updated Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    } else {
      this.productService.saveProduct(product).subscribe({
        next: (res) => {
          this.snackbar.open('Added Successfully!...', '', {
            duration: 3000
          });
          this.dialogRef.close();
        },
        error: (error) => {
          this.snackbar.open('Something went wrong!...', '', {
            duration: 3000
          });
        }
      });
    }
  }
}
