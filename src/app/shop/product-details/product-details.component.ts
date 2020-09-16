import { Component, OnInit } from '@angular/core';
import { IProduct, IChildrenComponent } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { BasketService } from 'src/app/basket/basket.service';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryImageSize,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  components: IChildrenComponent[];
  childComponentsId: any;
  childComponentsPrice: any;
  childProducts: any;
  basketProduct: any;

  constructor(
    private shopService: ShopService,
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.bcService.set('@productDetails', '');
  }

  ngOnInit() {
    this.loadProduct();
  }

  initializeGallery() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '600px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Contain,
        preview: false,
      },
    ];
    this.galleryImages = this.getImages();
  }

  setPrice(data) {
    let count = 0;
    for (let key in data) {
      count += data[key];
    }
    this.product.price = count;
    return count;
  }

  handleChange(productCategory, id, price) {
    this.childComponentsId[productCategory] = id;
    this.childComponentsPrice[productCategory] = price;
    console.log(this.childComponentsId);
    console.log(this.childComponentsPrice);
    this.setPrice(this.childComponentsPrice);
  }

  mapChildrenProductsId(arr) {
    let components = {};
    arr.forEach((items, index) => {
      let products = components[items.productCategory] || [];
      if (items.isDefault) {
        products = items.id;
      }
      components[items.productCategory] = products;
    });
    return components;
  }

  mapChildrenProductsPrice(arr) {
    let priceGroup = {};
    arr.forEach((items, index) => {
      let products = priceGroup[items.productCategory] || [];
      if (items.isDefault) {
        products = items.price;
      }
      priceGroup[items.productCategory] = products;
    });
    this.setPrice(priceGroup);
    return priceGroup;
  }

  mapChildrenProductsForRender(arr) {
    let components = [];
    arr.forEach((items, i) => {
      let index = -1;
      let alreadyExists = components.some((newItem, j) => {
        if (items.productCategory === newItem.category) {
          index = j;
          return true;
        }
      });
      if (!alreadyExists) {
        components.push({
          category: items.productCategory,
          itemsList: [items],
        });
      } else {
        components[index].itemsList.push(items);
      }
    });
    return components;
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo.pictureUrl,
        medium: photo.pictureUrl,
        big: photo.pictureUrl,
      });
    }
    return imageUrls;
  }

  handlerChangeChildrenProductsObjectToArry() {
    let input = this.childComponentsId;
    let output = [];
    for (var type in input) {
      let item = {};
      item[type] = input[type];
      output.push(item);
    }
    this.childProducts = output;
  }

  addItemToBasket() {
    // console.log(this.product);
    this.handlerChangeChildrenProductsObjectToArry();
    // console.log(this.childProducts);

    this.basketService.addItemToBasket(
      this.product,
      this.quantity,
      this.childProducts
    );
  }

  incrementQuantity() {
    this.quantity++;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  loadProduct() {
    this.shopService
      .getProduct(+this.activateRoute.snapshot.paramMap.get('id'))
      .subscribe(
        (product) => {
          this.product = product;
          // this.product = {
          //   id: 1,
          //   name: 'Alienware 3000',
          //   // title: "This is the best Gaming PC",
          //   description:
          //     "The Cooler Master MasterBox Lite 3.1 TG mATX Case is your straightforward option for your PC build that doesn't ignore good looks, customisation, or performance. A sleek DarkMirror front panel and three custom trim colours (included in the box) offer a great first entry point for customisation. Additionally, it comes with a 4mm thick edge to edge Tempered Glass Side Panel to show your internal components. And with support for up to 3 cooling fans and a watercooling system, Cooler Master ensure your performance will not suffer.",
          //   price: 250,
          //   pictureUrl: 'http://104.210.85.29/Content/images/products/alienware.png',
          //   productCategory: 'pc',
          //   quantity: 0,
          //   tags: [
          //     {
          //       id: 1,
          //       name: 'AMD',
          //     },
          //     {
          //       id: 2,
          //       name: 'Intel',
          //     },
          //   ],
          //   childProducts: [
          //     {
          //       id: 10,
          //       name: 'CPU i9 9900k',
          //       description: 'Intel 1151 9th Gen Processors',
          //       category: 'cpu',
          //       price: 866,
          //       pictureUrl: 'https://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: false,
          //     },
          //     {
          //       id: 18,
          //       name: 'Case 15',
          //       description: 'Intel 1151 9th Gen Processors',
          //       category: 'case',
          //       price: 180,
          //       pictureUrl: 'https://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: true,
          //     },
          //     {
          //       id: 6,
          //       name: 'CPU i7 9700',
          //       description:
          //         'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa.',
          //       category: 'cpu',
          //       price: 666,
          //       pictureUrl: 'https://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: true,
          //     },
          //     {
          //       id: 17,
          //       name: 'Case M15x-R2',
          //       description:
          //         'Aenean nec lorem. In porttitor. Donec laoreet nonummy augue.',
          //       category: 'case',
          //       price: 150,
          //       pictureUrl: 'ihttps://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: false,
          //     },
          //     {
          //       id: 99,
          //       name: '2070 super',
          //       description: 'Intel 1151 9th Gen Processors',
          //       category: 'gpu',
          //       price: 866.0,
          //       pictureUrl: 'https://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: true,
          //     },
          //     {
          //       id: 88,
          //       name: '2080 super',
          //       description: 'Intel 1151 9th Gen Processors',
          //       category: 'gpu',
          //       price: 180.0,
          //       pictureUrl: 'https://i.ibb.co/6sFDDxJ/9700k.jpg',
          //       isPublished: true,
          //       default: false,
          //     },
          //   ],
          //   photos: [
          //     {
          //       id: 1,
          //       pictureUrl:
          //         'http://104.210.85.29/Content/images/products/alienware.png',
          //       fileName: 'alienware.png',
          //       isMain: true,
          //     },
          //     {
          //       id: 2,
          //       pictureUrl:
          //         'http://104.210.85.29/Content/images/products/c5c4ba6e-86b1-46ca-b6eb-4ebd395b6da6.jpeg',
          //       fileName: 'alienware.png',
          //       isMain: true,
          //     },
          //   ],
          //   isPublished: true,
          // };
          console.log(this.product);
          this.bcService.set('@productDetails', product.name);
          this.initializeGallery();

          if (this.product.productCategory==="pc") {
            const componentGroup = this.mapChildrenProductsForRender(
              this.product.childProducts
            );
            const idGroup = this.mapChildrenProductsId(
              this.product.childProducts
            );
            const priceGroup = this.mapChildrenProductsPrice(
              this.product.childProducts
            );
            this.components = componentGroup;
            this.childComponentsId = idGroup;
            this.childComponentsPrice = priceGroup;
            console.log('array', this.components);
            console.log('id', this.childComponentsId);
            console.log('price', this.childComponentsPrice);

          }


          // this.product.price = this.setPrice(this.componentTotalPrice)
          // console.log(this.setPrice(this.componentTotalPrice));
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
