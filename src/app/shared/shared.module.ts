import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], exports: [
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule
  ]
})
export class SharedModule { }
