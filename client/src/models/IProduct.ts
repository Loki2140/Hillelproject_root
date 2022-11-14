export interface IProduct {
  id: number;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
  title: string;
}
