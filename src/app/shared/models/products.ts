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