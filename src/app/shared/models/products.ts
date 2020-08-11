export interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  // productType: string;
  productGraphic: string;
  // productBrand: string;
  productPlatform: string;
  photos: IPhoto[];
  productComponents:IComponent[];
}

export interface IProductToCreate {
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  // productTypeId: number;
  productGraphicId: number;
  // productBrand: string;
  productPlatformId: number;
}

export class ProductFormValues implements IProductToCreate {
  name = '';
  description = '';
  price = 0;
  pictureUrl = '';
  // productBrandId: number;
  productPlatformId: number;
  // productTypeId: number;
  productGraphicId: number;

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
  title: string;
  description: string;
  pPrice: number;
  tPrice: number;
  photo: IComponentPhoto;
}

export interface IComponentPhoto {
  id: number;
  pictureUrl: string;
  fileName: string;
}

export interface IComponentToCreate {
  Title: string;
  Description: string;
  PPrice: number;
  TPrice: number;
  productId: number;
}

export class ComponentFormValues implements IComponentToCreate {
  Title = '';
  Description = '';
  PPrice = 0;
  TPrice = 0;
  productId = null;

  constructor(init?: ProductFormValues) {
    Object.assign(this, init);
  }
  
}



