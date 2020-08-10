import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ShopService} from '../../shop/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFormValues, IProduct} from '../../shared/models/products';
import {IBrand} from '../../shared/models/brand';
import {IType} from '../../shared/models/productType';

import { IPlatform } from 'src/app/shared/models/platform';
import { IGraphic } from 'src/app/shared/models/productGraphic';
import {forkJoin} from 'rxjs';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  // brands: IBrand[];
  // types: IType[];
  platforms: IPlatform[];
  graphics: IGraphic[]


  constructor(private adminService: AdminService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              private router: Router) {
    this.productFormValues = new ProductFormValues();
  }

  ngOnInit(): void {
    const platForms = this.getPlatforms();
    const graphics = this.getGraphics();

    forkJoin([graphics, platForms]).subscribe(results => {
      this.graphics = results[0];
      this.platforms = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  updatePrice(event: any) {
    this.product.price = event;
  }

  loadProduct() {
    this.shopService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      const productPlatformId = this.platforms && this.platforms.find(x => x.name === response.productPlatform).id;
      const productGraphicId = this.graphics && this.graphics.find(x => x.name === response.productGraphic).id;
      this.product = response;
      this.productFormValues = {...response, productPlatformId, productGraphicId};
      
    });
  }

  getPlatforms() {
    return this.shopService.getPlatforms();
  }

  getGraphics() {
    return this.shopService.getGraphics();
  }

  onSubmit(product: ProductFormValues) {
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {...this.product, ...product, price: +product.price};
      this.adminService.updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newProduct = {...product, price: +product.price};
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
