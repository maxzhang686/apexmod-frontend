import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { ShopService } from '../../shop/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFormValues, IProduct } from '../../shared/models/products';

import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.scss'],
})
export class EditComponentComponent implements OnInit {
  component: ComponentFormValues;
  productId :number

  constructor(
    private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.component = new ComponentFormValues();
  }

  ngOnInit(): void {
    this.loadProductId();
  }
  loadProductId(){
    this.productId = +this.route.snapshot.paramMap.get('id');
  }

  updatePPrice(event: any) {
    this.component.PPrice = event;
  }

  updateTPrice(event: any) {
    this.component.TPrice = event;
  }

  onSubmit(component: ComponentFormValues, productId: number) {
    // if (this.route.snapshot.url[0].path === 'edit') {
    //   const updatedProduct = {...this.product, ...product, price: +product.price};
    //   this.adminService.updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
    //     this.router.navigate(['/admin']);
    //   });
    // } else {
    //   const newProduct = {...product, price: +product.price};
    //   this.adminService.createProduct(newProduct).subscribe((response: any) => {
    //     this.router.navigate(['/admin']);
    //   });
    // }

    const newComponent = { ...component, PPrice: +component.PPrice, TPrice: +component.TPrice};
    console.log(newComponent)
    this.adminService.createComponent(newComponent, productId).subscribe((response: any) => {
      console.log(response);
      this.router.navigate([`/admin/edit/${productId}`]);
    });
  }
}
