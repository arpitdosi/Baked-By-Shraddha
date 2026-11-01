import React, { useState, useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import { WeightOption, AddOnItem } from '../types/bakery';
import { INITIAL_ADDONS } from '../data/initialData';
import { 
  X, 
  Sparkles, 
  Check, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Clock, 
  ShieldCheck,
  Flame,
  Award,
  Heart,
  Utensils,
  Mail
} from 'lucide-react';

export const ProductModal: React.FC = () => {
  const { 
    selectedProductForDetail, 
    setSelectedProductForDetail, 
    addToCart, 
    setIsCartOpen 
  } = useBakery();

  const product = selectedProductForDetail;

  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(null);
  const [selectedFlavour, setSelectedFlavour] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [messageOnCake, setMessageOnCake] = useState<string>('');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnItem[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Initialize modal state when product changes
  useEffect(() => {
    if (product) {
      const defaultWt = product.weights.find(w => w.isDefault) || product.weights[0];
      setSelectedWeight(defaultWt);
      setSelectedFlavour(product.flavours[0] || 'Original');
      setQuantity(1);
      setMessageOnCake('');
      setSpecialInstructions('');
      setSelectedAddOns([]);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product || !selectedWeight) return null;

  const toggleAddOn = (addon: AddOnItem) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(prev => prev.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns(prev => [...prev, addon]);
    }
  };

  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const unitPrice = selectedWeight.price + addOnsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      cartItemId: `${product.id}_${selectedWeight.label}_${selectedFlavour}_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      image: product.image,
      selectedWeight: selectedWeight,
      selectedFlavour: selectedFlavour,
      quantity,
      messageOnCake: messageOnCake.trim() || undefined,
      specialInstructions: specialInstructions.trim() || undefined,
      selectedAddOns,
      itemTotal: totalPrice
    });

    setSelectedProductForDetail(null);
    setIsCartOpen(true);
  };

  const getAddOnIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-3.5 h-3.5 text-amber-500" />;
      case 'Award': return <Award className="w-3.5 h-3.5 text-yellow-500" />;
      case 'Heart': return <Heart className="w-3.5 h-3.5 text-rose-500" />;
      case 'Utensils': return <Utensils className="w-3.5 h-3.5 text-stone-600" />;
      default: return <Mail className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F2DFD1] overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0E0D2] bg-[#FFFBF7]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-emerald-700 p-0.5 rounded-xs flex items-center justify-center bg-white" title="100% Pure Veg (Eggless)">
              <span className="w-2 h-2 rounded-full bg-emerald-600 block"></span>
            </span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              100% Pure Veg & Eggless
            </span>
          </div>

          <button
            onClick={() => setSelectedProductForDetail(null)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Hero: Product Image & Overview */}
          {(() => {
            const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
            const currentImg = productImages[activeImageIndex] || productImages[0];

            return (
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="sm:w-5/12 flex flex-col gap-2 shrink-0">
                  <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-sm bg-stone-100 relative group">
                    <img
                      src={currentImg}
                      alt={`${product.name} photo ${activeImageIndex + 1}`}
                      className="w-full h-full object-cover transition-all duration-300"
                    />

                    {/* Navigation arrows if multiple images */}
                    {productImages.length > 1 && (
                      <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(prev => (prev === 0 ? productImages.length - 1 : prev - 1));
                          }}
                          className="w-7 h-7 rounded-full bg-white/85 hover:bg-white text-stone-800 flex items-center justify-center shadow-md pointer-events-auto transition-transform active:scale-90 cursor-pointer"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex(prev => (prev === productImages.length - 1 ? 0 : prev + 1));
                          }}
                          className="w-7 h-7 rounded-full bg-white/85 hover:bg-white text-stone-800 flex items-center justify-center shadow-md pointer-events-auto transition-transform active:scale-90 cursor-pointer"
                        >
                          ›
                        </button>
                      </div>
                    )}

                    {/* Image indicator badge */}
                    {productImages.length > 1 && (
                      <div className="absolute top-2 right-2 bg-stone-900/70 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {activeImageIndex + 1} / {productImages.length}
                      </div>
                    )}

                    <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#F4A261]" />
                      <span>Ready in {product.preparationTimeHours}h</span>
                    </div>
                  </div>

                  {/* Thumbnail Row (Up to 4 images) */}
                  {productImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-1.5">
                      {productImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                            activeImageIndex === idx 
                              ? 'border-[#7B243B] ring-2 ring-[#7B243B]/20 scale-98 shadow-xs' 
                              : 'border-stone-200 opacity-60 hover:opacity-100 hover:border-stone-400'
                          }`}
                        >
                          <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

            <div className="sm:w-7/12 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#2C1810] leading-tight">
                  {product.name}
                </h3>
                {product.hindiName && (
                  <p className="text-xs text-[#9B6A5B] font-medium mt-1">{product.hindiName}</p>
                )}
                {/* 100% Pure Veg badge */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="w-3.5 h-3.5 border-2 border-emerald-700 p-0.5 rounded-xs flex items-center justify-center bg-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block"></span>
                  </span>
                  <span className="text-xs font-semibold text-emerald-800">100% Pure Veg & Eggless Kitchen</span>
                </div>
              </div>

              {product.comboIncludes && (
                <div className="mt-3 p-2.5 rounded-xl bg-[#FFF6EE] border border-[#F5D8C1] text-xs text-[#7B243B] font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F4A261] shrink-0" />
                  <span>Combo includes: {product.comboIncludes}</span>
                </div>
              )}
            </div>
          </div>
            );
          })()}

          {/* 1. Weight / Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>1. Select Weight / Size</span>
                <span className="text-rose-600">*</span>
              </label>
              {selectedWeight.servings && (
                <span className="text-xs text-[#7B243B] font-bold bg-[#FFF2F5] px-2.5 py-1 rounded-full border border-rose-100">
                  👥 {selectedWeight.servings}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {product.weights.map((wt) => {
                const isSelected = selectedWeight.label === wt.label;
                const optCutPrice = wt.originalPrice || Math.round(wt.price * 1.35);
                return (
                  <button
                    key={wt.label}
                    type="button"
                    onClick={() => setSelectedWeight(wt)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-2 ring-[#7B243B]/20 shadow-xs'
                        : 'border-[#E8DACD] hover:border-stone-400 bg-white text-stone-700'
                    }`}
                  >
                    <div className="text-xs font-semibold truncate">{wt.label}</div>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className={`text-sm font-display ${isSelected ? 'text-[#7B243B] font-bold' : 'text-stone-900 font-semibold'}`}>
                        ₹{wt.price}
                      </span>
                      <span className="line-through text-[10px] text-stone-400">
                        ₹{optCutPrice}
                      </span>
                    </div>
                    {wt.servings && (
                      <div className="text-[10px] text-stone-500 mt-1 truncate">
                        {wt.servings}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Flavour Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              2. Select Cake Flavour <span className="text-rose-600">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.flavours.map((flav) => {
                const isSelected = selectedFlavour === flav;
                return (
                  <button
                    key={flav}
                    type="button"
                    onClick={() => setSelectedFlavour(flav)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#7B243B] text-white border-[#7B243B] shadow-xs'
                        : 'bg-[#FAF5EE] text-stone-700 border-[#E8DACD] hover:border-stone-400'
                    }`}
                  >
                    {flav}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Name or Message on Cake */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
              3. Message / Name on Cake (Optional)
            </label>
            <input
              type="text"
              value={messageOnCake}
              onChange={(e) => setMessageOnCake(e.target.value)}
              placeholder="e.g., Happy 25th Birthday Priya! / Best Mom Ever ❤️"
              maxLength={40}
              className="w-full px-3.5 py-2 text-sm bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7B243B]/30 focus:border-[#7B243B] placeholder:text-stone-400"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>Baker will hand-pipe this on top of the cake or on chocolate plaque</span>
              <span>{messageOnCake.length}/40</span>
            </div>
          </div>

          {/* 4. Celebration Add-ons */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
              4. Add Party Essentials (Optional)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {INITIAL_ADDONS.map((addon) => {
                const isChecked = selectedAddOns.some(a => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      isChecked
                        ? 'border-[#7B243B] bg-[#FFF5F7] text-[#7B243B] font-semibold'
                        : 'border-[#EAE0D6] bg-white text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md border flex items-center justify-center transition-colors">
                        {isChecked ? (
                          <div className="w-full h-full bg-[#7B243B] rounded-md flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-stone-100 rounded-md" />
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        {getAddOnIcon(addon.icon)}
                        <span>{addon.name}</span>
                      </div>
                    </div>
                    <span className="font-bold">+₹{addon.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. Special Notes for Shraddha */}
          <div>
            <label className="block text-xs font-bold text-stone-800 uppercase tracking-wider mb-1.5">
              5. Special Request for Baker Shraddha
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Please make it mild sweet / add extra chocolate curls / eggless guarantee"
              className="w-full px-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
            />
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-4 bg-[#FFF8F3] border-t border-[#F0E0D2] flex items-center justify-between gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#E2D2C4] rounded-xl bg-white p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-stone-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Pricing & Add Button */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] uppercase font-semibold text-stone-400">Total</div>
              <div className="text-xl font-display font-bold text-[#7B243B]">
                ₹{totalPrice}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="px-6 py-3 rounded-2xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
