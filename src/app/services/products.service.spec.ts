import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProductsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getProducts', () => {
    const response = [
      {
        id: '1',
        title: 'Test Product',
        description: 'Test description',
        image: 'test-image.jpg',
        price: '19.99',
        category: 'Test category',
      },
      {
        id: '2',
        title: 'Test Product2',
        description: 'Test description',
        image: 'test-image.jpg',
        price: '19.99',
        category: 'Test category',
      },
    ];
    service.getProducts().subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `https://fakestoreapi.com/products`,
    });

    req.flush(response);
  });

  it('should test saveProducts', () => {
    const response = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    const data = {
      title: 'Test Product2',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    service.saveProduct(data).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `https://fakestoreapi.com/products`,
    });

    req.flush(response);
  });

  it('should test updateProduct', () => {
    const response = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    const data = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };

    service.updateProduct(data).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `https://fakestoreapi.com/products/${data.id}`,
    });

    req.flush(response);
  });

  it('should test deleteProduct', () => {
    const response = {
      id: '1',
      title: 'Test Product',
      description: 'Test description',
      image: 'test-image.jpg',
      price: '19.99',
      category: 'Test category',
    };
    const data = {
      id: '1',
    };

    service.deleteProduct(+data.id).subscribe((res) => {
      expect(res).toEqual(response);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `https://fakestoreapi.com/products/${data.id}`,
    });

    req.flush(response);
  });

});
