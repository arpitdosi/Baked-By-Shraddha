import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { AdminOrders } from './AdminOrders';
import { AdminProducts } from './AdminProducts';
import { AdminCategories } from './AdminCategories';
import { AdminOffers } from './AdminOffers';
import { AdminSettings } from './AdminSettings';
import { 
  Package, 
  Cake, 
  Tag, 
  Sparkles, 
  Settings, 
  LogOut, 
  X, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { 
    orders, 
    products, 
    offers, 
    storeSettings, 
    logoutAdmin 
  } = useBakery();

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'categories' | 'offers' | 'settings'>('orders');

  // Metrics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => ['new', 'confirmed', 'baking'].includes(o.status)).length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const inStockCount = products.filter(p => p.inStock).length;
  const activeOffersCount = offers.filter(o => o.isActive).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-[#FFFDFB] w-full max-w-5xl rounded-3xl shadow-2xl border border-[#F2DFD1] max-h-[95vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#F0E0D2] bg-[#FFF8F3] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#7B243B] text-white flex items-center justify-center font-display font-bold text-lg shadow-xs">
              BS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#2C1810]">
                  {storeSettings.shopName} - Baker Portal
                </h3>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  Admin Active
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Logged in as {storeSettings.ownerName} • Pure Veg Homemade Kitchen
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                logoutAdmin();
              }}
              className="px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Lock Admin Session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
              title="Close Portal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Stats Micro Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 px-6 py-3 bg-[#FAF5EE] border-b border-[#F0E2D6] text-xs">
          <div className="bg-white p-2.5 rounded-xl border border-[#EFE2D6] flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Pending Bakes</div>
              <div className="font-bold text-sm text-stone-800">{pendingOrders} orders</div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#EFE2D6] flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Total Bookings</div>
              <div className="font-bold text-sm text-stone-800">₹{totalRevenue} ({totalOrders})</div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#EFE2D6] flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Cake className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Catalog Items</div>
              <div className="font-bold text-sm text-stone-800">{inStockCount}/{products.length} In-Stock</div>
            </div>
          </div>

          <div className="bg-white p-2.5 rounded-xl border border-[#EFE2D6] flex items-center gap-2.5 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-stone-400">Active Banners</div>
              <div className="font-bold text-sm text-stone-800">{activeOffersCount} Offers Live</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#F0E0D2] bg-white px-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'orders'
                ? 'border-[#7B243B] text-[#7B243B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders Management</span>
            {pendingOrders > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#7B243B] text-white text-[10px] font-bold flex items-center justify-center">
                {pendingOrders}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'products'
                ? 'border-[#7B243B] text-[#7B243B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Cake className="w-4 h-4" />
            <span>Products & Prices</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'categories'
                ? 'border-[#7B243B] text-[#7B243B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Tag className="w-4 h-4" />
            <span>Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('offers')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'offers'
                ? 'border-[#7B243B] text-[#7B243B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Offers & Combos</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 font-semibold text-xs sm:text-sm border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-colors ${
              activeTab === 'settings'
                ? 'border-[#7B243B] text-[#7B243B]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings & Backup</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FFFDFB]">
          {activeTab === 'orders' && <AdminOrders />}
          {activeTab === 'products' && <AdminProducts />}
          {activeTab === 'categories' && <AdminCategories />}
          {activeTab === 'offers' && <AdminOffers />}
          {activeTab === 'settings' && <AdminSettings />}
        </div>
      </div>
    </div>
  );
};
