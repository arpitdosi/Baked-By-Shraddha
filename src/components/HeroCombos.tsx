import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { Product } from '../types/bakery';
import { Sparkles, Gift, CheckCircle, ArrowRight, Star } from 'lucide-react';

export const HeroCombos: React.FC = () => {
  const { products, setSelectedProductForDetail, addToCart, setIsCartOpen } = useBakery();

  // Find products that are marked as combo or bestseller combos
  const comboProducts = products.filter(p => p.isCombo && p.inStock);

  if (comboProducts.length === 0) return null;

  const handleQuickAdd = (product: Product) => {
    const defaultWeight = product.weights.find(w => w.isDefault) || product.weights[0];
    const defaultFlavour = product.flavours[0] || 'Original';

    addToCart({
      cartItemId: `quick_${product.id}_${Date.now()}`,
      productId: product.id,
      productName: product.name,
      image: product.image,
      selectedWeight: defaultWeight,
      selectedFlavour: defaultFlavour,
      quantity: 1,
      selectedAddOns: [],
      itemTotal: defaultWeight.price
    });

    setIsCartOpen(true);
  };

  return (
    <section id="combos-section" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFF2E6] via-[#FFEADB] to-[#FCE2D6] border border-[#F3C7B0] p-6 sm:p-8 shadow-sm">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-[#F4A261]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-[#7B243B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7B243B] text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-xs">
              <Gift className="w-3.5 h-3.5 text-[#F4A261]" />
              Special Combo & Launch Deals
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-[#3A141D]">
              Baker Shraddha's Celebration Combos
            </h2>
            <p className="text-sm text-[#734A3E] mt-1 max-w-xl">
              Hand-picked party bundles featuring our bestselling cakes, jar cakes, and fluffy cupcakes at exclusive launch savings. 100% Pure Veg.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-white/80 backdrop-blur-xs px-3.5 py-2 rounded-2xl border border-emerald-200 self-start sm:self-auto shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Eggless • Baked Fresh on Pre-Order</span>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {comboProducts.map((combo) => {
            const defaultWeight = combo.weights[0];
            return (
              <div 
                key={combo.id}
                className="bg-white/95 rounded-2xl overflow-hidden border border-[#EED7C5] hover:border-[#7B243B]/40 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row group"
              >
                {/* Image Section */}
                <div className="sm:w-5/12 relative aspect-4/3 sm:aspect-auto overflow-hidden bg-stone-100">
                  <img 
                    src={combo.image} 
                    alt={combo.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    <span className="bg-[#7B243B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#F4A261]" /> Combo Offer
                    </span>
                    {combo.isBestseller && (
                      <span className="bg-amber-500 text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-stone-900" /> Top Value
                      </span>
                    )}
                  </div>
                  {/* Veg indicator badge */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-xs p-1 rounded-sm border border-emerald-600 shadow-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block"></span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5 sm:w-7/12 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#2C1810] leading-snug group-hover:text-[#7B243B] transition-colors">
                      {combo.name}
                    </h3>
                    {combo.hindiName && (
                      <p className="text-xs text-[#9B6A5B] font-medium mt-0.5">{combo.hindiName}</p>
                    )}
                    {/* What's included highlight box */}
                    {combo.comboIncludes && (
                      <div className="mt-3 p-2.5 rounded-xl bg-[#FFF6EE] border border-[#F3DFC9] text-xs text-[#7B243B] font-semibold flex items-start gap-1.5 shadow-2xs">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Combo Includes: {combo.comboIncludes}</span>
                      </div>
                    )}
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="line-through text-stone-400 text-xs">
                          ₹{defaultWeight.originalPrice || Math.round(defaultWeight.price * 1.35)}
                        </span>
                        <div className="text-xl font-bold font-display text-[#7B243B]">
                          ₹{defaultWeight.price}
                        </div>
                      </div>
                      <div className="text-[10px] text-emerald-700 font-bold">
                        Save ₹{Math.max(0, (defaultWeight.originalPrice || Math.round(defaultWeight.price * 1.35)) - defaultWeight.price)} • {defaultWeight.label}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedProductForDetail(combo)}
                        className="px-3 py-1.5 rounded-xl border border-[#7B243B] text-[#7B243B] hover:bg-[#7B243B]/5 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Customize
                      </button>
                      <button
                        onClick={() => handleQuickAdd(combo)}
                        className="px-3.5 py-1.5 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <span>Add</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
