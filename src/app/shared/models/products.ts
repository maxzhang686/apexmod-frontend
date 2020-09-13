export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  // productType: string;
  // productGraphic: string;
  // productBrand: string;

  // tags:[]
  photos: IPhoto[];
  childProducts:IComponent[];
  productCategory:string;
  quantity: number;
  tags: any;
  isPublished: boolean;

}

export interface IProductToCreate {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  productcategoryid: number;
  producttagids :number[]
  childproductids : number[]
  isPublished: boolean;
  // productTypeId: number;
  // productGraphicId: number;
  // productBrand: string;
  // productPlatformId: number;
}

export class ProductFormValues implements IProductToCreate {
  name = '';
  description = '';
  price = 0;
  pictureUrl = '';
  productcategoryid= 1;
  producttagids = [
    1,
    2
  ];
  childproductids = [
    17,
    13,
    12,
    11,
    10
  ];
  isPublished = true;

  childProducts='';
  productCategory ='';
  tags ='';
  // productBrandId: number;
  // productTypeId: number;


  // productPlatformId: number;
  // productGraphicId: number;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
  
}

export interface IPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
  isMain: boolean;
}


export interface IComponent {
  id: number;
  // title: string;
  description: string;
  price: number;
  pictureUrl: string;
  name: string,
  category: string,
  isPublished: true,
  default: boolean
}

export interface IComponentPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
}

export interface IComponentToCreate {
  title: string;
  description: string;
  pPrice: number;
  tPrice: number;
  productId: number;
}

export class ComponentFormValues implements IComponentToCreate {
  title = '';
  description = '';
  pPrice = 0;
  tPrice = 0;
  productId = null;

  constructor(init?: ComponentFormValues) {
    Object.assign(this, init);
  }
  
}


export interface IChildrenComponent {
  category: string;
  itemsList:[]

}
