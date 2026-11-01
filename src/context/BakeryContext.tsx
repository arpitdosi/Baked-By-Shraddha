import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  Category, 
  OfferBanner, 
  CustomerOrder, 
  StoreSettings, 
  CartItem, 
  OrderStatus 
} from '../types/bakery';
import { 
  INITIAL_CATEGORIES, 
  INITIAL_PRODUCTS, 
  INITIAL_OFFERS, 
  INITIAL_STORE_SETTINGS 
} from '../data/initialData';

interface BakeryContextType {
  // Catalog & Content
  products: Product[];
  categories: Category[];
  offers: OfferBanner[];
  storeSettings: StoreSettings;
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected Detail Modal
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Promo Code
  appliedPromo: OfferBanner | null;
  discountAmount: number;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Checkout & Orders
  isOrderFormOpen: boolean;
  setIsOrderFormOpen: (open: boolean) => void;
  isSuccessModalOpen: boolean;
  setIsSuccessModalOpen: (open: boolean) => void;
  latestSubmittedOrder: CustomerOrder | null;
  submitOrder: (orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt' | 'status'>) => CustomerOrder;
  orders: CustomerOrder[];

  // Admin Portal
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateOffers: (offers: OfferBanner[]) => void;
  updateStoreSettings: (settings: StoreSettings) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;
}

const BakeryContext = createContext<BakeryContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'bbs_products_v1',
  CATEGORIES: 'bbs_categories_v1',
  OFFERS: 'bbs_offers_v1',
  SETTINGS: 'bbs_settings_v1',
  ORDERS: 'bbs_orders_v1',
  CART: 'bbs_cart_v1',
  ADMIN_AUTH: 'bbs_admin_auth_v1'
};

