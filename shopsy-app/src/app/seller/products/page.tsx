'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  Filter,
  ArrowLeft,
  Edit,
  Trash2,
  MoreVertical,
  Check,
  AlertCircle
} from 'lucide-react';
import { formatInr, formatUsdAsInr } from '../../../lib/utils';

export default function SellerProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [products, setProducts] = useState([
    { id: '1', name: 'Halo Smart Desk Lamp', category: 'Lighting', price: formatUsdAsInr(129), stock: 18, sales: 64, status: 'Active' },
    { id: '2', name: 'Ergonomic Mesh Chair', category: 'Furniture', price: formatUsdAsInr(299), stock: 5, sales: 42, status: 'Low Stock' },
    { id: '3', name: 'Wireless Mechanical Keyboard', category: 'Electronics', price: formatUsdAsInr(159), stock: 24, sales: 36, status: 'Active' },
    { id: '4', name: 'Ultra-clear 4K Monitor Arm', category: 'Accessories', price: formatUsdAsInr(89), stock: 0, sales: 19, status: 'Out of Stock' },
    { id: '5', name: 'Ambient LED Strip Light', category: 'Lighting', price: formatUsdAsInr(49), stock: 50, sales: 88, status: 'Active' },
  ]);

  const [newProduct, setNewProduct] = useState({ name: '', category: 'Electronics', price: '', stock: '' });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price || !newProduct.stock) return;
    const item = {
      id: String(Date.now()),
      name: newProduct.name,
      category: newProduct.category,
      price: formatInr(parseFloat(newProduct.price)),
      stock: parseInt(newProduct.stock, 10),
      sales: 0,
      status: parseInt(newProduct.stock, 10) > 5 ? 'Active' : parseInt(newProduct.stock, 10) > 0 ? 'Low Stock' : 'Out of Stock',
    };
    setProducts([item, ...products]);
    setNewProduct({ name: '', category: 'Electronics', price: '', stock: '' });
    setIsAddModalOpen(false);
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        
        {/* TOP BAR */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/seller"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Dashboard
            </Link>
            <h1 className="mt-1 text-3xl font-extrabold text-slate-900 dark:text-white">
              Manage Products
            </h1>
            <p className="text-sm text-slate-500">
              View and control your inventory items, prices, and stock statuses.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-500 hover:shadow-blue-500/25"
          >
            <Plus className="h-4 w-4" /> Add Product
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Filter className="h-4 w-4" />
            <span>Showing <strong>{filteredProducts.length}</strong> items</span>
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-xs font-semibold uppercase text-slate-400 dark:border-slate-800 dark:bg-slate-800/40">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Stock</th>
                  <th className="py-4 px-4">Total Sales</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <tr key={prod.id} className="transition hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                            <Package className="h-5 w-5" />
                          </div>
                          <span className="font-semibold text-slate-900 dark:text-white">{prod.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-500 dark:text-slate-400">{prod.category}</td>
                      <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">{prod.price}</td>
                      <td className="py-4 px-4 font-medium text-slate-700 dark:text-slate-300">{prod.stock} units</td>
                      <td className="py-4 px-4 text-slate-500">{prod.sales} sold</td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          prod.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                            : prod.status === 'Low Stock'
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
                            : 'bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
                        }`}>
                          {prod.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-slate-800">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setProducts(products.filter((p) => p.id !== prod.id))}
                            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rose-600 dark:hover:bg-slate-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No products found matching your search query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ADD PRODUCT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Product</h2>
            <p className="mt-1 text-xs text-slate-500">Fill in details to list a new item in your store.</p>

            <form onSubmit={handleAddProduct} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Product Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ergonomic Keyboard"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Category</label>
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Lighting">Lighting</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Apparel">Apparel</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.99"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">Stock Count</label>
                  <input
                    type="number"
                    required
                    placeholder="25"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white shadow-md hover:bg-blue-500"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
