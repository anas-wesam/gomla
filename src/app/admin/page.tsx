"use client";

import { useState } from "react";
import { useProducts } from "@/lib/useProducts";
import { categories, Product } from "@/lib/products";
import { Plus, Pencil, Trash2, LogOut, Save, X, RotateCcw, Eye } from "lucide-react";
import Link from "next/link";

const ADMIN_PASSWORD = "gomla123";

const emptyForm = (): Omit<Product, "id"> => ({
  name: "",
  category: "أدوات مطبخ",
  price: 0,
  minOrder: 1,
  unit: "قطعة",
  description: "",
  image: "📦",
  inStock: true,
  discount: undefined,
});

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState("");
  const [passError, setPassError] = useState(false);

  const { products, addProduct, updateProduct, deleteProduct, resetToDefault } = useProducts();
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyForm());
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  function login() {
    if (pass === ADMIN_PASSWORD) {
      setAuthed(true);
    } else {
      setPassError(true);
      setPass("");
    }
  }

  function openAdd() {
    setForm(emptyForm());
    setAdding(true);
    setEditing(null);
  }

  function openEdit(p: Product) {
    setForm({ ...p });
    setEditing(p);
    setAdding(false);
  }

  function closeForm() {
    setAdding(false);
    setEditing(null);
  }

  function submitForm() {
    if (!form.name || !form.price) return;
    if (editing) {
      updateProduct({ ...form, id: editing.id });
    } else {
      addProduct(form);
    }
    closeForm();
  }

  function handleDelete(id: number) {
    deleteProduct(id);
    setDeleteConfirm(null);
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-4xl mb-3">🏪</div>
            <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
            <p className="text-gray-500 text-sm mt-1">ادخل كلمة السر للدخول</p>
          </div>
          <input
            type="password"
            placeholder="كلمة السر"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setPassError(false); }}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className={`w-full border rounded-xl px-4 py-3 mb-3 text-center text-lg focus:outline-none focus:ring-2 ${passError ? "border-red-400 focus:ring-red-300" : "border-gray-200 focus:ring-blue-400"}`}
          />
          {passError && <p className="text-red-500 text-sm text-center mb-3">كلمة السر غلط!</p>}
          <button
            onClick={login}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-medium transition-colors"
          >
            دخول
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">🏪 لوحة التحكم</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-200 hover:text-white text-sm transition-colors"
            >
              <Eye size={16} />
              عرض الموقع
            </Link>
            <button
              onClick={() => setAuthed(false)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm transition-colors"
            >
              <LogOut size={15} />
              خروج
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-700">{products.length}</div>
            <div className="text-xs text-gray-500 mt-1">إجمالي المنتجات</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600">{products.filter(p => p.inStock).length}</div>
            <div className="text-xs text-gray-500 mt-1">متاح</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-red-500">{products.filter(p => !p.inStock).length}</div>
            <div className="text-xs text-gray-500 mt-1">نفذ</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-700 text-lg">المنتجات</h2>
          <div className="flex gap-2">
            <button
              onClick={openAdd}
              className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            >
              <Plus size={16} />
              منتج جديد
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">المنتج</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">الفئة</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">السعر</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium hidden sm:table-cell">الحد الأدنى</th>
                  <th className="text-right px-4 py-3 text-gray-500 font-medium">الحالة</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image?.startsWith("data:") || p.image?.startsWith("http")
                          ? <img src={p.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                          : <span className="text-2xl">{p.image}</span>
                        }
                        <div>
                          <div className="font-medium text-gray-800">{p.name}</div>
                          <div className="text-xs text-gray-400 sm:hidden">{p.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{p.category}</td>
                    <td className="px-4 py-3 font-semibold text-blue-700">
                      {p.discount ? (
                        <span>{Math.round(p.price * (1 - p.discount / 100))} <span className="text-xs text-gray-400 line-through">{p.price}</span></span>
                      ) : p.price} جم
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{p.minOrder} {p.unit}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                        {p.inStock ? "متاح" : "نفذ"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(adding || editing) && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h2 className="font-bold text-gray-800">{editing ? "تعديل المنتج" : "إضافة منتج جديد"}</h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Image upload */}
              <div>
                <label className="text-xs text-gray-500 block mb-2">صورة المنتج</label>
                <div className="flex items-center gap-3">
                  <div className="w-20 h-20 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden bg-gray-50 shrink-0">
                    {form.image && form.image.length > 10 ? (
                      <img src={form.image} alt="" className="w-full h-full object-cover rounded-xl" />
                    ) : (
                      <span className="text-3xl">{form.image || "📦"}</span>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="flex items-center justify-center gap-2 cursor-pointer w-full py-2.5 rounded-xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors">
                      <span>📁 رفع صورة</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setForm({ ...form, image: reader.result as string });
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    <p className="text-xs text-gray-400 text-center">أو اكتب إيموجي</p>
                    <input
                      value={form.image.startsWith("data:") ? "" : form.image}
                      placeholder="📦"
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-center text-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>
              {/* Name */}
              <div>
                <label className="text-xs text-gray-500 block mb-1">اسم المنتج *</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="مثال: طقم أواني 6 قطع"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs text-gray-500 block mb-1">الفئة</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                >
                  {categories.filter(c => c !== "الكل").map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs text-gray-500 block mb-1">الوصف</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={2}
                  placeholder="وصف مختصر للمنتج..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Price & Discount */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">السعر (جم) *</label>
                  <input
                    type="number"
                    value={form.price || ""}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">خصم % (اختياري)</label>
                  <input
                    type="number"
                    value={form.discount ?? ""}
                    onChange={(e) => setForm({ ...form, discount: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder="مثال: 10"
                    min={0}
                    max={90}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>

              {/* Min Order & Unit */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 block mb-1">الحد الأدنى للطلب</label>
                  <input
                    type="number"
                    value={form.minOrder}
                    onChange={(e) => setForm({ ...form, minOrder: Number(e.target.value) })}
                    min={1}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">الوحدة</label>
                  <select
                    value={form.unit}
                    onChange={(e) => setForm({ ...form, unit: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                  >
                    {["قطعة", "طقم", "كرتونة", "دستة", "كيلو", "لتر"].map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <label className="text-sm text-gray-700 flex-1">متاح في المخزن؟</label>
                <button
                  onClick={() => setForm({ ...form, inStock: !form.inStock })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${form.inStock ? "bg-green-500" : "bg-gray-300"}`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.inStock ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 py-4 flex gap-3">
              <button
                onClick={submitForm}
                disabled={!form.name || !form.price}
                className="flex-1 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
              >
                <Save size={16} />
                {editing ? "حفظ التعديلات" : "إضافة المنتج"}
              </button>
              <button
                onClick={closeForm}
                className="px-5 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="font-bold text-gray-800 mb-2">حذف المنتج؟</h3>
            <p className="text-gray-500 text-sm mb-5">الحذف مش هيتراجع</p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl font-medium transition-colors"
              >
                احذف
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
