export type CategoryId = string;

export interface WeightOption {
  label: string; // e.g. "500g (0.5 Kg)", "750g (0.75 Kg)", "1 Kg", "1.5 Kg", "2 Kg", "Box of 2", "Box of 4", "Box of 6", "1 Pc"
  weightValue: number; // in grams or piece count
  unit: 'g' | 'kg' | 'pc' | 'box';
  price: number; // in INR (Selling / Offer Price)
  originalPrice?: number; // Cut price / MRP e.g. 750 (shown struck through)
  servings?: string; // e.g., "Serves 6-8 (6-8 लोग)"
  isDefault?: boolean;
}

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  categoryId: CategoryId;
  description?: string; // Optional now
  image: string;
  images?: string[]; // Up to 4 images for multi-angle showcase
  weights: WeightOption[];
  flavours: string[];
  isVeg: boolean; // Always true for Baked by Shraddha
  isBestseller?: boolean;
  isNew?: boolean;
  isCombo?: boolean;
  comboIncludes?: string; // Details of what's inside the combo
  inStock: boolean;
  preparationTimeHours: number; // Minimum notice e.g. 4 hours or 24 hours
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface OfferBanner {
  id: string;
  title: string;
  highlightText: string; // e.g. "FLAT 10% OFF"
  description: string;
  promoCode?: string;
  discountPercentage?: number;
  minOrderValue?: number;
  bannerType: 'offer' | 'combo' | 'announcement';
  isActive: boolean;
  validUntil?: string;
  linkToCategoryOrCombo?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

export interface CartItem {
  cartItemId: string; // unique cart identifier
  productId: string;
  productName: string;
  image: string;
  selectedWeight: WeightOption;
  selectedFlavour: string;
  quantity: number;
  messageOnCake?: string;
  specialInstructions?: string;
  selectedAddOns: AddOnItem[];
  itemTotal: number;
}

export type OrderStatus = 'new' | 'confirmed' | 'baking' | 'ready' | 'delivered' | 'cancelled';

export interface CustomerOrder {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  deliveryType: 'home_delivery' | 'self_pickup';
  deliveryAddress?: string;
  landmark?: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  appliedPromoCode?: string;
  deliveryFee: number;
  totalAmount: number;
  paymentMethod: 'upi_on_delivery' | 'cash_on_pickup' | 'upi_advance';
  paymentStatus: 'pending' | 'received';
  status: OrderStatus;
  isFirstOrder?: boolean;
  notesForBaker?: string;
}

export interface StoreSettings {
  shopName: string;
  tagline: string;
  ownerName: string;
  whatsappNumber: string;
  callingNumber: string;
  city: string;
  pickupAddress: string;
  googleMapsUrl?: string; // Direct Google Maps navigation link
  upiId: string;
  upiQrCodeUrl?: string;
  minOrderLeadHours: number;
  freeDeliveryAbove: number;
  standardDeliveryFee: number;
  welcomeDiscountPercent?: number; // Default 10%
  adminPin: string;
  isShopOpen: boolean;
  customNotice?: string;
}
