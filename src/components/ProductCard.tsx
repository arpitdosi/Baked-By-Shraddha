import React, { useState } from 'react';
import { Product, WeightOption } from '../types/bakery';
import { useBakery } from '../context/BakeryContext';
import { 
  Sparkles, 
  ShoppingBag, 
  Clock, 
  Check, 
  Star,
  SlidersHorizontal
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProductForDetail, addToCart, setIsCartOpen } = useBakery();

  // Selected weight state (defaults to product default or 1st weight)
  const defaultWeight = product.weights.find(w => w.isDefault) || product.weights[0];
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(defaultWeight);

  // Selected flavour state
  const [selectedFlavour, setSelectedFlavour] = useState<string>(product.flavours[0] || 'Original');

  // Multi-image handling
  const productImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  // Added animation notification
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = () => {
    if (!product.inStock) return;

    addToCart({
      cartItemId: `${product.id}_${selectedWeight.label}_${selectedFlavour}_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      image: productImages[0] || product.image,
      selectedWeight: selectedWeight,
      selectedFlavour: selectedFlavour,
      quantity: 1,
      selectedAddOns: [],
      itemTotal: selectedWeight.price
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className={`group bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
      product.inStock 
        ? 'border-[#EEDDCE] hover:border-[#7B243B]/40 hover:shadow-xl hover:-translate-y-1' 
        : 'border-stone-200 opacity-75 bg-stone-50'
    }`}>
      {/* Product Image Section */}
      <div 
        onClick={() => setSelectedProductForDetail(product)}
        className="relative aspect-4/3 w-full overflow-hidden bg-stone-100 cursor-pointer"
      >
        <img
          src={productImages[currentImgIdx] || productImages[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Veg Badge (Standard Indian Square Green Dot) */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-1 rounded-sm border border-emerald-600 shadow-xs flex items-center justify-center" title="100% Pure Veg (Eggless)">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block"></span>
        </div>

        {/* Multi-Photo Count Badge */}
        {productImages.length > 1 && (
          <span className="absolute top-3 left-10 bg-stone-900/60 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
            📷 {productImages.length}
          </span>
        )}

        {/* Mini dot indicators if multiple images */}
        {productImages.length > 1 && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10 bg-stone-950/40 backdrop-blur-xs px-1.5 py-1 rounded-full">
            {productImages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImgIdx(i);
                }}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentImgIdx === i ? 'bg-white w-3' : 'bg-white/50 w-1.5 hover:bg-white'
                }`}
                title={`Photo ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {product.isBestseller && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950 font-bold text-[10px] shadow-sm uppercase tracking-wider">
              <Star className="w-3 h-3 fill-stone-950" /> Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#7B243B] text-white font-bold text-[10px] shadow-sm uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-[#F4A261]" /> New Launch
            </span>
          )}
          {product.isCombo && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E76F51] text-white font-bold text-[10px] shadow-sm uppercase tracking-wider">
              Combo Saver
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <span className="bg-white/95 text-stone-900 font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
              Sold Out Today
            </span>
          </div>
        )}

        {/* Preparation Time Notice */}
        <div className="absolute bottom-2 right-2 bg-stone-900/75 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <Clock className="w-2.5 h-2.5 text-[#F4A261]" />
          <span>Fresh in {product.preparationTimeHours}h</span>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Hindi Subtitle */}
          <h3 
            onClick={() => setSelectedProductForDetail(product)}
            className="font-display font-bold text-base sm:text-lg text-[#2C1810] leading-snug group-hover:text-[#7B243B] transition-colors cursor-pointer"
          >
            {product.name}
          </h3>
          {product.hindiName && (
            <p className="text-xs text-[#9B6A5B] font-medium mt-0.5">{product.hindiName}</p>
          )}

          {/* Weight Selection with Dynamic Price & Servings */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="font-semibold text-stone-700">Choose Weight / Size:</span>
              {selectedWeight.servings && (
                <span className="text-[#8F2D56] font-semibold bg-[#FFF2F5] px-2 py-0.5 rounded-full text-[10px]">
                  👥 {selectedWeight.servings}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {product.weights.map((wt) => {
                const isSelected = selectedWeight.label === wt.label;
                const optCutPrice = wt.originalPrice || Math.round(wt.price * 1.35);
                return (
                  <button
                    key={wt.label}
                    type="button"
                    onClick={() => setSelectedWeight(wt)}
                    className={`px-2 py-1.5 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold shadow-2xs ring-1 ring-[#7B243B]'
                        : 'border-[#E8DACD] hover:border-stone-400 bg-white text-stone-700'
                    }`}
                  >
                    <div className="truncate font-medium">{wt.label}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className={`text-[11px] font-bold ${isSelected ? 'text-[#7B243B]' : 'text-stone-800'}`}>
                        ₹{wt.price}
                      </span>
                      <span className="line-through text-[10px] text-stone-400">
                        ₹{optCutPrice}
                      </span>
                    </div>
                    {wt.servings && (
                      <div className="text-[9px] text-stone-400 truncate mt-0.5">
                        {wt.servings}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Flavour Dropdown Selection */}
          {product.flavours.length > 1 && (
            <div className="mt-2.5">
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Flavour Choice:
              </label>
              <select
                value={selectedFlavour}
                onChange={(e) => setSelectedFlavour(e.target.value)}
                className="w-full text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl px-2.5 py-1.5 text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#7B243B] cursor-pointer"
              >
                {product.flavours.map(flav => (
                  <option key={flav} value={flav}>{flav}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Pricing & Add to Cart Section with Cut Price */}
        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="line-through text-stone-400 text-xs font-normal">
                ₹{selectedWeight.originalPrice || Math.round(selectedWeight.price * 1.35)}
              </span>
              <span className="text-xl font-display font-bold text-[#7B243B] tracking-tight">
                ₹{selectedWeight.price}
              </span>
            </div>
            {(() => {
              const orig = selectedWeight.originalPrice || Math.round(selectedWeight.price * 1.35);
              const save = Math.max(0, orig - selectedWeight.price);
              const pct = Math.round((save / orig) * 100);
              return save > 0 ? (
                <div className="mt-0.5">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full inline-block">
                    Save ₹{save} ({pct}% OFF)
                  </span>
                </div>
              ) : null;
            })()}
          </div>

          <div className="flex items-center gap-2">
            {/* Customization Details Modal Trigger */}
            <button
              onClick={() => setSelectedProductForDetail(product)}
              className="p-2 rounded-xl border border-[#E4CEBD] hover:border-[#7B243B] hover:text-[#7B243B] text-stone-600 transition-colors cursor-pointer"
              title="Custom message on cake, toppers & candles"
              aria-label="Customize"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Quick Add Button */}
            <button
              onClick={handleQuickAdd}
              disabled={!product.inStock}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                justAdded
                  ? 'bg-emerald-600 text-white shadow-md'
                  : product.inStock
                  ? 'bg-[#7B243B] hover:bg-[#591C2B] text-white shadow-xs hover:shadow-md active:scale-95'
                  : 'bg-stone-300 text-stone-500 cursor-not-allowed'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
