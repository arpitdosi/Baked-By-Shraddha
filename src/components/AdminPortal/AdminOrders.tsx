import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { CustomerOrder, OrderStatus } from '../../types/bakery';
import { formatBakerStatusUpdateMessage, getCleanPhoneNumber } from '../../utils/whatsapp';
import { 
  Clock, 
  MapPin, 
  Phone, 
  Send, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  Search,
  Filter,
  DollarSign
} from 'lucide-react';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, storeSettings } = useBakery();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold">New Order</span>;
      case 'confirmed':
        return <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[11px] font-bold">Confirmed</span>;
      case 'baking':
        return <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">In Oven (Baking)</span>;
      case 'ready':
        return <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">Ready for Pickup/Delivery</span>;
      case 'delivered':
        return <span className="px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[11px] font-bold">Delivered</span>;
      case 'cancelled':
        return <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">Cancelled</span>;
      default:
        return null;
    }
  };

  const handleSendStatusToWhatsApp = (order: CustomerOrder) => {
    const message = formatBakerStatusUpdateMessage(order, storeSettings);
    const cleanPhone = getCleanPhoneNumber(order.customerPhone);
    const url = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-4">
      {/* Top filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFBF7] p-3 rounded-2xl border border-[#F0E2D6]">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Order # or Customer..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E4D1C3] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#7B243B]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['all', 'new', 'confirmed', 'baking', 'ready', 'delivered', 'cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize whitespace-nowrap cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#7B243B] text-white'
                  : 'bg-white text-stone-600 border border-[#E8DACD] hover:bg-stone-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
          <Clock className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h4 className="font-bold text-stone-700 text-sm">No orders matching this filter</h4>
          <p className="text-xs text-stone-500 mt-0.5">When customers submit cake orders, they will appear here in real-time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map(order => (
            <div 
              key={order.id} 
              className="bg-white rounded-2xl border border-[#EEDDCE] p-4 sm:p-5 shadow-xs hover:border-[#7B243B]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-stone-100 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#7B243B]">#{order.orderNumber}</span>
                    {getStatusBadge(order.status)}
                    <span className="text-[11px] text-stone-400">
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-stone-800 mt-1 flex items-center gap-2">
                    <span>{order.customerName}</span>
                    <span className="text-stone-300">•</span>
                    <a 
                      href={`https://wa.me/${getCleanPhoneNumber(order.customerPhone)}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline flex items-center gap-1 font-mono"
                    >
                      <Phone className="w-3 h-3" />
                      {order.customerPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="text-xs font-semibold bg-[#FAF5EE] border border-[#E9D9CB] rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#7B243B] cursor-pointer"
                  >
                    <option value="new">Status: New</option>
                    <option value="confirmed">Status: Confirmed</option>
                    <option value="baking">Status: In Oven (Baking)</option>
                    <option value="ready">Status: Ready</option>
                    <option value="delivered">Status: Delivered</option>
                    <option value="cancelled">Status: Cancelled</option>
                  </select>

                  <button
                    onClick={() => handleSendStatusToWhatsApp(order)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-xs"
                    title="Send status update message to customer via WhatsApp"
                  >
                    <Send className="w-3 h-3" />
                    <span>WhatsApp Update</span>
                  </button>
                </div>
              </div>

              {/* Items & specifications */}
              <div className="py-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h6 className="font-bold text-[11px] uppercase tracking-wider text-stone-500 mb-1.5">
                    Ordered Items (Pure Veg)
                  </h6>
                  <div className="space-y-1.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="bg-[#FFFDFB] p-2 rounded-xl border border-[#F4E6D9]">
                        <div className="font-semibold text-stone-900 flex justify-between">
                          <span>{item.quantity}x {item.productName}</span>
                          <span className="text-[#7B243B] font-bold">₹{item.itemTotal}</span>
                        </div>
                        <div className="text-[11px] text-stone-600 mt-0.5">
                          {item.selectedWeight.label} • Flavour: <strong className="text-stone-800">{item.selectedFlavour}</strong>
                        </div>
                        {item.messageOnCake && (
                          <div className="text-[11px] text-[#7B243B] font-medium mt-1 p-1 bg-rose-50/70 rounded border border-rose-100">
                            🎂 Pipe on Cake: "{item.messageOnCake}"
                          </div>
                        )}
                        {item.selectedAddOns.length > 0 && (
                          <div className="text-[10px] text-amber-800 mt-0.5">
                            + Add-ons: {item.selectedAddOns.map(a => a.name).join(', ')}
                          </div>
                        )}
                        {item.specialInstructions && (
                          <div className="text-[10px] text-stone-500 italic mt-0.5">
                            Note: {item.specialInstructions}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery & Payment details */}
                <div className="space-y-2">
                  <h6 className="font-bold text-[11px] uppercase tracking-wider text-stone-500">
                    Schedule & Delivery Info
                  </h6>
                  <div className="bg-[#FAF5EE] p-2.5 rounded-xl border border-[#E9D9CB] space-y-1 text-stone-700">
                    <div>
                      <strong className="text-stone-900">Date:</strong> {order.deliveryDate} ({order.deliveryTimeSlot})
                    </div>
                    <div>
                      <strong className="text-stone-900">Mode:</strong> {order.deliveryType === 'home_delivery' ? '🚗 Doorstep Delivery' : '🛍️ Kitchen Self-Pickup'}
                    </div>
                    {order.deliveryAddress && (
                      <div>
                        <strong className="text-stone-900">Address:</strong> {order.deliveryAddress}
                        {order.landmark && <span className="text-stone-500"> (Near: {order.landmark})</span>}
                      </div>
                    )}
                    <div className="pt-1 border-t border-[#E8D4C2] flex justify-between font-bold text-stone-900">
                      <span>Total: ₹{order.totalAmount}</span>
                      <span className="text-[11px] text-emerald-800 capitalize bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {order.paymentMethod.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>

                  {order.notesForBaker && (
                    <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900">
                      <strong>Baker Note:</strong> {order.notesForBaker}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
