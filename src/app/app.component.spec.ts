import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
@Component({
  selector: 'app-nav-bar',
  template: `<div></div>`
})
class MockNavBarComponent { }

@Component({
  selector: 'app-products',
  template: `<div></div>`
})
class MockProductsComponent { }

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent, MockNavBarComponent, MockProductsComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-demo');
  });

  it('should have app-navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const navComponent = fixture.debugElement.query(By.directive(MockNavBarComponent));
    expect(navComponent).toBeTruthy();
  });

  it('should have app-products', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const productsComponent = fixture.debugElement.query(By.directive(MockProductsComponent));
    expect(productsComponent).toBeTruthy();
  });
});
