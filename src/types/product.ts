export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPage: number;
}

export interface Product {
  id?: number;
  price: string;
  name: string;
  image: string;
  rating: number;
}
