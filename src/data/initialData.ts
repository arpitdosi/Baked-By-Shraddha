import { Category, Product, OfferBanner, StoreSettings, AddOnItem } from '../types/bakery';

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'cake',
    name: 'Cakes',
    iconName: 'Cake',
    description: 'Freshly baked artisanal sponge, customized themes, eggless goodness'
  },
  {
    id: 'pastry',
    name: 'Pastry',
    iconName: 'Cookie',
    description: 'Individual decadent slices with rich ganache, silky mousse, and fruit compotes'
  },
  {
    id: 'cup cakes',
    name: 'Cup Cakes',
    iconName: 'Sparkles',
    description: 'Fluffy bite-sized happiness topped with whipped buttercream swirls'
  },
  {
    id: 'jar cake',
    name: 'Jar Cake',
    iconName: 'GlassWater',
    description: 'Layered dessert jars packed with moist cake, fudge, and rich fillings'
  }
];

export const INITIAL_OFFERS: OfferBanner[] = [
  {
    id: 'offer-1',
    title: 'Grand Welcome Offer',
    highlightText: 'FLAT 10% OFF',
    description: 'Use code SWEET10 on your first homemade cake order. 100% Pure Veg & fresh!',
    promoCode: 'SWEET10',
    discountPercentage: 10,
    minOrderValue: 400,
    bannerType: 'offer',
    isActive: true,
    validUntil: 'Active Now'
  },
  {
    id: 'combo-1',
    title: 'New Combo Launch 🎉',
    highlightText: 'CELEBRATION DUO',
    description: 'Get 500g Dutch Truffle Cake + 2 Red Velvet Cupcakes at special combo price of ₹649!',
    promoCode: 'COMBODUO',
    discountPercentage: 15,
    minOrderValue: 600,
    bannerType: 'combo',
    isActive: true,
    linkToCategoryOrCombo: 'combo'
  },
  {
    id: 'announcement-1',
    title: 'Hygienic Home Bakery',
    highlightText: '100% PURE VEG',
    description: 'All cakes are strictly eggless, baked fresh on confirmed order with premium Amul butter & Belgian chocolate.',
    bannerType: 'announcement',
    isActive: true
  }
];

