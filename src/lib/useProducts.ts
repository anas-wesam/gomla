"use client";

import { useState, useEffect } from "react";
import { Product } from "./products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data) => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function addProduct(p: Omit<Product, "id">) {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const created = await res.json();
    setProducts((prev) => [created, ...prev]);
  }

  async function updateProduct(p: Product) {
    const res = await fetch(`/api/products/${p.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    const updated = await res.json();
    setProducts((prev) => prev.map((x) => (x.id === p.id ? updated : x)));
  }

  async function deleteProduct(id: number) {
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    setProducts((prev) => prev.filter((x) => x.id !== id));
  }

  return { products, loading, addProduct, updateProduct, deleteProduct };
}
