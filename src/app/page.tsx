"use client";

import { useState, useMemo } from "react";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/useProducts";
import { Phone, MessageCircle, Search, Package, Tag, ShoppingCart, Star, CheckCircle, XCircle } from "lucide-react";

export default function HomePage() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === "الكل" || p.category === selectedCategory;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const product = selectedProduct !== null ? products.find((p) => p.id === selectedProduct) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-l from-blue-900 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-3 sm:justify-between">
          <div className="text-center sm:text-right">
            <h1 className="text-lg sm:text-2xl font-bold">🏪 متجر الجملة للأدوات المنزلية</h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-0.5">أسعار الجملة الأفضل في السوق</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href="https://wa.me/201000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <MessageCircle size={18} />
              واتساب
            </a>
            <a
              href="tel:+201000000000"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
            >
              <Phone size={18} />
              اتصل بنا
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-l from-blue-800 to-blue-600 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-3">أدوات منزلية بأسعار الجملة</h2>
          <p className="text-blue-100 text-lg mb-6">
            توريد وتجارة جملة في أدوات المنزل — حد أدنى للطلب | شحن لجميع المحافظات
          </p>
          <div className="flex justify-center gap-6 text-sm flex-wrap">
            {[
              { icon: "🚚", text: "شحن سريع لجميع المحافظات" },
              { icon: "💰", text: "أفضل أسعار الجملة" },
              { icon: "✅", text: "ضمان الجودة" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-700 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-400 hover:text-blue-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Package size={22} />, label: "عدد المنتجات", value: `${products.length}+` },
            { icon: <Tag size={22} />, label: "أقل الأسعار", value: "مضمون" },
            { icon: <ShoppingCart size={22} />, label: "طلبات يومية", value: "500+" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <div className="text-blue-600 flex justify-center mb-2">{s.icon}</div>
              <div className="text-xl font-bold text-gray-800">{s.value}</div>
              <div className="text-xs text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <Package size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">مفيش منتجات بهذا البحث</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedProduct(p.id)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="bg-gradient-to-br from-blue-50 to-gray-100 h-36 flex items-center justify-center text-6xl relative">
                  {p.image}
                  {p.discount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      خصم {p.discount}%
                    </span>
                  )}
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-white font-bold text-sm bg-red-600 px-3 py-1 rounded-full">نفذ من المخزن</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">{p.category}</span>
                  <h3 className="font-bold text-gray-800 mt-2 mb-1 text-sm leading-tight">{p.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{p.description}</p>

                  <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                    <div>
                      <div className="text-lg font-bold text-blue-700">
                        {p.discount ? (
                          <>
                            <span className="text-red-500">{Math.round(p.price * (1 - p.discount / 100))} جم</span>
                            <span className="text-xs text-gray-400 line-through mr-1">{p.price}</span>
                          </>
                        ) : (
                          <span>{p.price} جم</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">للـ {p.unit}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-left">
                      <div>حد أدنى</div>
                      <div className="font-semibold text-gray-700">{p.minOrder} {p.unit}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      {product && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-blue-50 to-gray-100 h-48 flex items-center justify-center text-8xl relative">
              {product.image}
              {product.discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  خصم {product.discount}%
                </span>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full">{product.category}</span>
                  <h2 className="text-xl font-bold text-gray-800 mt-2">{product.name}</h2>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} className="text-gray-200" fill="currentColor" />
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4">{product.description}</p>

              <div className="bg-gray-50 rounded-xl p-4 mb-4 grid grid-cols-2 gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {product.discount
                      ? Math.round(product.price * (1 - product.discount / 100))
                      : product.price}{" "}
                    جم
                  </div>
                  {product.discount && (
                    <div className="text-sm text-gray-400 line-through">{product.price} جم</div>
                  )}
                  <div className="text-xs text-gray-500 mt-1">سعر الجملة / {product.unit}</div>
                </div>
                <div className="text-center border-r border-gray-200">
                  <div className="text-2xl font-bold text-gray-700">{product.minOrder}</div>
                  <div className="text-xs text-gray-500 mt-1">الحد الأدنى للطلب ({product.unit})</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5">
                {product.inStock ? (
                  <><CheckCircle size={18} className="text-green-500" /><span className="text-green-600 text-sm font-medium">متاح في المخزن</span></>
                ) : (
                  <><XCircle size={18} className="text-red-500" /><span className="text-red-600 text-sm font-medium">نفذ من المخزن</span></>
                )}
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/201000000000?text=مرحبا، أريد الاستفسار عن: ${product.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-medium text-center flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={18} />
                  اطلب الآن
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  إغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-16 py-10 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-bold mb-2">🏪 متجر الجملة للأدوات المنزلية</h3>
          <p className="text-blue-200 text-sm mb-4">تجارة جملة أدوات منزلية بأفضل الأسعار</p>
          <div className="flex justify-center gap-6 text-sm text-blue-200 flex-wrap">
            <span>📞 010-0000-0000</span>
            <span>📍 القاهرة، مصر</span>
            <span>🕐 يومياً 9ص - 6م</span>
          </div>
          <div className="mt-6 pt-4 border-t border-blue-800 text-blue-400 text-xs">
            جميع الحقوق محفوظة © 2026
          </div>
        </div>
      </footer>
    </div>
  );
}
