import { Component, Input, OnInit } from '@angular/core';
import { IProduct, ProductFormValues } from '../../shared/models/products';
// import {IBrand} from '../../shared/models/brand';
// import {IType} from '../../shared/models/productType';

import { IPlatform } from 'src/app/shared/models/platform';
import { IGraphic } from 'src/app/shared/models/productGraphic';
import { ICategory } from 'src/app/shared/models/category';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-product-form',
  templateUrl: './edit-product-form.component.html',
  styleUrls: ['./edit-product-form.component.scss'],
})
export class EditProductFormComponent implements OnInit {
  @Input() product: ProductFormValues;
  @Input() edit: boolean;
  // @Input() brands: IBrand[];
  // @Input() types: IType[];
  // @Input() platforms: IPlatform[];
  @Input() categories: ICategory[];
  success = false;

  productCategoryId = 2;
  productTagIds = [1, 2];
  childProductIds = [ {
    childProductId: 19,
    IsDefault: true
  },
  {
    childProductId: 20,
    IsDefault: false
  }];

  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.product,this.product.productCategory);
    console.log(this.categories);

  }

  deleteSomeObjectKey (){

    delete this.product.childProducts;
    delete this.product.productCategory;
    delete this.product.tags;

  }

  onSubmit(product: ProductFormValues) {
    this.deleteSomeObjectKey()
    if (this.route.snapshot.url[0].path === 'edit') {
      console.log(2,this.product)
      const updatedProduct = {
        ...this.product,
        ...product,
        price: +product.price,
        productCategoryId: 1,
        productTagIds: [1, 2],
        childProductIds: [ 
          {
            childProductId: 19,
            IsDefault: true
          },
          {
            childProductId: 20,
            IsDefault: false
          }],
        discriminator: "Product",
      };
      //console.log(product, product.price);
      this.adminService
        .updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id'))
        .subscribe((response: any) => {
          this.router.navigate([`/admin/edit/${+this.route.snapshot.paramMap.get('id')}`]);
          // alert(`${response.name} updated!`);
          console.log(response);
          this.success = true;
        });
    } else {
      const newProduct = { ...product, price: +product.price };

      console.log(product, product.price);
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate([`/admin/edit/${response.id}`]);
        // alert(`${response.name} created!`);
        // this.success = true;
      });
    }
  }

  updatePrice(event: any) {
    this.product.price = event;
    //console.log(this.product)
  }

  closeAlert() {
    this.success = false;
  }
}
