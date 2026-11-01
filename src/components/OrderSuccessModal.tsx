import React, { useEffect } from 'react';
import { useBakery } from '../context/BakeryContext';
import confetti from 'canvas-confetti';
import { formatCustomerWhatsAppMessage, getCleanPhoneNumber } from '../utils/whatsapp';
import { 
  CheckCircle, 
  Sparkles, 
  Send, 
  Copy, 
  Clock, 
  MapPin, 
  Cake, 
  Share2,
  X
} from 'lucide-react';

export const OrderSuccessModal: React.FC = () => {
  const { 
    isSuccessModalOpen, 
    setIsSuccessModalOpen, 
    latestSubmittedOrder, 
    storeSettings 
  } = useBakery();

  useEffect(() => {
    if (isSuccessModalOpen) {
      // Trigger festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  }, [isSuccessModalOpen]);

  if (!isSuccessModalOpen || !latestSubmittedOrder) return null;

  const order = latestSubmittedOrder;

  const handleWhatsAppRedirect = () => {
    const messageEncoded = formatCustomerWhatsAppMessage(order, storeSettings);
    const targetBakerPhone = getCleanPhoneNumber(storeSettings.whatsappNumber);
    const whatsappUrl = `https://wa.me/${targetBakerPhone}?text=${messageEncoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyOrderNumber = () => {
    navigator.clipboard.writeText(order.orderNumber);
    alert(`Copied Order #${order.orderNumber} to clipboard!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in zoom-in-95 duration-200">
      <div 
        className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#F2DFD1] overflow-hidden my-6 p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSuccessModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
          <CheckCircle className="w-10 h-10 stroke-[2.5]" />
        </div>

        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          Order Received with Love!
        </span>

        <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#2C1810]">
          Thank You, {order.customerName}!
        </h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-sm mx-auto">
          Your order has been sent to Baker Sharaddha. She prepares all bakes fresh in her 100% pure veg home kitchen.
        </p>

        {/* Order Details Ticket Box */}
        <div className="mt-5 p-4 rounded-2xl bg-[#FFF9F5] border border-[#F3DFC9] text-left text-xs space-y-2">
          {order.isFirstOrder && order.discountAmount > 0 && (
            <div className="px-2.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>1st Order Welcome Discount Applied (-₹{order.discountAmount})!</span>
            </div>
          )}

          <div className="flex items-center justify-between pb-2 border-b border-[#F0D8C0]">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase">Order Number:</span>
              <div className="font-mono font-bold text-sm text-[#7B243B]">#{order.orderNumber}</div>
            </div>
            <button
              onClick={copyOrderNumber}
              className="px-2 py-1 rounded-lg bg-white border border-[#E8DACD] hover:bg-stone-50 text-stone-600 flex items-center gap-1 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </button>
          </div>

          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-stone-700">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-stone-400" /> Date & Slot:
              </span>
              <span className="font-semibold">{order.deliveryDate} ({order.deliveryTimeSlot})</span>
            </div>

            <div className="flex items-center justify-between text-stone-700">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-stone-400" /> Delivery:
              </span>
              <span className="font-semibold">
                {order.deliveryType === 'home_delivery' ? 'Doorstep Delivery' : 'Self Pickup'}
              </span>
            </div>

            {order.deliveryType === 'self_pickup' && storeSettings.googleMapsUrl && (
              <div className="pt-2 pb-1 border-t border-[#F0D8C0]/60">
                <a
                  href={storeSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>📍 Open Google Maps (रास्ता देखें - Navigation)</span>
                </a>
              </div>
            )}

            <div className="flex items-center justify-between text-stone-700 pt-1">
              <span>Total Amount:</span>
              <span className="font-display font-bold text-base text-[#7B243B]">₹{order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* WhatsApp Direct Action Button */}
        <div className="mt-6 space-y-2.5">
          <button
            onClick={handleWhatsAppRedirect}
            className="w-full py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20BA5C] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Open WhatsApp with Baker Sharaddha</span>
          </button>

          <button
            onClick={() => setIsSuccessModalOpen(false)}
            className="w-full py-2.5 text-xs text-stone-500 hover:text-stone-800 font-semibold transition-colors cursor-pointer"
          >
            Back to Bakery Menu
          </button>
        </div>
      </div>
    </div>
  );
};
