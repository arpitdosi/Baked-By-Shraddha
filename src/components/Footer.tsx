import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { 
  Heart, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Lock, 
  Cake, 
  Sparkles,
  Award,
  Clock
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { storeSettings, setIsAdminOpen, isAdminAuthenticated } = useBakery();

  return (
    <footer className="bg-[#261217] text-[#FFF4ED] pt-12 pb-8 border-t border-[#3D1D25] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-10 border-b border-[#3D1D25] text-xs">
          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">100% Pure Veg</div>
              <div className="text-[11px] text-[#D8B4A6]">Eggless certified kitchen</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-[#8F2D56]/60 text-rose-300 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 fill-rose-300" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Home Baked with Love</div>
              <div className="text-[11px] text-[#D8B4A6]">No commercial preservatives</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-amber-900/60 text-amber-300 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Premium Ingredients</div>
              <div className="text-[11px] text-[#D8B4A6]">Real butter & Belgian cocoa</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-blue-900/60 text-blue-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Fresh on Order</div>
              <div className="text-[11px] text-[#D8B4A6]">Baked fresh in oven</div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-[#3D1D25] text-xs">
          {/* Column 1: Brand story */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-[#7B243B] flex items-center justify-center text-white">
                <Cake className="w-4 h-4" />
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                {storeSettings.shopName}
              </h4>
            </div>
            <p className="text-[#C9A699] leading-relaxed">
              Started by passionate home baker Sharaddha, crafting sweet memories with 100% pure veg artisan cakes, pastries, cupcakes, and jar cakes. Every treat is baked from scratch only after you order.
            </p>
            <div className="mt-3 flex items-center gap-2 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>100% Pure Vegetarian & Eggless Kitchen</span>
            </div>
          </div>

          {/* Column 2: Categories & Specialities */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-3">
              Bakery Delights
            </h5>
            <ul className="space-y-1.5 text-[#C9A699]">
              <li>🎂 <strong>Cakes:</strong> Belgian Dark Truffle, Royal Rasmalai, Red Velvet</li>
              <li>🍰 <strong>Pastries:</strong> Dutch Chocolate, Black Forest, Blueberry</li>
              <li>🧁 <strong>Cupcakes:</strong> Box of 2, 4, 6 Assorted Delights</li>
              <li>🍯 <strong>Jar Cakes:</strong> Death-by-Chocolate, Red Velvet, Mango Fusion</li>
              <li>🎉 <strong>Celebration Combos:</strong> Cake + Cupcake Party Packs</li>
            </ul>
          </div>

          {/* Column 3: Contact & Pickup Details */}
          <div>
            <h5 className="font-bold uppercase tracking-wider text-white text-xs mb-3">
              Direct Contact & Kitchen Location
            </h5>
            <div className="space-y-2.5 text-[#C9A699]">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div>WhatsApp & Direct Order Line:</div>
                  <a 
                    href={`https://wa.me/${storeSettings.whatsappNumber}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    +{storeSettings.whatsappNumber}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div>Self Pickup Kitchen Address:</div>
                  <span className="text-stone-300">{storeSettings.pickupAddress}</span>
                  {storeSettings.googleMapsUrl && (
                    <div className="mt-1">
                      <a 
                        href={storeSettings.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-300 hover:text-blue-200 underline font-semibold inline-flex items-center gap-1"
                      >
                        📍 Open Google Maps (रास्ता देखें)
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Discreet Admin Portal Trigger */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#A68073]">
          <div>
            © {new Date().getFullYear()} {storeSettings.shopName}. Handcrafted with ❤️ for sweet celebrations.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#C9A699] hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Protected Baker Portal"
            >
              <Lock className="w-3 h-3 text-stone-400" />
              <span>{isAdminAuthenticated ? 'Admin Portal (Open)' : 'Baker Portal Login'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
