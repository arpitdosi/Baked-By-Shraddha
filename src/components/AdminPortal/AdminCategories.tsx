import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Category } from '../../types/bakery';
import { Plus, Edit2, Trash2, Tag, Check, X, Cake, Sparkles, Cookie, GlassWater } from 'lucide-react';

export const AdminCategories: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products } = useBakery();
  const [isAdding, setIsAdding] = useState(false);
  const [newCatName, setNewCatName] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const id = newCatName.trim().toLowerCase().replace(/\s+/g, '-');
    const newCategory: Category = {
      id,
      name: newCatName.trim(),
      iconName: 'Cake',
      description: newCatDesc.trim() || 'Delicious homemade pure veg bakery treat'
    };

    addCategory(newCategory);
    setNewCatName('');
    setNewCatDesc('');
    setIsAdding(false);
  };

  const startEdit = (cat: Category) => {
    setEditingCatId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description);
  };

  const saveEdit = (catId: string) => {
    if (!editName.trim()) return;
    const cat = categories.find(c => c.id === catId);
    if (!cat) return;

    updateCategory({
      ...cat,
      name: editName.trim(),
      description: editDesc.trim()
    });
    setEditingCatId(null);
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF7] p-3 rounded-2xl border border-[#F0E2D6]">
        <div>
          <h4 className="font-display font-bold text-sm text-[#2C1810]">
            Bakery Categories ({categories.length})
          </h4>
          <p className="text-xs text-stone-500">
            Currently featuring 4 initial categories. You can add new sections anytime (e.g. Brownies, Bento Cakes, Hampers).
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-3.5 py-1.5 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Add New Category Form */}
      {isAdding && (
        <form onSubmit={handleAddCategory} className="bg-white p-4 rounded-2xl border border-[#7B243B]/30 shadow-md space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-stone-800 text-xs">Create New Category</h5>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Category Name *</label>
              <input
                type="text"
                required
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Bento Cakes / Brownies / Tea Cakes"
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
              />
            </div>
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Short Description</label>
              <input
                type="text"
                value={newCatDesc}
                onChange={(e) => setNewCatDesc(e.target.value)}
                placeholder="e.g. Mini 250g lunchbox cakes with cute messages"
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1 rounded-lg bg-[#7B243B] text-white font-bold cursor-pointer"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {categories.map((cat) => {
          const isInitial = ['cake', 'pastry', 'cup cakes', 'jar cake'].includes(cat.id.toLowerCase());
          const itemCount = products.filter(p => p.categoryId.toLowerCase() === cat.id.toLowerCase()).length;
          const isEditing = editingCatId === cat.id;

          return (
            <div 
              key={cat.id} 
              className="bg-white p-3.5 rounded-2xl border border-[#EEDDCE] flex flex-col justify-between shadow-2xs hover:border-[#7B243B]/40 transition-all text-xs"
            >
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-2 py-1 border rounded-lg font-bold"
                  />
                  <input
                    type="text"
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="w-full px-2 py-1 border rounded-lg text-[11px]"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setEditingCatId(null)}
                      className="px-2 py-0.5 border rounded text-[11px] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveEdit(cat.id)}
                      className="px-2.5 py-0.5 bg-emerald-600 text-white rounded text-[11px] font-bold cursor-pointer"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#7B243B]" />
                        <h5 className="font-bold text-sm text-stone-900">{cat.name}</h5>
                        {isInitial && (
                          <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-medium">
                            Core Category
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <span className="bg-[#FAF5EE] text-[#7B243B] font-bold px-2 py-0.5 rounded-full text-[11px] shrink-0 border border-[#E8DACD]">
                      {itemCount} items
                    </span>
                  </div>

                  <div className="flex items-center justify-end gap-1.5 pt-2 mt-2 border-t border-stone-100">
                    <button
                      onClick={() => startEdit(cat)}
                      className="p-1 rounded text-stone-500 hover:text-stone-800 hover:bg-stone-100 cursor-pointer"
                      title="Edit Category Name"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {!isInitial && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${cat.name}"? Products under it will need re-assigning.`)) {
                            deleteCategory(cat.id);
                          }
                        }}
                        className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
