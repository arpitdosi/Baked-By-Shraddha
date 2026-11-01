import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { OfferBanner } from '../../types/bakery';
import { Sparkles, Plus, Trash2, Edit2, Check, X, Tag, ToggleLeft, ToggleRight, Gift } from 'lucide-react';

export const AdminOffers: React.FC = () => {
  const { offers, updateOffers } = useBakery();
  const [isAdding, setIsAdding] = useState(false);

  // New offer form state
  const [title, setTitle] = useState('');
  const [highlightText, setHighlightText] = useState('FLAT 15% OFF');
  const [description, setDescription] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(10);
  const [minOrderValue, setMinOrderValue] = useState<number>(500);
  const [bannerType, setBannerType] = useState<'offer' | 'combo' | 'announcement'>('offer');

  const handleToggleOffer = (id: string) => {
    const updated = offers.map(o => o.id === id ? { ...o, isActive: !o.isActive } : o);
    updateOffers(updated);
  };

  const handleDeleteOffer = (id: string) => {
    if (offers.length <= 1) {
      alert('Please keep at least one active announcement or offer banner.');
      return;
    }
    const updated = offers.filter(o => o.id !== id);
    updateOffers(updated);
  };

  const handleAddOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newOffer: OfferBanner = {
      id: `offer_${Date.now()}`,
      title: title.trim(),
      highlightText: highlightText.trim() || 'SPECIAL',
      description: description.trim(),
      promoCode: promoCode.trim() ? promoCode.trim().toUpperCase() : undefined,
      discountPercentage: discountPercentage > 0 ? Number(discountPercentage) : undefined,
      minOrderValue: minOrderValue > 0 ? Number(minOrderValue) : undefined,
      bannerType,
      isActive: true
    };

    updateOffers([newOffer, ...offers]);
    setTitle('');
    setDescription('');
    setPromoCode('');
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FFFBF7] p-3 rounded-2xl border border-[#F0E2D6]">
        <div>
          <h4 className="font-display font-bold text-sm text-[#2C1810]">
            Top Announcements & Combo Launch Banners
          </h4>
          <p className="text-xs text-stone-500">
            Active offers appear instantly at the very top of the customer store link.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-3.5 py-1.5 rounded-xl bg-[#7B243B] hover:bg-[#591C2B] text-white font-bold text-xs shadow-sm flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Launch New Banner / Promo</span>
        </button>
      </div>

      {/* Add New Offer Modal/Form */}
      {isAdding && (
        <form onSubmit={handleAddOffer} className="bg-white p-4 rounded-2xl border border-[#7B243B]/30 shadow-md space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <h5 className="font-bold text-stone-800 text-xs flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F4A261]" />
              <span>Create Top Banner Promo</span>
            </h5>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-stone-400 hover:text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Banner Type</label>
              <select
                value={bannerType}
                onChange={(e) => setBannerType(e.target.value as any)}
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-semibold"
              >
                <option value="offer">Discount Promo Offer</option>
                <option value="combo">Combo Deal Launch</option>
                <option value="announcement">Hygienic Bakery Announcement</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Highlight Badge Text</label>
              <input
                type="text"
                required
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
                placeholder="e.g. FLAT 10% OFF / WEEKEND COMBO"
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Banner Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Festival Special Offer"
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">Banner Details / Description</label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Order 500g Dutch Truffle Cake + 2 Cupcakes at ₹649 today!"
              className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Promo Code (Optional)</label>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="e.g. DIWALI15"
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl font-mono uppercase font-bold"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Discount % (if code used)</label>
              <input
                type="number"
                min={0}
                max={90}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">Min Order Value (₹)</label>
              <input
                type="number"
                min={0}
                value={minOrderValue}
                onChange={(e) => setMinOrderValue(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1 rounded-lg border border-stone-200 text-stone-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#7B243B] text-white font-bold cursor-pointer shadow-xs"
            >
              Publish Banner
            </button>
          </div>
        </form>
      )}

      {/* Existing Banners List */}
      <div className="space-y-3">
        {offers.map((offer) => (
          <div 
            key={offer.id} 
            className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
              offer.isActive 
                ? 'bg-white border-[#EEDDCE] shadow-xs' 
                : 'bg-stone-50 border-stone-200 opacity-60'
            }`}
          >
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#F4A261] text-[#2C1810] font-bold px-2 py-0.5 rounded-md text-[10px] uppercase">
                  {offer.highlightText}
                </span>
                <span className="font-bold text-stone-800 text-sm">{offer.title}</span>
                {offer.promoCode && (
                  <span className="font-mono bg-stone-100 text-stone-800 px-2 py-0.5 rounded border border-stone-200 font-bold">
                    Code: {offer.promoCode} ({offer.discountPercentage}% OFF)
                  </span>
                )}
              </div>
              <p className="text-stone-600 mt-1">{offer.description}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
              <button
                onClick={() => handleToggleOffer(offer.id)}
                className={`px-3 py-1 rounded-xl font-semibold flex items-center gap-1 cursor-pointer ${
                  offer.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                }`}
              >
                {offer.isActive ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <X className="w-3.5 h-3.5" />}
                <span>{offer.isActive ? 'Active on Top' : 'Hidden'}</span>
              </button>

              <button
                onClick={() => handleDeleteOffer(offer.id)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                title="Delete Offer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
