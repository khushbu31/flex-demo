import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

import { AddProductComponent } from './add-product.component';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  let productService: ProductsService;
  let dialogRef: MatDialogRef<AddProductComponent>;
  let formBuilder: FormBuilder;
  let data: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule, SharedModule],
      declarations: [AddProductComponent],
      providers: [
        ProductsService,
        SharedModule,
        FormBuilder,
        { provide: NO_ERRORS_SCHEMA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;

    productService = TestBed.inject(ProductsService);
    dialogRef = TestBed.inject(MatDialogRef);
    formBuilder = TestBed.inject(FormBuilder);
    data = TestBed.inject(MAT_DIALOG_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form group with the correct controls', () => {
    expect(component.productForm instanceof FormGroup).toBeTruthy();
    expect(
      component.productForm.controls['title'] instanceof FormControl
    ).toBeTruthy();
    expect(
      component.productForm.controls['description'] instanceof FormControl
    ).toBeTruthy();
    expect(
      component.productForm.controls['image'] instanceof FormControl
    ).toBeTruthy();
    expect(
      component.productForm.controls['price'] instanceof FormControl
    ).toBeTruthy();
    expect(
      component.productForm.controls['category'] instanceof FormControl
    ).toBeTruthy();
  });

  it('should set the form controls to the correct values when data is provided', () => {
    const data: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    component = new AddProductComponent(productService, data, dialogRef);
    component.ngOnInit();
    delete data.id;
    expect(component.productForm.value).toEqual(data);
  });

  it('should handle file selection', () => {
    // Arrange
    const file = new File([], 'test.jpg');
    const event = { target: { files: [file] } };
    // spyOn(component.productForm, 'patchValue');
    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(() => {});
    // Act
    component.onFileSelected(event);


    // Assert
    expect(component.imageSrc).toBeUndefined();
    // expect(component.productForm.patchValue).toHaveBeenCalledWith({image: file})
    expect(FileReader.prototype.readAsDataURL).toHaveBeenCalledWith(file);
  });

  it('should call the saveProduct while editing the product', () => {
    const data: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    const response: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    component = new AddProductComponent(productService, data, dialogRef);
    component.ngOnInit();
    const spy = spyOn(productService, 'updateProduct').and.returnValue(
      of(response)
    );
    component.saveProduct();
    expect(spy).toHaveBeenCalledWith(data);
  });

  it('should call the saveProduct to add new product', () => {
    const data: Product = {
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    const response: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    component = new AddProductComponent(productService, undefined, dialogRef);
    component.ngOnInit();
    component.productForm.setValue(data);
    const spy = spyOn(productService, 'saveProduct').and.returnValue(
      of(response)
    );
    component.saveProduct();
    expect(spy).toHaveBeenCalledWith(data);
  });
});