export const INITIAL_ADDONS: AddOnItem[] = [
  { id: 'sparkle-candle', name: 'Magic Sparkler Candle', price: 30, icon: 'Flame' },
  { id: 'happy-birthday-tag', name: 'Golden Acrylic Birthday Tag', price: 40, icon: 'Award' },
  { id: 'anniversary-tag', name: 'Romantic Anniversary Tag', price: 40, icon: 'Heart' },
  { id: 'extra-knife', name: 'Wooden Cake Server & Knife', price: 25, icon: 'Utensils' },
  { id: 'handwritten-note', name: 'Custom Calligraphy Card', price: 20, icon: 'Mail' }
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- CAKES ---
  {
    id: 'cake-belgian-truffle',
    name: 'Belgian Dark Chocolate Truffle Cake',
    hindiName: 'बेल्जियन डार्क चॉकलेट ट्रफल केक',
    categoryId: 'cake',
    description: 'Signature silky rich chocolate ganache layered between moist eggless chocolate sponge, topped with dark chocolate curls.',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80'
    ],
    weights: [
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 520, originalPrice: 750, servings: 'Serves 4-6 (4-6 लोग)', isDefault: true },
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 740, originalPrice: 999, servings: 'Serves 6-8 (6-8 लोग)' },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 950, originalPrice: 1299, servings: 'Serves 8-12 (8-12 लोग)' },
      { label: '1.5 Kg', weightValue: 1500, unit: 'g', price: 1400, originalPrice: 1850, servings: 'Serves 14-18 (14-18 लोग)' },
      { label: '2 Kg', weightValue: 2000, unit: 'g', price: 1850, originalPrice: 2450, servings: 'Serves 20-25 (20-25 लोग)' }
    ],
    flavours: ['Dark Chocolate Ganache', 'Nutella Hazelnut (+₹60)', 'Choco Mocha', 'Ferrero Rocher Style (+₹80)'],
    isVeg: true,
    isBestseller: true,
    inStock: true,
    preparationTimeHours: 6,
    tags: ['Bestseller', 'Chocolate', 'Birthday Favorite']
  },
  {
    id: 'cake-rasmalai-tres-leches',
    name: 'Royal Rasmalai & Pistachio Cake',
    hindiName: 'शाही रसमलाई पिस्ता केक',
    categoryId: 'cake',
    description: 'Cardamom-infused soft sponge soaked in saffron infused rabdi cream, layered with real rasmalai chunks and roasted pistachios & rose petals.',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80'
    ],
    weights: [
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 580, originalPrice: 799, servings: 'Serves 4-6 (4-6 लोग)', isDefault: true },
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 820, originalPrice: 1099, servings: 'Serves 6-8 (6-8 लोग)' },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 1050, originalPrice: 1450, servings: 'Serves 8-12 (8-12 लोग)' },
      { label: '1.5 Kg', weightValue: 1500, unit: 'g', price: 1550, originalPrice: 2050, servings: 'Serves 14-18 (14-18 लोग)' },
      { label: '2 Kg', weightValue: 2000, unit: 'g', price: 2000, originalPrice: 2650, servings: 'Serves 20-25 (20-25 लोग)' }
    ],
    flavours: ['Kesar Pista Rasmalai', 'Gulab Jamun Fusion', 'Cardamom Rose'],
    isVeg: true,
    isBestseller: true,
    inStock: true,
    preparationTimeHours: 8,
    tags: ['Festive', 'Desi Fusion', 'Top Rated']
  },
  {
    id: 'cake-red-velvet-cream-cheese',
    name: 'Velvety Red Velvet Cheese Frosting Cake',
    hindiName: 'रेड वेलवेट क्रीम चीज़ केक',
    categoryId: 'cake',
    description: 'Crimson moist vanilla sponge with subtle cocoa note, generously frosted with tangy-sweet creamy Philadelphia style cream cheese.',
    image: 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80'
    ],
    weights: [
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 540, originalPrice: 750, servings: 'Serves 4-6 (4-6 लोग)', isDefault: true },
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 770, originalPrice: 1050, servings: 'Serves 6-8 (6-8 लोग)' },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 990, originalPrice: 1350, servings: 'Serves 8-12 (8-12 लोग)' },
      { label: '1.5 Kg', weightValue: 1500, unit: 'g', price: 1450, originalPrice: 1950, servings: 'Serves 14-18 (14-18 लोग)' },
      { label: '2 Kg', weightValue: 2000, unit: 'g', price: 1900, originalPrice: 2500, servings: 'Serves 20-25 (20-25 लोग)' }
    ],
    flavours: ['Classic Cream Cheese', 'Red Velvet Choco Chip', 'Berry Velvet'],
    isVeg: true,
    isNew: true,
    inStock: true,
    preparationTimeHours: 6,
    tags: ['Romantic', 'Anniversary Special']
  },
  {
    id: 'cake-fresh-pineapple-gateau',
    name: 'Classic Fresh Pineapple Gateau Cake',
    hindiName: 'ताज़ा अनानास पाइनएप्पल केक',
    categoryId: 'cake',
    description: 'Light vanilla sponge soaked in pineapple nectar, layered with freshly stewed pineapple chunks, whipped cream, and Maraschino cherries.',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 420, originalPrice: 600, servings: 'Serves 4-6 (4-6 लोग)', isDefault: true },
      { label: '750g (0.75 Kg)', weightValue: 750, unit: 'g', price: 610, originalPrice: 850, servings: 'Serves 6-8 (6-8 लोग)' },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 790, originalPrice: 1100, servings: 'Serves 8-12 (8-12 लोग)' },
      { label: '1.5 Kg', weightValue: 1500, unit: 'g', price: 1150, originalPrice: 1550, servings: 'Serves 14-18 (14-18 लोग)' },
      { label: '2 Kg', weightValue: 2000, unit: 'g', price: 1500, originalPrice: 2000, servings: 'Serves 20-25 (20-25 लोग)' }
    ],
    flavours: ['Real Pineapple Chunks', 'Tropical Mango Pineapple', 'Kiwi Pineapple Twist'],
    isVeg: true,
    inStock: true,
    preparationTimeHours: 4,
    tags: ['Fresh Fruit', 'All-Time Classic']
  },
  {
    id: 'cake-lotus-biscoff-drip',
    name: 'Lotus Biscoff Caramel Drip Cake',
    hindiName: 'लोटस बिस्कॉफ कैरेमल ड्रिप केक',
    categoryId: 'cake',
    description: 'Caramelised Belgian Biscoff spread whipped into velvety buttercream, layered with crunchy biscuit crumble and a warm Biscoff drizzle.',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '500g (0.5 Kg)', weightValue: 500, unit: 'g', price: 590, servings: 'Serves 4-6', isDefault: true },
      { label: '1 Kg', weightValue: 1000, unit: 'g', price: 1100, servings: 'Serves 8-12' },
      { label: '1.5 Kg', weightValue: 1500, unit: 'g', price: 1600, servings: 'Serves 14-18' }
    ],
    flavours: ['Lotus Biscoff Caramel', 'Biscoff Cheesecake Style (+₹70)'],
    isVeg: true,
    isNew: true,
    inStock: true,
    preparationTimeHours: 6,
    tags: ['Trending', 'Caramel Lovers']
  },

  // --- PASTRIES ---
  {
    id: 'pastry-dutch-chocolate',
    name: 'Gourmet Dutch Truffle Pastry',
    hindiName: 'डच ट्रफल पेस्ट्री',
    categoryId: 'pastry',
    description: 'Individual decadent slice of dark chocolate truffle with velvety mousse layers and chocolate mirror glaze.',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Pc', weightValue: 1, unit: 'pc', price: 95, servings: 'Single treat', isDefault: true },
      { label: 'Pack of 2 Pcs', weightValue: 2, unit: 'pc', price: 180, servings: 'Couple slice' },
      { label: 'Pack of 4 Pcs', weightValue: 4, unit: 'pc', price: 340, servings: 'Family sweet box' }
    ],
    flavours: ['Dutch Chocolate Truffle', 'Dark Truffle with Almonds'],
    isVeg: true,
    isBestseller: true,
    inStock: true,
    preparationTimeHours: 2,
    tags: ['Quick Bite', 'Single Portion']
  },
  {
    id: 'pastry-black-forest',
    name: 'German Black Forest Pastry Slice',
    hindiName: 'ब्लैक फॉरेस्ट पेस्ट्री',
    categoryId: 'pastry',
    description: 'Sponge infused with cherry syrup, layered with vanilla cream frosting, imported sour cherries, and shaved dark chocolate flakes.',
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Pc', weightValue: 1, unit: 'pc', price: 85, servings: 'Single treat', isDefault: true },
      { label: 'Pack of 2 Pcs', weightValue: 2, unit: 'pc', price: 160, servings: 'Couple slice' },
      { label: 'Pack of 4 Pcs', weightValue: 4, unit: 'pc', price: 300, servings: 'Sweet party pack' }
    ],
    flavours: ['Classic Cherry Black Forest', 'White Forest Pastry'],
    isVeg: true,
    inStock: true,
    preparationTimeHours: 2,
    tags: ['Classic', 'Kids Favorite']
  },
  {
    id: 'pastry-blueberry-cheesecake',
    name: 'Blueberry Swirl Baked Pastry',
    hindiName: 'ब्लूबेरी पेस्ट्री स्लाइस',
    categoryId: 'pastry',
    description: 'Tender eggless vanilla crust with rich cheese layer topped with handcrafted wild blueberry compote.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Pc', weightValue: 1, unit: 'pc', price: 110, servings: 'Single delight', isDefault: true },
      { label: 'Pack of 2 Pcs', weightValue: 2, unit: 'pc', price: 210, servings: 'Sweet pairing' },
      { label: 'Pack of 4 Pcs', weightValue: 4, unit: 'pc', price: 399, servings: 'Dessert pack' }
    ],
    flavours: ['Wild Blueberry', 'Strawberry Bliss'],
    isVeg: true,
    inStock: true,
    preparationTimeHours: 4,
    tags: ['Fruity', 'Premium']
  },

  // --- CUP CAKES ---
  {
    id: 'cupcake-assorted-box',
    name: 'Shraddha\'s Signature Gourmet Cupcakes Box',
    hindiName: 'सिग्नेचर कपकेक बॉक्स',
    categoryId: 'cup cakes',
    description: 'Melt-in-mouth eggless sponge cupcakes adorned with beautiful rosettes of rich buttercream and sparkling edible pearls.',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: 'Box of 2 Pcs', weightValue: 2, unit: 'box', price: 140, servings: 'Perfect snack', isDefault: true },
      { label: 'Box of 4 Pcs', weightValue: 4, unit: 'box', price: 260, servings: 'Gift box' },
      { label: 'Box of 6 Pcs', weightValue: 6, unit: 'box', price: 380, servings: 'Celebration party box' }
    ],
    flavours: ['Assorted (Chocolate + Vanilla + Red Velvet)', 'All Dark Chocolate', 'Vanilla Rainbow Swirl', 'Red Velvet Cream Cheese'],
    isVeg: true,
    isBestseller: true,
    inStock: true,
    preparationTimeHours: 3,
    tags: ['Gifting', 'Party Special', 'Customizable']
  },
  {
    id: 'cupcake-nutella-overload',
    name: 'Nutella Lava Filled Cupcakes',
    hindiName: 'न्यूटेला लावा कपकेक्स',
    categoryId: 'cup cakes',
    description: 'Chocolate cupcakes piped with liquid warm Nutella hazelnut core and topped with chocolate ganache frosting.',
    image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: 'Box of 2 Pcs', weightValue: 2, unit: 'box', price: 160, servings: 'Decadent snack', isDefault: true },
      { label: 'Box of 4 Pcs', weightValue: 4, unit: 'box', price: 310, servings: 'Dessert box' },
      { label: 'Box of 6 Pcs', weightValue: 6, unit: 'box', price: 450, servings: 'Party delight' }
    ],
    flavours: ['Pure Nutella Filling', 'Nutella & Roasted Almonds'],
    isVeg: true,
    isNew: true,
    inStock: true,
    preparationTimeHours: 3,
    tags: ['Nutella', 'Lava Core']
  },

  // --- JAR CAKES ---
  {
    id: 'jarcake-triple-chocolate',
    name: 'Triple Chocolate Death-by-Chocolate Jar Cake',
    hindiName: 'ट्रिपल चॉकलेट जार केक',
    categoryId: 'jar cake',
    description: 'Reusable dessert glass jar stacked with layers of dark truffle fudge, soft brownie sponge, milk chocolate mousse, and choco-chips.',
    image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Jar (250ml)', weightValue: 1, unit: 'pc', price: 149, servings: 'Individual jar', isDefault: true },
      { label: 'Duo Pack (2 Jars)', weightValue: 2, unit: 'box', price: 280, servings: '2 Jars combo' },
      { label: 'Party Pack (4 Jars)', weightValue: 4, unit: 'box', price: 530, servings: '4 Jars bundle' }
    ],
    flavours: ['Triple Chocolate Delight', 'Choco Brownie Mud'],
    isVeg: true,
    isBestseller: true,
    inStock: true,
    preparationTimeHours: 2,
    tags: ['Jar Special', 'Travel Friendly', 'Zero Mess']
  },
  {
    id: 'jarcake-redvelvet-cheesecake',
    name: 'Red Velvet Berry Jar Cake',
    hindiName: 'रेड वेलवेट बेरी जार केक',
    categoryId: 'jar cake',
    description: 'Bright red velvet crumbs layered with sweetened cream cheese frosting and strawberry crush, beautifully packed in a clean mason jar.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Jar (250ml)', weightValue: 1, unit: 'pc', price: 149, servings: 'Individual jar', isDefault: true },
      { label: 'Duo Pack (2 Jars)', weightValue: 2, unit: 'box', price: 280, servings: '2 Jars combo' },
      { label: 'Party Pack (4 Jars)', weightValue: 4, unit: 'box', price: 530, servings: '4 Jars bundle' }
    ],
    flavours: ['Red Velvet Cream Cheese', 'Berry Delight'],
    isVeg: true,
    inStock: true,
    preparationTimeHours: 2,
    tags: ['Jar Special', 'Layered Dessert']
  },
  {
    id: 'jarcake-mango-rasmalai',
    name: 'Mango & Kesar Rasmalai Fusion Jar',
    hindiName: 'मैंगो केसर रसमलाई जार',
    categoryId: 'jar cake',
    description: 'Alphonso mango pulp layered with cardamom sponge, soft rasmalai chunks, and saffron cream in a cute dessert jar.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: '1 Jar (250ml)', weightValue: 1, unit: 'pc', price: 169, servings: 'Individual jar', isDefault: true },
      { label: 'Duo Pack (2 Jars)', weightValue: 2, unit: 'box', price: 320, servings: '2 Jars combo' },
      { label: 'Party Pack (4 Jars)', weightValue: 4, unit: 'box', price: 599, servings: '4 Jars bundle' }
    ],
    flavours: ['Mango Rasmalai Fusion', 'Alphonso Cream'],
    isVeg: true,
    isNew: true,
    inStock: true,
    preparationTimeHours: 3,
    tags: ['Seasonal Special', 'Fusion']
  },

  // --- COMBOS ---
  {
    id: 'combo-birthday-bash',
    name: '🎂 Birthday Celebration Mega Combo',
    hindiName: 'बर्थडे सेलिब्रेशन कॉम्बो',
    categoryId: 'cake',
    description: 'Complete party package: 500g Belgian Dark Truffle Cake + Box of 4 Assorted Cupcakes + 1 Sparkler Candle + Golden Birthday Topper!',
    image: 'https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: 'Combo Kit (500g Cake + 4 Cupcakes + Topper)', weightValue: 1, unit: 'box', price: 749, servings: 'Serves 6-8', isDefault: true },
      { label: 'Mega Kit (1 Kg Cake + 6 Cupcakes + Topper)', weightValue: 2, unit: 'box', price: 1249, servings: 'Serves 12-16' }
    ],
    flavours: ['Dark Truffle Cake + Mixed Cupcakes', 'Pineapple Cake + Vanilla Cupcakes', 'Rasmalai Cake + Kesar Cupcakes (+₹80)'],
    isVeg: true,
    isCombo: true,
    isBestseller: true,
    comboIncludes: '500g Cake + 4 Cupcakes + Sparkle Candle + Acrylic Topper (Save ₹180)',
    inStock: true,
    preparationTimeHours: 6,
    tags: ['Special Combo', 'Best Value', 'Party Ready']
  },
  {
    id: 'combo-sweet-duo-jars',
    name: '🍯 Jar Cake Bliss Trio Combo',
    hindiName: 'जार केक ट्रियो कॉम्बो',
    categoryId: 'jar cake',
    description: '3 of our highest rated dessert jars in one gift bundle: 1x Triple Chocolate + 1x Red Velvet Berry + 1x Mango Rasmalai.',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=800&q=80',
    weights: [
      { label: 'Set of 3 Assorted Jars', weightValue: 3, unit: 'box', price: 420, servings: '3 Dessert Jars (Save ₹60)', isDefault: true }
    ],
    flavours: ['Trio: 1 Choco + 1 Red Velvet + 1 Mango Rasmalai'],
    isVeg: true,
    isCombo: true,
    isNew: true,
    comboIncludes: '3 Full Size 250ml Glass Dessert Jars',
    inStock: true,
    preparationTimeHours: 2,
    tags: ['Combo Deal', 'Gift Worthy']
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  shopName: 'Baked by Shraddha',
  tagline: '100% Pure Veg (Eggless) Homemade Artisan Bakery',
  ownerName: 'Shraddha',
  whatsappNumber: '919974787033', // Updated to 9974787033
  callingNumber: '919974787033',
  city: 'Indore / Local Home Kitchen',
  pickupAddress: 'Sector B, Near Garden Park (Exact address shared on order confirmation)',
  googleMapsUrl: 'https://maps.google.com/?q=Baked+by+Shraddha+Homemade+Artisan+Cakes',
  upiId: 'bakedbyshraddha@okaxis',
  minOrderLeadHours: 4,
  freeDeliveryAbove: 800,
  standardDeliveryFee: 50,
  welcomeDiscountPercent: 10,
  adminPin: '0911', // Secret admin PIN (Hidden)
  isShopOpen: true,
  customNotice: 'Freshly baked with hygiene & love! Please order at least 4-6 hours in advance for fresh preparation.'
};
