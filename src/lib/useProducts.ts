"use client";

import { useState, useEffect } from "react";
import { products as defaultProducts, Product } from "./products";

const STORAGE_KEY = "gomla_products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setProducts(stored ? JSON.parse(stored) : defaultProducts);
  }, []);

  function save(updated: Product[]) {
    setProducts(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  function addProduct(p: Omit<Product, "id">) {
    const id = Date.now();
    save([...products, { ...p, id }]);
  }

  function updateProduct(p: Product) {
    save(products.map((x) => (x.id === p.id ? p : x)));
  }

  function deleteProduct(id: number) {
    save(products.filter((x) => x.id !== id));
  }

  function resetToDefault() {
    save(defaultProducts);
  }

  return { products, addProduct, updateProduct, deleteProduct, resetToDefault };
}
