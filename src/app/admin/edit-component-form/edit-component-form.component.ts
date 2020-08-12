import { Component, OnInit, Input } from '@angular/core';
import { ComponentFormValues } from 'src/app/shared/models/products';
import { AdminService } from '../admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/shop/shop.service';

@Component({
  selector: 'app-edit-component-form',
  templateUrl: './edit-component-form.component.html',
  styleUrls: ['./edit-component-form.component.scss']
})
export class EditComponentFormComponent implements OnInit {
  @Input() component: ComponentFormValues;

  constructor(private adminService: AdminService,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  updatePPrice(event: any) {
    this.component.pPrice = event;
  }

  updateTPrice(event: any) {
    this.component.tPrice = event;
  }

  onSubmit(component: ComponentFormValues, productId: number) {
    if (this.route.snapshot.url[2].path === 'component') {
      // const updatedProduct = {...this.product, ...product, price: +product.price};
      // this.adminService.updateProduct(updatedProduct, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
      //   this.router.navigate(['/admin']);
      // });
    } else {
      // const newProduct = {...product, price: +product.price};
      // this.adminService.createProduct(newProduct).subscribe((response: any) => {
      //   this.router.navigate(['/admin']);
      // });

    }
    const newComponent = {
      ...component,
      PPrice: +component.pPrice,
      TPrice: +component.tPrice,
    };
    //console.log(newComponent)
    this.adminService
      .createComponent(newComponent, productId)
      .subscribe((response: any) => {
        console.log(response);
        //this.router.navigate([`/admin/edit/${productId}`]);
      });
  }


}
