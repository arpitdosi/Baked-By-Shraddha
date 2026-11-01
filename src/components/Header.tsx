import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { 
  ShoppingBag, 
  Search, 
  Phone, 
  ShieldCheck, 
  Lock, 
  Heart,
  Sparkles,
  Cake
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

export const Header: React.FC = () => {
  const { 
    storeSettings, 
    cartCount, 
    cartSubtotal, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery,
    setIsAdminOpen,
    isAdminAuthenticated
  } = useBakery();

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#F0E2D8] shadow-xs transition-all">
      {/* Top micro bar for Veg Certification & Notice */}
      <div className="bg-[#FAF4ED] border-b border-[#EEDDCE]/60 text-xs py-1 px-4 text-[#665047]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Green Veg Dot Symbol */}
            <span className="w-4 h-4 border-2 border-emerald-700 p-0.5 rounded-xs flex items-center justify-center bg-white" title="100% Pure Veg & Eggless">
              <span className="w-2 h-2 rounded-full bg-emerald-600 block"></span>
            </span>
            <span className="font-semibold text-emerald-800 tracking-tight">100% Pure Veg (Eggless) Kitchen</span>
            <span className="hidden sm:inline text-stone-400">•</span>
            <span className="hidden sm:inline text-[#7D6459]">Freshly Homemade with Premium Ingredients</span>
          </div>

          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent('Namaste Shraddha ji! I have a question about ordering a cake.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span className="hidden xs:inline">WhatsApp Baker:</span>
              <span className="font-mono font-semibold">+{storeSettings.whatsappNumber}</span>
            </a>

            {/* Secret / Discreet Admin Button */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border transition-all cursor-pointer shadow-2xs bg-white hover:bg-[#7B243B] hover:text-white border-[#E4D1C3] text-stone-700"
              title="Baker Admin Portal (Password Protected)"
            >
              <Lock className={`w-3.5 h-3.5 ${isAdminAuthenticated ? 'text-emerald-600' : 'text-[#7B243B]'}`} />
              <span>{isAdminAuthenticated ? 'Admin Panel' : 'Baker Login'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative group shrink-0">
              <img 
                src="/logo.png" 
                alt="Baked by Shraddha Official Logo" 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-md border-2 border-[#E9C3A0] ring-2 ring-[#7B243B]/20 transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#3A141D]">
                  {storeSettings.shopName}
                </h1>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-[10px] font-bold border border-rose-200">
                  <Sparkles className="w-2.5 h-2.5 fill-rose-500 text-rose-500" /> Pure Veg Baker
                </span>
              </div>
              <p className="text-xs text-[#8A6A5E] font-medium line-clamp-1">
                {storeSettings.tagline}
              </p>
            </div>
          </div>

          {/* Search bar (Center / Desktop) */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, flavours, pastries, jar cakes..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-[#FAF5EE] border border-[#E9D9CB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7B243B]/30 focus:border-[#7B243B] transition-all placeholder:text-stone-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold px-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action: Install App & Cart button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <PWAInstallButton />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-[#7B243B] to-[#591C2B] hover:from-[#8E2843] hover:to-[#681E31] text-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              aria-label="View Order Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#F4A261] text-[#2C1810] text-[11px] font-black flex items-center justify-center ring-2 ring-[#7B243B] animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] font-medium text-rose-200 uppercase leading-none">Your Order</div>
                <div className="text-xs font-bold leading-tight">
                  {cartCount === 0 ? 'Empty' : `₹${cartSubtotal}`}
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 lg:hidden">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cakes, flavours, cupcakes..."
              className="w-full pl-10 pr-4 py-1.5 text-sm bg-[#FAF5EE] border border-[#E9D9CB] rounded-full focus:outline-none focus:ring-2 focus:ring-[#7B243B]/30 focus:border-[#7B243B] transition-all placeholder:text-stone-400"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 text-xs font-semibold px-1 rounded"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
