import { CustomerOrder, StoreSettings } from '../types/bakery';

export function formatCustomerWhatsAppMessage(order: CustomerOrder, settings: StoreSettings): string {
  const itemsText = order.items
    .map((item, index) => {
      let text = `${index + 1}. *${item.productName}*\n   - Weight/Pack: ${item.selectedWeight.label}${item.selectedWeight.servings ? ` (${item.selectedWeight.servings})` : ''}\n   - Flavour: ${item.selectedFlavour}\n   - Qty: ${item.quantity} x ₹${item.selectedWeight.price}`;
      if (item.messageOnCake) {
        text += `\n   - Message on Cake: "${item.messageOnCake}"`;
      }
      if (item.selectedAddOns && item.selectedAddOns.length > 0) {
        text += `\n   - Add-ons: ${item.selectedAddOns.map(a => `${a.name} (+₹${a.price})`).join(', ')}`;
      }
      if (item.specialInstructions) {
        text += `\n   - Note: ${item.specialInstructions}`;
      }
      return text;
    })
    .join('\n\n');

  const deliveryTypeText = order.deliveryType === 'home_delivery' ? '🚗 Home Delivery' : '🛍️ Self Pickup';
  let addressText = '';
  if (order.deliveryType === 'home_delivery') {
    addressText = `\n📍 *Address:* ${order.deliveryAddress || 'N/A'}${order.landmark ? ` (Landmark: ${order.landmark})` : ''}`;
  } else {
    addressText = `\n📍 *Pickup Location:* ${settings.pickupAddress}`;
    if (settings.googleMapsUrl) {
      addressText += `\n🗺️ *Google Maps Route:* ${settings.googleMapsUrl}`;
    }
  }

  const message = `✨ *NEW ORDER - ${settings.shopName.toUpperCase()}* ✨
🍰 *Order ID:* #${order.orderNumber}
📅 *Order Date:* ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}

👤 *Customer Details:*
• Name: *${order.customerName}*
• Phone: ${order.customerPhone}
${addressText}
• Preferred Date: *${order.deliveryDate}*
• Preferred Time: *${order.deliveryTimeSlot}*
• Type: *${deliveryTypeText}*

🎂 *Items Ordered (100% Pure Veg):*
${itemsText}

💰 *Payment Breakdown:*
• Subtotal: ₹${order.subtotal}
${order.discountAmount > 0 ? `• Discount (${order.isFirstOrder ? '🎉 1st Order Welcome Offer' : order.appliedPromoCode}): -₹${order.discountAmount}\n` : ''}• Delivery Fee: ${order.deliveryFee === 0 ? 'FREE' : `₹${order.deliveryFee}`}
• *TOTAL AMOUNT: ₹${order.totalAmount}*
• Payment Mode: ${order.paymentMethod === 'upi_advance' ? 'UPI Advance Payment' : order.paymentMethod === 'upi_on_delivery' ? 'UPI on Delivery' : 'Cash on Pickup'}
${settings.upiId ? `• UPI ID for payment: ${settings.upiId}` : ''}

${order.notesForBaker ? `📝 *Special Request for Baker:* ${order.notesForBaker}\n` : ''}
🙏 *Thank you for supporting homemade pure veg baking!*`;

  return encodeURIComponent(message);
}

export function formatBakerStatusUpdateMessage(order: CustomerOrder, settings: StoreSettings): string {
  const statusTexts: Record<string, string> = {
    confirmed: '🎉 Your order has been *CONFIRMED* by Baker Shraddha! We are gathering premium pure veg ingredients.',
    baking: '👩‍🍳 Fresh batter in the oven! Your homemade treat is currently *BEING BAKED* with love.',
    ready: '✨ Ding! Your order is *READY* for pickup / delivery dispatch!',
    delivered: '❤️ Your order has been *DELIVERED*. We hope you loved every bite of Baked by Shraddha!',
    cancelled: '⚠️ Your order has been cancelled. Please contact us for any query.'
  };

  const message = `Hello *${order.customerName}*! 👋
Update from *${settings.shopName}* regarding Order *#${order.orderNumber}*:

${statusTexts[order.status] || `Current Status: ${order.status.toUpperCase()}`}

🍰 Items: ${order.items.map(i => `${i.productName} (${i.selectedWeight.label})`).join(', ')}
💰 Total: ₹${order.totalAmount}

For any customization updates, reply to this chat! 🎂`;

  return encodeURIComponent(message);
}

export function getCleanPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  return cleaned;
}
