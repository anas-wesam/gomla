"use client";

import { useState, useMemo } from "react";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/useProducts";
import { Phone, MessageCircle, Search, Package, CheckCircle, XCircle } from "lucide-react";

export default function HomePage() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
      const matchSearch =
        p.name.includes(searchQuery) || p.description.includes(searchQuery);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const product = selectedProduct !== null ? products.find((p) => p.id === selectedProduct) : null;

  return (
    <div className="min-h-screen" style={{ background: "#0a0a0a", color: "#fff" }}>

      {/* ═══ HEADER ═══ */}
      <header style={{ borderBottom: "1px solid #1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm tracking-tight" style={{ background: "#f59e0b", color: "#000", letterSpacing: "-0.05em" }}>
              CC
            </div>
            <div>
              <div className="font-black text-lg leading-none">Cash Cow</div>
              <div className="text-xs leading-none" style={{ color: "#666" }}>لجملة الجملة</div>
            </div>
          </div>
          <div className="flex gap-2">
            <a
              href="https://wa.me/201000000000"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-black transition-opacity hover:opacity-80"
              style={{ background: "#f59e0b" }}
            >
              <MessageCircle size={15} />
              <span className="hidden sm:inline">واتساب</span>
            </a>
            <a
              href="tel:+201000000000"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
              style={{ border: "1px solid #2a2a2a" }}
            >
              <Phone size={15} />
              <span className="hidden sm:inline">اتصل بنا</span>
            </a>
          </div>
        </div>
      </header>

      {/* ═══ SLOGAN STRIP ═══ */}
      <div className="max-w-6xl mx-auto px-4 py-5">
        <p className="text-sm font-medium" style={{ color: "#555" }}>
          <span className="font-black" style={{ color: "#f59e0b" }}>Cash Cow</span> — لجملة الجملة
        </p>
      </div>

      {/* ═══ PRODUCTS ═══ */}
      <section id="products" className="max-w-6xl mx-auto px-4 pb-20">

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#444" }} />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3.5 rounded-xl text-sm outline-none"
            style={{ background: "#111", border: "1px solid #222", color: "#fff" }}
          />
        </div>

        {/* Category pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={
                selectedCategory === cat
                  ? { background: "#f59e0b", color: "#000" }
                  : { background: "#111", color: "#888", border: "1px solid #222" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#444" }}>
            <Package size={48} className="mx-auto mb-4 opacity-20" />
            <p>مفيش منتجات بهذا البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className="rounded-2xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "#111", border: "1px solid #1e1e1e" }}
              >
                {/* Image area */}
                <div className="h-36 flex items-center justify-center text-6xl relative" style={{ background: "#161616" }}>
                  {p.image}
                  {p.discount && (
                    <span className="absolute top-3 right-3 text-black text-xs font-black px-2 py-1 rounded-full" style={{ background: "#f59e0b" }}>
                      -{p.discount}%
                    </span>
                  )}
                  {!p.inStock && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.7)" }}>
                      <span className="text-white font-bold text-xs px-3 py-1 rounded-full" style={{ background: "#dc2626" }}>نفذ</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#1a1200", color: "#f59e0b" }}>
                    {p.category}
                  </span>
                  <h3 className="font-bold mt-2 mb-1 text-sm leading-snug text-white">{p.name}</h3>
                  <p className="text-xs leading-relaxed line-clamp-2 mb-3" style={{ color: "#555" }}>{p.description}</p>

                  <div className="flex items-end justify-between pt-3" style={{ borderTop: "1px solid #1e1e1e" }}>
                    <div>
                      {p.discount ? (
                        <>
                          <div className="text-lg font-black" style={{ color: "#f59e0b" }}>
                            {Math.round(p.price * (1 - p.discount / 100))} جم
                          </div>
                          <div className="text-xs line-through" style={{ color: "#444" }}>{p.price} جم</div>
                        </>
                      ) : (
                        <div className="text-lg font-black text-white">{p.price} جم</div>
                      )}
                      <div className="text-xs" style={{ color: "#444" }}>للـ {p.unit}</div>
                    </div>
                    <div className="text-left text-xs" style={{ color: "#555" }}>
                      <div>حد أدنى</div>
                      <div className="font-bold text-white">{p.minOrder} {p.unit}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ═══ PRODUCT MODAL ═══ */}
      {product && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl overflow-hidden"
            style={{ background: "#111", border: "1px solid #1e1e1e" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-52 flex items-center justify-center text-8xl relative" style={{ background: "#161616" }}>
              {product.image}
              {product.discount && (
                <span className="absolute top-4 right-4 text-black text-sm font-black px-3 py-1 rounded-full" style={{ background: "#f59e0b" }}>
                  -{product.discount}%
                </span>
              )}
            </div>

            <div className="p-6">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: "#1a1200", color: "#f59e0b" }}>
                {product.category}
              </span>
              <h2 className="text-xl font-black text-white mt-2 mb-1">{product.name}</h2>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#666" }}>{product.description}</p>

              <div className="grid grid-cols-2 gap-3 rounded-xl p-4 mb-4" style={{ background: "#161616" }}>
                <div className="text-center">
                  <div className="text-2xl font-black" style={{ color: product.discount ? "#f59e0b" : "#fff" }}>
                    {product.discount ? Math.round(product.price * (1 - product.discount / 100)) : product.price} جم
                  </div>
                  {product.discount && (
                    <div className="text-sm line-through" style={{ color: "#444" }}>{product.price} جم</div>
                  )}
                  <div className="text-xs mt-1" style={{ color: "#555" }}>سعر الجملة / {product.unit}</div>
                </div>
                <div className="text-center" style={{ borderRight: "1px solid #222" }}>
                  <div className="text-2xl font-black text-white">{product.minOrder}</div>
                  <div className="text-xs mt-1" style={{ color: "#555" }}>الحد الأدنى ({product.unit})</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {product.inStock
                  ? <><CheckCircle size={16} style={{ color: "#22c55e" }} /><span className="text-sm" style={{ color: "#22c55e" }}>متاح في المخزن</span></>
                  : <><XCircle size={16} style={{ color: "#ef4444" }} /><span className="text-sm" style={{ color: "#ef4444" }}>نفذ من المخزن</span></>
                }
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/201000000000?text=مرحبا، أريد الاستفسار عن: ${product.name}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-black transition-opacity hover:opacity-90"
                  style={{ background: "#f59e0b" }}
                >
                  <MessageCircle size={18} />
                  اطلب الآن
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 rounded-xl font-medium transition-colors"
                  style={{ border: "1px solid #2a2a2a", color: "#666" }}
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="max-w-6xl mx-auto px-4 py-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs" style={{ background: "#f59e0b", color: "#000" }}>CC</div>
            <span className="font-black text-lg">Cash Cow</span>
          </div>
          <p className="text-sm mb-4" style={{ color: "#555" }}>تجارة جملة أدوات منزلية بأفضل الأسعار</p>
          <div className="flex justify-center gap-6 text-sm flex-wrap mb-6" style={{ color: "#444" }}>
            <span>📞 010-0000-0000</span>
            <span>📍 القاهرة، مصر</span>
            <span>🕐 يومياً 9ص - 6م</span>
          </div>
          <div className="text-xs" style={{ color: "#333" }}>جميع الحقوق محفوظة © 2026 Cash Cow</div>
        </div>
      </footer>
    </div>
  );
}
