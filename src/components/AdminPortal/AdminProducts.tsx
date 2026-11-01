import React, { useState, useRef } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Product, WeightOption } from '../../types/bakery';
import { compressImageFile } from '../../utils/imageCompressor';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Star, 
  Image as ImageIcon, 
  Clock, 
  Gift, 
  CheckCircle,
  Eye,
  EyeOff,
  Upload,
  Camera,
  Link as LinkIcon,
  Layers,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const PRESET_IMAGES = [
  { name: 'Dark Truffle Cake', url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80' },
  { name: 'Rasmalai / Indian Fusion', url: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80' },
  { name: 'Red Velvet Frosting', url: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80' },
  { name: 'Fresh Pineapple Gateau', url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80' },
  { name: 'Lotus Biscoff Drip', url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80' },
  { name: 'Chocolate Pastry Slice', url: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80' },
  { name: 'Black Forest Pastry', url: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80' },
  { name: 'Blueberry Cheesecake Slice', url: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80' },
  { name: 'Gourmet Cupcakes Box', url: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80' },
  { name: 'Nutella Lava Cupcake', url: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80' },
  { name: 'Dessert Jar Cake (Choco)', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80' },
  { name: 'Red Velvet Dessert Jar', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  { name: 'Celebration Combo Bundle', url: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80' }
];

export const AdminProducts: React.FC = () => {
  const { products, categories, addProduct, updateProduct, deleteProduct, toggleStock } = useBakery();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states for adding/editing product
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cake');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [flavoursInput, setFlavoursInput] = useState('');
  const [isCombo, setIsCombo] = useState(false);
  const [comboIncludes, setComboIncludes] = useState('');
  const [isBestseller, setIsBestseller] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [inStock, setInStock] = useState(true);
  const [prepTime, setPrepTime] = useState(4);

  // Multi-image state: up to 4 images!
  const [images, setImages] = useState<string[]>([PRESET_IMAGES[0].url]);
  const [urlInput, setUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Weights array
  const [weights, setWeights] = useState<WeightOption[]>([
    { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 500, servings: 'Serves 4-6', isDefault: true },
    { label: '1 Kg', weightValue: 1000, unit: 'g', price: 900, servings: 'Serves 8-12' }
  ]);

  const openAddModal = () => {
    setEditingProduct(null);
    setName('');
    setHindiName('');
    setCategoryId(categories[0]?.id || 'cake');
    setDescription('');
    setImages([PRESET_IMAGES[0].url]);
    setUrlInput('');
    setFlavoursInput('Belgian Chocolate, Dutch Truffle, Vanilla Berry');
    setIsCombo(false);
    setComboIncludes('');
    setIsBestseller(false);
    setIsNew(true);
    setInStock(true);
    setPrepTime(4);
    setWeights([
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 520, originalPrice: 750, servings: 'Serves 4-6 (4-6 लोग)', isDefault: true },
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 740, originalPrice: 999, servings: 'Serves 6-8 (6-8 लोग)' },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 950, originalPrice: 1299, servings: 'Serves 8-12 (8-12 लोग)' }
    ]);
    setIsEditModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setHindiName(p.hindiName || '');
    setCategoryId(p.categoryId);
    setDescription(p.description || '');
    
    // Load up to 4 images
    const existingImages = p.images && p.images.length > 0 ? [...p.images] : (p.image ? [p.image] : [PRESET_IMAGES[0].url]);
    setImages(existingImages.slice(0, 4));
    setUrlInput('');

    setFlavoursInput(p.flavours.join(', '));
    setIsCombo(!!p.isCombo);
    setComboIncludes(p.comboIncludes || '');
    setIsBestseller(!!p.isBestseller);
    setIsNew(!!p.isNew);
    setInStock(p.inStock);
    setPrepTime(p.preparationTimeHours);
    setWeights([...p.weights]);
    setIsEditModalOpen(true);
  };

  // Direct Mobile / Computer File Upload Handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (images.length >= 4) {
      alert('Maximum 4 images allowed per product. Please remove an existing photo first.');
      return;
    }

    setIsUploading(true);
    try {
      const remainingSlots = 4 - images.length;
      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      const compressedUrls: string[] = [];

      for (const file of filesToProcess) {
        const compressed = await compressImageFile(file, 900, 900, 0.82);
        compressedUrls.push(compressed);
      }

      setImages(prev => [...prev, ...compressedUrls].slice(0, 4));
    } catch (err) {
      console.error('Failed to compress/upload image', err);
      alert('Could not process image file. Please try another photo.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Add from URL input
  const handleAddFromUrl = () => {
    if (!urlInput.trim()) return;
    if (images.length >= 4) {
      alert('Maximum 4 images allowed. Remove one to add a new image.');
      return;
    }
    setImages(prev => [...prev, urlInput.trim()].slice(0, 4));
    setUrlInput('');
  };

  // Add from Preset
  const handleAddPreset = (url: string) => {
    if (images.length >= 4) {
      // If full, replace first image
      setImages(prev => [url, ...prev.slice(1, 4)]);
    } else {
      setImages(prev => [...prev, url]);
    }
  };

  // Remove an image slot
  const handleRemoveImage = (index: number) => {
    if (images.length <= 1) {
      alert('Each product must have at least 1 photo.');
      return;
    }
    setImages(prev => prev.filter((_, idx) => idx !== index));
  };

  // Set an image as primary (Cover photo)
  const handleSetPrimary = (index: number) => {
    if (index === 0) return;
    const selected = images[index];
    const remaining = images.filter((_, idx) => idx !== index);
    setImages([selected, ...remaining]);
  };

  const handleWeightChange = (index: number, field: keyof WeightOption, value: any) => {
    const updated = [...weights];
    updated[index] = { ...updated[index], [field]: value };
    setWeights(updated);
  };

  const addWeightRow = () => {
    setWeights(prev => [
      ...prev,
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 740, originalPrice: 999, servings: 'Serves 6-8 (6-8 लोग)' }
    ]);
  };

  const removeWeightRow = (index: number) => {
    if (weights.length <= 1) return;
    setWeights(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const parsedFlavours = flavoursInput
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const productData: Product = {
      id: editingProduct ? editingProduct.id : `prod_${Date.now()}`,
      name: name.trim(),
      hindiName: hindiName.trim() || undefined,
      categoryId,
      description: description.trim(),
      image: images[0] || PRESET_IMAGES[0].url,
      images: images.length > 0 ? images.slice(0, 4) : [PRESET_IMAGES[0].url],
      weights: weights.length > 0 ? weights : [{ label: 'Standard', weightValue: 1, unit: 'pc', price: 200, isDefault: true }],
      flavours: parsedFlavours.length > 0 ? parsedFlavours : ['Classic'],
      isVeg: true,
      isBestseller,
      isNew,
      isCombo,
      comboIncludes: isCombo ? comboIncludes.trim() : undefined,
      inStock,
      preparationTimeHours: Number(prepTime) || 4,
      tags: [isBestseller ? 'Bestseller' : '', isCombo ? 'Combo' : ''].filter(Boolean)
    };

    if (editingProduct) {
      updateProduct(productData);
    } else {
      addProduct(productData);
    }

    setIsEditModalOpen(false);
  };

  const filtered = products.filter(p => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'combos') return p.isCombo;
    return p.categoryId.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF7] p-3 rounded-2xl border border-[#F0E2D6]">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
              selectedCategory === 'all' ? 'bg-[#7B243B] text-white' : 'bg-white text-stone-600 border border-[#E8DACD]'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setSelectedCategory('combos')}
            className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
              selectedCategory === 'combos' ? 'bg-[#7B243B] text-white' : 'bg-white text-stone-600 border border-[#E8DACD]'
            }`}
          >
            Combos ({products.filter(p => p.isCombo).length})
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id ? 'bg-[#7B243B] text-white' : 'bg-white text-stone-600 border border-[#E8DACD]'
              }`}
            >
              {cat.name} ({products.filter(p => p.categoryId.toLowerCase() === cat.id.toLowerCase()).length})
            </button>
          ))}
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer self-end sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product / Combo</span>
        </button>
      </div>

      {/* Products Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(product => {
          const defaultWt = product.weights[0];
          return (
            <div 
              key={product.id}
              className={`bg-white rounded-2xl border p-3 flex flex-col justify-between transition-all ${
                product.inStock ? 'border-[#EEDDCE]' : 'border-stone-200 bg-stone-50 opacity-75'
              }`}
            >
              <div className="flex gap-3">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 bg-stone-100"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h5 className="font-semibold text-xs text-stone-900 truncate">
                      {product.name}
                    </h5>
                    {product.isCombo && (
                      <span className="bg-[#E76F51] text-white text-[9px] font-bold px-1.5 py-0.2 rounded shrink-0">
                        COMBO
                      </span>
                    )}
                  </div>
                  {product.hindiName && (
                    <div className="text-[10px] text-[#9B6A5B]">{product.hindiName}</div>
                  )}

                  <div className="text-xs font-bold text-[#7B243B] mt-1 font-display">
                    ₹{defaultWt?.price} <span className="text-[10px] font-normal text-stone-500">({defaultWt?.label})</span>
                  </div>

                  <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">
                    {product.weights.length} weight option{product.weights.length > 1 ? 's' : ''} • {product.flavours.length} flavour{product.flavours.length > 1 ? 's' : ''}
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-stone-100 text-xs">
                {/* Stock Toggle Button */}
                <button
                  onClick={() => toggleStock(product.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold flex items-center gap-1 cursor-pointer ${
                    product.inStock 
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100' 
                      : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                  }`}
                  title="Toggle stock availability"
                >
                  {product.inStock ? <Eye className="w-3 h-3 text-emerald-600" /> : <EyeOff className="w-3 h-3 text-stone-500" />}
                  <span>{product.inStock ? 'In Stock' : 'Sold Out'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openEditModal(product)}
                    className="p-1.5 rounded-lg border border-[#E8DACD] hover:bg-stone-100 text-stone-600 cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Are you sure you want to delete "${product.name}"?`)) {
                        deleteProduct(product.id);
                      }
                    }}
                    className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit / Add Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F2DFD1] p-6 max-h-[92vh] flex flex-col my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#F0E0D2]">
              <h3 className="font-display font-bold text-lg text-[#2C1810]">
                {editingProduct ? 'Edit Bakery Item' : 'Add New Bakery Product'}
              </h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="overflow-y-auto py-4 space-y-4 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Belgian Dark Chocolate Truffle Cake"
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Hindi / Local Name (Optional)</label>
                  <input
                    type="text"
                    value={hindiName}
                    onChange={(e) => setHindiName(e.target.value)}
                    placeholder="e.g. बेल्जियन डार्क चॉकलेट ट्रफल केक"
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
              </div>

              {/* Category & Lead Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Preparation Notice (Hours)</label>
                  <input
                    type="number"
                    min={1}
                    value={prepTime}
                    onChange={(e) => setPrepTime(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
              </div>

              {/* 4 Images & Direct Mobile Upload Section */}
              <div className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#E9D9CB] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-[#7B243B]" />
                    <label className="font-bold uppercase tracking-wider text-stone-800 text-[11px]">
                      Product Photos (Up to 4 Images)
                    </label>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    images.length >= 4 
                      ? 'bg-amber-100 text-amber-900' 
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {images.length}/4 Photos
                  </span>
                </div>

                {/* 4 Image Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {images.map((imgUrl, idx) => (
                    <div 
                      key={idx} 
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 bg-stone-100 group shadow-xs ${
                        idx === 0 ? 'border-[#7B243B] ring-2 ring-[#7B243B]/20' : 'border-stone-200'
                      }`}
                    >
                      <img 
                        src={imgUrl} 
                        alt={`Photo ${idx + 1}`} 
                        className="w-full h-full object-cover" 
                      />

                      {/* Primary / Cover Badge */}
                      {idx === 0 && (
                        <div className="absolute top-1 left-1 bg-[#7B243B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                          <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                          <span>Cover</span>
                        </div>
                      )}

                      {/* Photo slot index */}
                      {idx > 0 && (
                        <div className="absolute top-1 left-1 bg-stone-900/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          #{idx + 1}
                        </div>
                      )}

                      {/* Overlay actions */}
                      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1 text-[10px]">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetPrimary(idx)}
                            className="px-2 py-1 bg-white text-stone-900 rounded-lg font-bold flex items-center gap-1 hover:bg-amber-50 cursor-pointer shadow-xs"
                          >
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span>Set Cover</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="px-2 py-1 bg-rose-600 text-white rounded-lg font-bold flex items-center gap-1 hover:bg-rose-700 cursor-pointer shadow-xs"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Empty upload box if < 4 images */}
                  {images.length < 4 && (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="aspect-square rounded-xl border-2 border-dashed border-[#CBB3A2] hover:border-[#7B243B] hover:bg-[#FFF5ED] transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-full bg-white group-hover:bg-[#7B243B] group-hover:text-white text-[#7B243B] flex items-center justify-center shadow-2xs mb-1 transition-colors">
                        <Plus className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-stone-700 group-hover:text-[#7B243B]">
                        + Add Photo {images.length + 1}
                      </span>
                      <span className="text-[9px] text-stone-400">
                        Phone / Gallery
                      </span>
                    </div>
                  )}
                </div>

                {/* Upload Action Bar */}
                <div className="pt-1 flex flex-col sm:flex-row gap-2">
                  {/* Hidden native input for mobile gallery/camera */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  {/* Mobile Direct Upload Button */}
                  <button
                    type="button"
                    disabled={images.length >= 4 || isUploading}
                    onClick={() => fileInputRef.current?.click()}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer ${
                      images.length >= 4 
                        ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                        : 'bg-[#7B243B] hover:bg-[#591C2B] text-white active:scale-98'
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Compressing & Adding...' : '📱 Upload from Phone Camera / Gallery'}</span>
                  </button>
                </div>

                {/* Alternative: Add via Web Image URL */}
                {images.length < 4 && (
                  <div className="pt-1 border-t border-[#E8D7CA]">
                    <div className="text-[10px] font-semibold text-stone-600 mb-1 flex items-center gap-1">
                      <LinkIcon className="w-3 h-3 text-stone-400" />
                      <span>Or paste an online Image URL:</span>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://... (Cake image link)"
                        className="flex-1 px-2.5 py-1 text-xs bg-white border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                      />
                      <button
                        type="button"
                        onClick={handleAddFromUrl}
                        disabled={!urlInput.trim()}
                        className="px-3 py-1 bg-stone-800 hover:bg-stone-900 disabled:opacity-40 text-white font-bold text-xs rounded-xl cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Quick Presets */}
                <div className="pt-1">
                  <span className="text-[10px] text-stone-500 font-medium">Quick Bakery Presets:</span>
                  <div className="flex gap-1.5 overflow-x-auto py-1 scrollbar-none">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAddPreset(preset.url)}
                        className="text-[10px] px-2 py-0.5 rounded-full border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 whitespace-nowrap cursor-pointer hover:border-[#7B243B]"
                      >
                        + {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Weight & Dynamic Price List */}
              <div className="bg-[#FAF5EE] p-3 rounded-2xl border border-[#E9D9CB]">
                <div className="flex items-center justify-between mb-2">
                  <label className="font-bold uppercase tracking-wider text-stone-800 text-[11px]">
                    Weight & Dynamic Prices (₹)
                  </label>
                  <button
                    type="button"
                    onClick={addWeightRow}
                    className="text-[11px] text-[#7B243B] font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Weight Tier
                  </button>
                </div>

                <div className="space-y-2">
                  {weights.map((wt, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white p-2.5 rounded-xl border border-[#E8DACD]">
                      <input
                        type="text"
                        value={wt.label}
                        onChange={(e) => handleWeightChange(idx, 'label', e.target.value)}
                        placeholder="Label (e.g. 500g / 750g / 1 Kg)"
                        className="w-full sm:w-36 px-2 py-1 text-xs border rounded-lg font-medium"
                      />
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-emerald-800 font-bold">Offer ₹</span>
                          <input
                            type="number"
                            value={wt.price}
                            onChange={(e) => handleWeightChange(idx, 'price', Number(e.target.value))}
                            placeholder="Offer"
                            className="w-20 px-2 py-1 text-xs border rounded-lg font-bold text-[#7B243B]"
                          />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-stone-400">Cut MRP ₹</span>
                          <input
                            type="number"
                            value={wt.originalPrice || ''}
                            onChange={(e) => handleWeightChange(idx, 'originalPrice', Number(e.target.value))}
                            placeholder="e.g. 750"
                            className="w-20 px-2 py-1 text-xs border rounded-lg text-stone-500 line-through"
                          />
                        </div>
                      </div>
                      <input
                        type="text"
                        value={wt.servings || ''}
                        onChange={(e) => handleWeightChange(idx, 'servings', e.target.value)}
                        placeholder="Servings (e.g. Serves 6-8 लोग)"
                        className="flex-1 px-2 py-1 text-xs border rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeWeightRow(idx)}
                        disabled={weights.length <= 1}
                        className="text-stone-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer p-1 self-end sm:self-center"
                        title="Remove weight tier"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Flavours List */}
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  Flavours (Comma separated)
                </label>
                <input
                  type="text"
                  value={flavoursInput}
                  onChange={(e) => setFlavoursInput(e.target.value)}
                  placeholder="e.g. Dark Chocolate Ganache, Nutella (+₹60), Choco Mocha"
                  className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                />
              </div>

              {/* Flags: Combo, Bestseller, New */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isCombo}
                    onChange={(e) => setIsCombo(e.target.checked)}
                    className="w-4 h-4 text-[#7B243B] rounded"
                  />
                  <span className="font-semibold text-stone-800">Is Combo Offer</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isBestseller}
                    onChange={(e) => setIsBestseller(e.target.checked)}
                    className="w-4 h-4 text-[#7B243B] rounded"
                  />
                  <span className="font-semibold text-stone-800">Bestseller Tag</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded-xl border border-stone-200 cursor-pointer hover:bg-stone-50">
                  <input
                    type="checkbox"
                    checked={isNew}
                    onChange={(e) => setIsNew(e.target.checked)}
                    className="w-4 h-4 text-[#7B243B] rounded"
                  />
                  <span className="font-semibold text-stone-800">New Launch</span>
                </label>
              </div>

              {/* If isCombo, show combo includes detail */}
              {isCombo && (
                <div>
                  <label className="block font-semibold text-[#7B243B] mb-1">
                    What does this combo include? (Shown on card)
                  </label>
                  <input
                    type="text"
                    value={comboIncludes}
                    onChange={(e) => setComboIncludes(e.target.value)}
                    placeholder="e.g. 500g Cake + 4 Cupcakes + Sparkler Candle (Save ₹180)"
                    className="w-full px-3 py-1.5 bg-[#FFF6EE] border border-[#F5D8C1] rounded-xl focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
