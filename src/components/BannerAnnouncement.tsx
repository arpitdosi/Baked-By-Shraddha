import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, Tag, ChevronRight, Copy, Check, Gift } from 'lucide-react';

export const BannerAnnouncement: React.FC = () => {
  const { offers, applyPromo, setActiveCategory } = useBakery();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const activeOffers = offers.filter(o => o.isActive);

  if (activeOffers.length === 0) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyPromo(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-[#591C2B] via-[#7B243B] to-[#591C2B] text-[#FFF8F3] shadow-md border-b border-[#9A3B54]/40">
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2.5 text-xs sm:text-sm">
          {/* Main Tag & Title */}
          <div className="flex items-center gap-2 text-center md:text-left flex-wrap justify-center">
            <span className="inline-flex items-center gap-1 bg-[#F4A261] text-[#2C1810] font-bold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3 h-3 fill-[#2C1810]" />
              {activeOffers[0].highlightText}
            </span>
            <span className="font-medium text-rose-100">
              {activeOffers[0].title}: {activeOffers[0].description}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {activeOffers[0].promoCode && (
              <button
                onClick={() => handleCopy(activeOffers[0].promoCode!)}
                className="group inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 rounded-full font-mono text-xs font-semibold text-white transition-all cursor-pointer"
                title="Click to copy & apply code"
              >
                <Tag className="w-3 h-3 text-[#F4A261]" />
                <span>{activeOffers[0].promoCode}</span>
                {copiedCode === activeOffers[0].promoCode ? (
                  <Check className="w-3 h-3 text-emerald-300" />
                ) : (
                  <Copy className="w-3 h-3 text-white/70 group-hover:text-white" />
                )}
              </button>
            )}

            <button
              onClick={() => {
                setActiveCategory('cake');
                const combosSection = document.getElementById('combos-section');
                if (combosSection) {
                  combosSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#F4A261] hover:text-white transition-colors cursor-pointer underline underline-offset-2 decoration-[#F4A261]/60"
            >
              <Gift className="w-3.5 h-3.5" />
              <span>Explore Combos</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
