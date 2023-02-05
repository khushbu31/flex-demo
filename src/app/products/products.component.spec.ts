import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../models/product.model';
import { ProductsService } from '../services/products.service';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let dialog: MatDialog;
  let matSnackBar: MatSnackBar;
  let mockProductService = jasmine.createSpyObj('ProductsService', ['getProducts', 'deleteProduct']);
  mockProductService.getProducts.and.returnValue(of([]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [SharedModule, MaterialModule, MatDialogModule, MatSnackBarModule],
      providers: [
        { provide: ProductsService, useValue: mockProductService}
    ],
    schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    matSnackBar = TestBed.inject(MatSnackBar);
    mockProductService = TestBed.inject(ProductsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product data initially', () => {
    const response = [
      {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        image: 'test-image.jpg',
        price: '19.99',
        category: 'Test category'
      },
      {
        id: '2',
        title: 'Test Product',
        description: 'Test description',
        image: 'test-image.jpg',
        price: '19.99',
        category: 'Test category'
      }
    ];
    mockProductService.getProducts.and.returnValue(of(response));

    component.ngOnInit();
    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.productData).toEqual(response);
    expect(component.showSpinner).toBeFalse();
  });

  it('should get product data initially on failure', () => {
    const error = new Error('Error deleting product');
    mockProductService.getProducts.and.returnValue((throwError(() => error)));
    spyOn(matSnackBar, 'open');

    component.ngOnInit();

    expect(mockProductService.getProducts).toHaveBeenCalled();
    expect(component.showSpinner).toBeFalse();
    expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
      duration: 3000
    });
  })

  it('should test openDialog', () => {
    spyOn(dialog, 'open');
    component.openDialog();
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, { width: '40%' });
  });

  it('should test editDialog', () => {
    const product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category'
    };
    spyOn(dialog, 'open');
    component.editProduct(product);
    expect(dialog.open).toHaveBeenCalledWith(AddProductComponent, { data: product, width: '40%' });
  });

  it('should test deleteProduct on success', () => {
    const product: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category'
    };
    mockProductService.deleteProduct.and.returnValue(of(product));
    spyOn(matSnackBar, 'open');

    component.deleteProduct(product);

    expect(matSnackBar.open).toHaveBeenCalledWith('Deleted Successfully!...', '', {
      duration: 3000
    });
  });

  it('should test deleteProduct on failure', () => {
    const product: Product = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category'
    };
    const error = new Error('Error deleting product');
    mockProductService.deleteProduct.and.returnValue((throwError(() => error)));
    spyOn(matSnackBar, 'open');

    component.deleteProduct(product);

    expect(matSnackBar.open).toHaveBeenCalledWith('Something went wrong!...', '', {
      duration: 3000
    });
  });

});
