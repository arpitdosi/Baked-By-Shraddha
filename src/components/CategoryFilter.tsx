import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { Cake, Sparkles, Cookie, GlassWater, Gift, UtensilsCrossed } from 'lucide-react';

export const CategoryFilter: React.FC = () => {
  const { categories, products, activeCategory, setActiveCategory } = useBakery();

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return products.length;
    if (catId === 'combos') return products.filter(p => p.isCombo).length;
    return products.filter(p => p.categoryId.toLowerCase() === catId.toLowerCase()).length;
  };

  const getIcon = (id: string, iconName?: string) => {
    const key = (iconName || id).toLowerCase();
    if (key.includes('cake') && !key.includes('cup') && !key.includes('jar')) return Cake;
    if (key.includes('cup')) return Sparkles;
    if (key.includes('jar')) return GlassWater;
    if (key.includes('pastry') || key.includes('cookie')) return Cookie;
    if (key.includes('combo')) return Gift;
    return UtensilsCrossed;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {/* All items tab */}
        <button
          onClick={() => setActiveCategory('all')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'all'
              ? 'bg-[#7B243B] text-white shadow-md shadow-[#7B243B]/20 scale-[1.02]'
              : 'bg-white hover:bg-[#FAF4ED] text-[#6A4D42] border border-[#EEDDCE]'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>All Delights</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
            activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#F2E5D9] text-[#78594E]'
          }`}>
            {getCategoryCount('all')}
          </span>
        </button>

        {/* Combos Tab */}
        <button
          onClick={() => setActiveCategory('combos')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeCategory === 'combos'
              ? 'bg-[#7B243B] text-white shadow-md shadow-[#7B243B]/20 scale-[1.02]'
              : 'bg-[#FFF5EB] hover:bg-[#FFEEDB] text-[#8B3E14] border border-[#F5CBB0]'
          }`}
        >
          <Gift className="w-4 h-4 text-[#E76F51]" />
          <span>Combos & Deals</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
            activeCategory === 'combos' ? 'bg-white/20 text-white' : 'bg-[#F9DEC9] text-[#8B3E14]'
          }`}>
            {getCategoryCount('combos')}
          </span>
        </button>

        {/* Dynamic Categories (Cakes, Pastry, Cup Cakes, Jar Cake, + new categories) */}
        {categories.map((cat) => {
          const IconComponent = getIcon(cat.id, cat.iconName);
          const isSelected = activeCategory === cat.id;
          const count = getCategoryCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                isSelected
                  ? 'bg-[#7B243B] text-white shadow-md shadow-[#7B243B]/20 scale-[1.02]'
                  : 'bg-white hover:bg-[#FAF4ED] text-[#6A4D42] border border-[#EEDDCE]'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{cat.name}</span>
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[#F2E5D9] text-[#78594E]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
