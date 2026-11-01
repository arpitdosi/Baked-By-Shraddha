import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  Check, 
  ArrowRight, 
  Sparkles,
  Truck,
  AlertCircle
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart, 
    cartSubtotal,
    appliedPromo,
    discountAmount,
    applyPromo,
    removePromo,
    storeSettings,
    setIsOrderFormOpen
  } = useBakery();

  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; success: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMessage({ text: result.message, success: result.success });
    if (result.success) {
      setPromoInput('');
    }
  };

  const deliveryThreshold = storeSettings.freeDeliveryAbove;
  const isFreeDelivery = cartSubtotal >= deliveryThreshold;
  const amountToFreeDelivery = Math.max(0, deliveryThreshold - cartSubtotal);
  const deliveryFee = isFreeDelivery ? 0 : storeSettings.standardDeliveryFee;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-[#F0DFD2]">
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#F0E0D2] bg-[#FFFBF7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7B243B] text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#2C1810]">
                  Your Bakery Basket
                </h3>
                <p className="text-xs text-stone-500">
                  {cart.length === 0 ? 'No items selected' : `${cart.length} item(s) • Pure Veg`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Delivery Bar */}
          {cart.length > 0 && (
            <div className="bg-[#FFF4EC] border-b border-[#F7DFD0] px-4 py-2.5 text-xs text-[#824424]">
              {isFreeDelivery ? (
                <div className="flex items-center gap-1.5 font-bold text-emerald-700">
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Congratulations! You unlocked FREE Home Delivery 🎉</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#E76F51] shrink-0" />
                  <span>
                    Add <strong className="font-bold text-[#7B243B]">₹{amountToFreeDelivery}</strong> more for <strong>FREE Delivery</strong>!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 text-[#7B243B] flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className="font-display font-bold text-lg text-stone-800">Your basket is empty</h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Browse Sharaddha's pure veg cakes, pastries, cupcakes, and dessert jars to add your favorites.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-5 py-2.5 rounded-full bg-[#7B243B] text-white text-xs font-bold shadow-md hover:bg-[#591C2B] transition-all cursor-pointer"
                >
                  Explore Bakery Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId}
                  className="flex gap-3 p-3 rounded-2xl border border-[#F0E2D6] bg-[#FFFDFB] hover:border-[#E0C9BA] transition-all"
                >
                  {/* Thumb image */}
                  <img 
                    src={item.image} 
                    alt={item.productName}
                    className="w-18 h-18 rounded-xl object-cover shrink-0 bg-stone-100"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h5 className="font-semibold text-xs sm:text-sm text-[#2C1810] line-clamp-1">
                        {item.productName}
                      </h5>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#7B243B] font-medium mt-0.5">
                      {item.selectedWeight.label} • {item.selectedFlavour}
                    </div>

                    {item.messageOnCake && (
                      <div className="text-[10px] text-stone-500 italic mt-0.5 line-clamp-1">
                        Message: "{item.messageOnCake}"
                      </div>
                    )}

                    {item.selectedAddOns.length > 0 && (
                      <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                        +{item.selectedAddOns.map(a => a.name).join(', ')}
                      </div>
                    )}

                    {/* Quantity & Item Total */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      <div className="flex items-center border border-[#E2D2C4] rounded-lg bg-white">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-bold text-xs text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 flex items-center justify-center text-stone-600 hover:bg-stone-100 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-display font-bold text-sm text-[#7B243B]">
                        ₹{item.itemTotal}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Promo & Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#F0E0D2] bg-[#FFFBF7] space-y-3">
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{appliedPromo.promoCode} applied (-₹{discountAmount})</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-stone-400 hover:text-stone-700 font-semibold text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Enter Promo Code (e.g. SWEET10)"
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E4D1C3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B] uppercase font-mono font-semibold"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-1.5 rounded-xl bg-[#7B243B] text-white text-xs font-bold hover:bg-[#591C2B] transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {promoMessage && (
                  <p className={`text-[11px] mt-1 ${promoMessage.success ? 'text-emerald-700 font-medium' : 'text-rose-600'}`}>
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-stone-900">₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({appliedPromo?.promoCode}):</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Home Delivery:</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'text-stone-900 font-semibold'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base font-bold text-[#2C1810] pt-2 border-t border-stone-200">
                  <span>Estimated Total:</span>
                  <span className="font-display text-lg text-[#7B243B]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsOrderFormOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7B243B] to-[#591C2B] hover:from-[#8E2843] hover:to-[#681E31] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Proceed to Order & WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-[11px] text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
              >
                Clear Basket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
