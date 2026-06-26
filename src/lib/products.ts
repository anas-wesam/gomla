export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  minOrder: number;
  unit: string;
  description: string;
  image: string;
  inStock: boolean;
  discount?: number;
}

export const categories = [
  "الكل",
  "أدوات مطبخ",
  "تنظيف ونظافة",
  "أدوات حمام",
  "تخزين وتنظيم",
  "أدوات منزلية متنوعة",
];

export const products: Product[] = [];
