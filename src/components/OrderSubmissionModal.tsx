import React, { useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { formatCustomerWhatsAppMessage, getCleanPhoneNumber } from '../utils/whatsapp';
import { 
  X, 
  MapPin, 
  Phone, 
  User, 
  Calendar, 
  Clock, 
  Send, 
  ShieldCheck, 
  QrCode, 
  Truck, 
  Store,
  CreditCard,
  CheckCircle,
  Copy,
  Sparkles
} from 'lucide-react';

export const OrderSubmissionModal: React.FC = () => {
  const { 
    isOrderFormOpen, 
    setIsOrderFormOpen, 
    cart, 
    cartSubtotal, 
    discountAmount, 
    appliedPromo, 
    storeSettings, 
    submitOrder,
    orders
  } = useBakery();

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home_delivery' | 'self_pickup'>('home_delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [landmark, setLandmark] = useState('');

  // Default to today or tomorrow
  const todayStr = new Date().toISOString().split('T')[0];
  const [deliveryDate, setDeliveryDate] = useState(todayStr);
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Evening (5:00 PM - 8:30 PM)');
  const [paymentMethod, setPaymentMethod] = useState<'upi_advance' | 'upi_on_delivery' | 'cash_on_pickup'>('upi_advance');
  const [notesForBaker, setNotesForBaker] = useState('');

  const [copiedUpi, setCopiedUpi] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Clean phone and check for First-Time Customer status (Point 4)
  const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
  const isPhoneValid = cleanPhone.length >= 10;

  const hasOrderedBefore = React.useMemo(() => {
    if (!isPhoneValid) return false;
    const inOrders = orders.some(o => o.customerPhone.replace(/[^0-9]/g, '') === cleanPhone);
    let inLocalUsed = false;
    try {
      const usedPhones = JSON.parse(localStorage.getItem('bbs_used_welcome_phones_v1') || '[]');
      inLocalUsed = usedPhones.includes(cleanPhone);
    } catch {}
    return inOrders || inLocalUsed;
  }, [cleanPhone, isPhoneValid, orders]);

  // Welcome discount is 10% (or from storeSettings)
  const isEligibleForWelcome = isPhoneValid && !hasOrderedBefore;
  const welcomePct = storeSettings.welcomeDiscountPercent || 10;
  const welcomeDiscountVal = isEligibleForWelcome ? Math.round((cartSubtotal * welcomePct) / 100) : 0;

  // Final effective discount:
  const finalDiscount = isEligibleForWelcome 
    ? Math.max(welcomeDiscountVal, discountAmount) 
    : discountAmount;

  if (!isOrderFormOpen) return null;

  const isFreeDelivery = deliveryType === 'self_pickup' || cartSubtotal >= storeSettings.freeDeliveryAbove;
  const deliveryFee = isFreeDelivery ? 0 : storeSettings.standardDeliveryFee;
  const totalAmount = Math.max(0, cartSubtotal - finalDiscount + deliveryFee);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(storeSettings.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }

    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit WhatsApp phone number');
      return;
    }

    if (deliveryType === 'home_delivery' && !deliveryAddress.trim()) {
      setErrorMsg('Please enter your complete delivery address');
      return;
    }

    if (!deliveryDate) {
      setErrorMsg('Please choose your preferred delivery date');
      return;
    }

    // Submit order into system
    const submittedOrder = submitOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      deliveryType,
      deliveryAddress: deliveryType === 'home_delivery' ? deliveryAddress.trim() : undefined,
      landmark: landmark.trim() || undefined,
      deliveryDate,
      deliveryTimeSlot,
      items: cart,
      subtotal: cartSubtotal,
      discountAmount: finalDiscount,
      appliedPromoCode: isEligibleForWelcome ? `WELCOME${welcomePct}` : appliedPromo?.promoCode,
      deliveryFee,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod === 'upi_advance' ? 'pending' : 'pending',
      isFirstOrder: isEligibleForWelcome,
      notesForBaker: notesForBaker.trim() || undefined
    });

    // Record phone number so welcome discount is not reused (Point 4)
    if (isEligibleForWelcome) {
      try {
        const usedPhones = JSON.parse(localStorage.getItem('bbs_used_welcome_phones_v1') || '[]');
        if (!usedPhones.includes(cleanPhone)) {
          usedPhones.push(cleanPhone);
          localStorage.setItem('bbs_used_welcome_phones_v1', JSON.stringify(usedPhones));
        }
      } catch {}
    }

    // Format WhatsApp message and redirect to Sharaddha's WhatsApp
    const messageEncoded = formatCustomerWhatsAppMessage(submittedOrder, storeSettings);
    const targetBakerPhone = getCleanPhoneNumber(storeSettings.whatsappNumber);
    const whatsappUrl = `https://wa.me/${targetBakerPhone}?text=${messageEncoded}`;

    // Open WhatsApp in a new tab/window for customer
    try {
      window.open(whatsappUrl, '_blank');
    } catch {
      window.location.href = whatsappUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#F2DFD1] overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0E0D2] bg-[#FFFBF7]">
          <div>
            <h3 className="font-display font-bold text-xl text-[#2C1810]">
              Complete Your Bakery Order
            </h3>
            <p className="text-xs text-stone-500">
              Freshly baked on order by Sharaddha • 100% Pure Veg
            </p>
          </div>

          <button
            onClick={() => setIsOrderFormOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Section 1: Customer Info */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#7B243B]" />
              <span>1. Customer & Contact Details</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  WhatsApp Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="10-digit number e.g. 9974787033"
                    className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>

                {/* 1st Order Auto-Detection Banner (Point 4) */}
                {isPhoneValid && isEligibleForWelcome && (
                  <div className="mt-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5 animate-in fade-in">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                    <span>🎉 First Order Welcome Discount: {welcomePct}% OFF automatically applied (-₹{welcomeDiscountVal})!</span>
                  </div>
                )}

                {isPhoneValid && hasOrderedBefore && (
                  <div className="mt-2 p-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-600 text-[11px] font-medium flex items-center gap-1.5">
                    <span>👋 Welcome back! (Welcome offer already claimed on this number • Standard pricing applied)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery or Self Pickup */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#7B243B]" />
              <span>2. Delivery Mode</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <button
                type="button"
                onClick={() => setDeliveryType('home_delivery')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  deliveryType === 'home_delivery'
                    ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-1 ring-[#7B243B]'
                    : 'border-[#E8DACD] bg-white text-stone-700'
                }`}
              >
                <Truck className="w-5 h-5 text-[#7B243B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs">Doorstep Delivery</div>
                  <div className="text-[11px] font-normal text-stone-500 mt-0.5">
                    {deliveryFee === 0 ? 'FREE on this order' : `Standard fee: ₹${deliveryFee}`}
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryType('self_pickup')}
                className={`p-3 rounded-2xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                  deliveryType === 'self_pickup'
                    ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-1 ring-[#7B243B]'
                    : 'border-[#E8DACD] bg-white text-stone-700'
                }`}
              >
                <Store className="w-5 h-5 text-[#7B243B] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs">Direct Self Pickup</div>
                  <div className="text-[11px] font-normal text-emerald-700 font-semibold mt-0.5">
                    FREE • Collect from Baker
                  </div>
                </div>
              </button>
            </div>

            {deliveryType === 'home_delivery' ? (
              <div className="space-y-3 bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#E8DACD]">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Complete Street Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="House/Flat No., Building/Society name, Street, Colony..."
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Nearby Landmark
                  </label>
                  <input
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder="e.g., Near Apollo Pharmacy / Behind Lotus Temple"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#E8DACD] text-xs">
                <div className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7B243B]" />
                  <span>Baker Sharaddha's Kitchen Pickup Point:</span>
                </div>
                <p className="text-stone-600 mt-1 pl-5">
                  {storeSettings.pickupAddress}
                </p>
                <p className="text-[11px] text-stone-400 mt-1 pl-5">
                  (Exact location pin & gate instructions will be sent on WhatsApp upon confirmation)
                </p>

                {/* Google Maps Live Navigation Button (Point 3) */}
                {storeSettings.googleMapsUrl && (
                  <div className="mt-2.5 pl-5">
                    <a
                      href={storeSettings.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <MapPin className="w-3.5 h-3.5 fill-white text-white" />
                      <span>📍 Open in Google Maps (सीधा रास्ता देखें)</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Section 3: Date & Time Slot */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#7B243B]" />
              <span>3. Desired Date & Time Slot</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Delivery / Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  min={todayStr}
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Time Slot *
                </label>
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
                >
                  <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                  <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                  <option value="Evening (5:00 PM - 8:30 PM)">Evening (5:00 PM - 8:30 PM)</option>
                  <option value="Midnight Celebration (10:30 PM - 11:45 PM)">Midnight Celebration (10:30 PM - 11:45 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Payment Preference */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-[#7B243B]" />
              <span>4. Payment Option</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi_advance')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  paymentMethod === 'upi_advance'
                    ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-1 ring-[#7B243B]'
                    : 'border-[#E8DACD] bg-white text-stone-700'
                }`}
              >
                <div className="font-bold">UPI Advance (GPay / PhonePe / Paytm)</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Quick & Confirmed bake</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi_on_delivery')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  paymentMethod === 'upi_on_delivery'
                    ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-1 ring-[#7B243B]'
                    : 'border-[#E8DACD] bg-white text-stone-700'
                }`}
              >
                <div className="font-bold">UPI on Delivery</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Scan QR on arrival</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cash_on_pickup')}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                  paymentMethod === 'cash_on_pickup'
                    ? 'border-[#7B243B] bg-[#FFF2F5] text-[#591C2B] font-bold ring-1 ring-[#7B243B]'
                    : 'border-[#E8DACD] bg-white text-stone-700'
                }`}
              >
                <div className="font-bold">Cash on Handover</div>
                <div className="text-[10px] text-stone-500 mt-0.5">Pay upon pickup/delivery</div>
              </button>
            </div>

            {/* UPI Info Card */}
            {paymentMethod === 'upi_advance' && storeSettings.upiId && (
              <div className="mt-3 p-3 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-emerald-800">Baker's Official UPI ID:</span>
                  <div className="font-mono font-bold text-emerald-950 text-sm">{storeSettings.upiId}</div>
                  <span className="text-[11px] text-emerald-700">You can pay via Google Pay, PhonePe, or Paytm after sending WhatsApp order.</span>
                </div>
                <button
                  type="button"
                  onClick={handleCopyUpi}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center gap-1 cursor-pointer"
                >
                  {copiedUpi ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Section 5: Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Any special message or instructions for Sharaddha? (Optional)
            </label>
            <input
              type="text"
              value={notesForBaker}
              onChange={(e) => setNotesForBaker(e.target.value)}
              placeholder="e.g. Please send extra birthday candles, call before leaving"
              className="w-full px-3.5 py-2 text-xs bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
            />
          </div>

          {/* Order Summary Box */}
          <div className="p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3DFC9] space-y-2">
            <h5 className="font-bold text-xs uppercase tracking-wider text-[#7B243B]">
              Order Summary ({cart.length} item{cart.length > 1 ? 's' : ''})
            </h5>
            <div className="space-y-1 text-xs text-stone-600">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between">
                  <span>{item.quantity}x {item.productName} ({item.selectedWeight.label})</span>
                  <span className="font-semibold text-stone-800">₹{item.itemTotal}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#F0D8C0] flex justify-between items-center text-sm font-bold text-[#2C1810]">
              <span>Final Total ({deliveryType === 'home_delivery' ? 'Incl. Delivery' : 'Pickup'}):</span>
              <span className="text-lg font-display text-[#7B243B]">₹{totalAmount}</span>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Confirm Order & Send to Sharaddha on WhatsApp</span>
            </button>
            <p className="text-center text-[11px] text-stone-500 mt-2">
              🔒 Clicking this will record your order and open WhatsApp with your full cake specification.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
