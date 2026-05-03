export interface Variant {
  color: string;
  size: string;
}

export interface SKU {
  id: string;
  variant: Variant;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  skus: SKU[];
}