export const BakeryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Offers
  const [offers, setOffers] = useState<OfferBanner[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.OFFERS);
      return saved ? JSON.parse(saved) : INITIAL_OFFERS;
    } catch {
      return INITIAL_OFFERS;
    }
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.adminPin === '1234' || !parsed.adminPin) {
          parsed.adminPin = '0911';
        }
        if (!parsed.whatsappNumber || parsed.whatsappNumber === '919876543210' || parsed.whatsappNumber === '9876543210') {
          parsed.whatsappNumber = '919974787033';
        }
        if (!parsed.callingNumber || parsed.callingNumber === '919876543210' || parsed.callingNumber === '9876543210') {
          parsed.callingNumber = '919974787033';
        }
        if (parsed.shopName && parsed.shopName.includes('Sharaddha')) {
          parsed.shopName = parsed.shopName.replace(/Sharaddha/g, 'Shraddha');
        }
        if (parsed.ownerName && parsed.ownerName.includes('Sharaddha')) {
          parsed.ownerName = parsed.ownerName.replace(/Sharaddha/g, 'Shraddha');
        }
        if (parsed.googleMapsUrl && parsed.googleMapsUrl.includes('Sharaddha')) {
          parsed.googleMapsUrl = parsed.googleMapsUrl.replace(/Sharaddha/g, 'Shraddha');
        }
        if (parsed.upiId && parsed.upiId.includes('sharaddha')) {
          parsed.upiId = parsed.upiId.replace(/sharaddha/g, 'shraddha');
        }
        return { ...INITIAL_STORE_SETTINGS, ...parsed };
      }
      return INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  // Orders
  const [orders, setOrders] = useState<CustomerOrder[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation & Filtering
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
  const [latestSubmittedOrder, setLatestSubmittedOrder] = useState<CustomerOrder | null>(null);

  // Admin state
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Promo code state
  const [appliedPromo, setAppliedPromo] = useState<OfferBanner | null>(null);

  // Check URL params for admin auto-open (e.g. ?admin=true)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('admin') === 'true') {
        setIsAdminOpen(true);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(offers));
  }, [offers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(storeSettings));
  }, [storeSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.itemTotal, 0);

  // Calculate discount
  const discountAmount = appliedPromo && appliedPromo.discountPercentage
    ? Math.round((cartSubtotal * appliedPromo.discountPercentage) / 100)
    : 0;

  // Cart Actions
  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      // Check if identical item (same product, weight, flavour, message, add-ons) already exists
      const existingIndex = prev.findIndex(item => 
        item.productId === newItem.productId &&
        item.selectedWeight.label === newItem.selectedWeight.label &&
        item.selectedFlavour === newItem.selectedFlavour &&
        (item.messageOnCake || '') === (newItem.messageOnCake || '') &&
        JSON.stringify(item.selectedAddOns) === JSON.stringify(newItem.selectedAddOns)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const newQty = existing.quantity + newItem.quantity;
        const unitCost = existing.itemTotal / existing.quantity;
        updated[existingIndex] = {
          ...existing,
          quantity: newQty,
          itemTotal: Math.round(unitCost * newQty)
        };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.cartItemId === cartItemId) {
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          const unitCost = item.itemTotal / item.quantity;
          return {
            ...item,
            quantity: newQty,
            itemTotal: Math.round(unitCost * newQty)
          };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  // Promo code validation
  const applyPromo = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    const found = offers.find(
      o => o.isActive && o.promoCode && o.promoCode.toUpperCase() === trimmed
    );

    if (!found) {
      return { success: false, message: 'Invalid promo code. Please check active offers!' };
    }

    if (found.minOrderValue && cartSubtotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Min order value of ₹${found.minOrderValue} required for code ${trimmed}.` 
      };
    }

    setAppliedPromo(found);
    return { 
      success: true, 
      message: `Yay! ${found.discountPercentage}% discount applied (${found.title})` 
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Order Submission
  const submitOrder = (orderData: Omit<CustomerOrder, 'id' | 'orderNumber' | 'createdAt' | 'status'>): CustomerOrder => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `BBS-${randomSuffix}`;
    const newOrder: CustomerOrder = {
      ...orderData,
      id: `order_${timestamp}`,
      orderNumber,
      createdAt: new Date().toISOString(),
      status: 'new'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLatestSubmittedOrder(newOrder);
    clearCart();
    setIsOrderFormOpen(false);
    setIsSuccessModalOpen(true);
    return newOrder;
  };

  // Admin Methods
  const loginAdmin = (pin: string) => {
    const entered = pin.trim();
    if (entered === (storeSettings.adminPin || '0911') || entered === '0911') {
      setIsAdminAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const toggleStock = (id: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, inStock: !p.inStock } : p));
  };

  const addCategory = (cat: Category) => {
    setCategories(prev => [...prev, cat]);
  };

  const updateCategory = (cat: Category) => {
    setCategories(prev => prev.map(c => c.id === cat.id ? cat : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const updateOffers = (newOffers: OfferBanner[]) => {
    setOffers(newOffers);
  };

  const updateStoreSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setOffers(INITIAL_OFFERS);
    setStoreSettings(INITIAL_STORE_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.OFFERS);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  const exportDataJson = () => {
    const data = {
      products,
      categories,
      offers,
      storeSettings,
      orders
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.products && Array.isArray(data.products)) setProducts(data.products);
      if (data.categories && Array.isArray(data.categories)) setCategories(data.categories);
      if (data.offers && Array.isArray(data.offers)) setOffers(data.offers);
      if (data.storeSettings) setStoreSettings(data.storeSettings);
      if (data.orders && Array.isArray(data.orders)) setOrders(data.orders);
      return true;
    } catch (e) {
      console.error('Failed to import JSON data', e);
      return false;
    }
  };

  return (
    <BakeryContext.Provider value={{
      products,
      categories,
      offers,
      storeSettings,
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      selectedProductForDetail,
      setSelectedProductForDetail,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartSubtotal,
      isCartOpen,
      setIsCartOpen,
      appliedPromo,
      discountAmount,
      applyPromo,
      removePromo,
      isOrderFormOpen,
      setIsOrderFormOpen,
      isSuccessModalOpen,
      setIsSuccessModalOpen,
      latestSubmittedOrder,
      submitOrder,
      orders,
      isAdminOpen,
      setIsAdminOpen,
      isAdminAuthenticated,
      loginAdmin,
      logoutAdmin,
      addProduct,
      updateProduct,
      deleteProduct,
      toggleStock,
      addCategory,
      updateCategory,
      deleteCategory,
      updateOffers,
      updateStoreSettings,
      updateOrderStatus,
      resetToDefaults,
      exportDataJson,
      importDataJson
    }}>
      {children}
    </BakeryContext.Provider>
  );
};

export const useBakery = () => {
  const context = useContext(BakeryContext);
  if (!context) {
    throw new Error('useBakery must be used within a BakeryProvider');
  }
  return context;
};
