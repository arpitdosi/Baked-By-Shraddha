import React, { useEffect } from 'react';
import { BakeryProvider, useBakery } from './context/BakeryContext';
import { BannerAnnouncement } from './components/BannerAnnouncement';
import { Header } from './components/Header';
import { HeroCombos } from './components/HeroCombos';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSubmissionModal } from './components/OrderSubmissionModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AdminPortalModal } from './components/AdminPortal/AdminPortalModal';
import { Footer } from './components/Footer';
import { 
  Sparkles, 
  Search, 
  Cake, 
  Heart, 
  ShieldCheck, 
  Phone,
  Flame,
  Gift
} from 'lucide-react';

const BakeryContent: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    searchQuery, 
    setSearchQuery, 
    storeSettings,
    setIsAdminOpen
  } = useBakery();

  // Keyboard shortcut listener: Ctrl + Shift + A or Cmd + Shift + A opens Admin Portal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminOpen]);

  // Filter products by search query and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.hindiName && product.hindiName.includes(searchQuery)) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.flavours.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'combos') return product.isCombo;
    return product.categoryId.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2C1810]">
      {/* 1. Very Top Banner for Offers & Combos (User requirement: "sabse uper uske dwara agar koi offer ya new combo launch hoga to wo dikhega") */}
      <BannerAnnouncement />

      {/* 2. Main Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Welcome Hero Greeting */}
        <section className="bg-gradient-to-b from-[#FFF5ED] via-[#FFF9F5] to-[#FFFDF9] py-8 sm:py-12 border-b border-[#F5E6DA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Pure Veg Badge Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold mb-4 shadow-2xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>100% Pure Veg (Eggless) • Handcrafted Fresh on Order</span>
            </div>

            <h2 className="font-display font-bold text-3xl sm:text-5xl text-[#3A141D] tracking-tight max-w-3xl mx-auto leading-tight">
              Homemade Cakes & Desserts Baked with Heart
            </h2>

            <p className="text-sm sm:text-base text-[#70483C] mt-3 max-w-2xl mx-auto leading-relaxed">
              Order customized artisan cakes, fresh pastries, gift cupcakes, and layered dessert jars for birthdays, anniversaries, and sweet everyday cravings.
            </p>

            {/* Quick trust metrics */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-6 text-xs text-[#5D3D33] font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Eggless Facility
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" /> Premium Amul Butter & Chocolate
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Fresh on Pre-Order
              </span>
            </div>
          </div>
        </section>

        {/* 3. Featured New Combo Launches & Festive Deals */}
        <HeroCombos />

        {/* 4. Category Filter Bar (Cakes, Pastry, Cup Cakes, Jar Cake, All, Combos) */}
        <div className="sticky top-[69px] z-30 bg-[#FFFDF9]/95 backdrop-blur-md py-1 border-b border-[#F0E2D8]">
          <CategoryFilter />
        </div>

        {/* 5. Products Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section header info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-stone-200/60 gap-2">
            <div>
              <h3 className="font-display font-bold text-2xl text-[#2C1810] capitalize">
                {activeCategory === 'all' 
                  ? 'All Bakery Delights' 
                  : activeCategory === 'combos' 
                  ? 'Celebration Combos & Party Bundles' 
                  : `${activeCategory} Collection`}
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Showing {filteredProducts.length} fresh item{filteredProducts.length > 1 ? 's' : ''} • Custom weight & flavours available
              </p>
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs bg-amber-50 text-amber-900 px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto">
                <Search className="w-3.5 h-3.5 text-amber-600" />
                <span>Search results for: "<strong>{searchQuery}</strong>"</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="font-bold underline ml-1 hover:text-stone-900 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Grid of Product Cards */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-stone-300 p-8 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-full bg-rose-50 text-[#7B243B] flex items-center justify-center mx-auto mb-3">
                <Search className="w-7 h-7" />
              </div>
              <h4 className="font-display font-bold text-lg text-stone-800">No bakery items found</h4>
              <p className="text-xs text-stone-500 mt-1">
                We couldn't find any cakes or desserts matching "{searchQuery}". Try searching for chocolate, rasmalai, red velvet, or clear the search.
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 rounded-xl bg-[#7B243B] text-white font-bold text-xs hover:bg-[#591C2B] transition-colors cursor-pointer"
              >
                Show All Menu Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* WhatsApp Direct Inquiry Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-3xl bg-gradient-to-r from-[#204E38] to-[#123826] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Customized Theme Cake Inquiries
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                Looking for a Custom Photo or Tier Cake?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                Have a reference picture from Pinterest or Instagram? Shraddha specializes in custom birthday themes, pinata cakes, and wedding anniversary hampers.
              </p>
            </div>

            <a
              href={`https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent('Hello Shraddha ji! I have a customized cake design inquiry for an upcoming celebration.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer shrink-0 active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      {/* Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <OrderSubmissionModal />
      <OrderSuccessModal />
      <AdminPortalModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <BakeryProvider>
      <BakeryContent />
    </BakeryProvider>
  );
}
