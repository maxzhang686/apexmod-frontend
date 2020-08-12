import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import { EditProductFormComponent } from './edit-product-form/edit-product-form.component';
import { EditProductPhotosComponent } from './edit-product-photos/edit-product-photos.component';
// import { EditComponentFormComponent } from './edit-component-form/edit-component-form.component';
import { EditProductComponentComponent } from './edit-product-component/edit-product-component.component';
import { EditComponentComponent } from './edit-component/edit-component.component';
import { EditComponentFormComponent } from './edit-component-form/edit-component-form.component';

@NgModule({
  declarations: [AdminComponent, EditProductComponent, EditProductFormComponent, EditProductPhotosComponent, EditProductComponentComponent, EditComponentComponent, EditComponentFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }