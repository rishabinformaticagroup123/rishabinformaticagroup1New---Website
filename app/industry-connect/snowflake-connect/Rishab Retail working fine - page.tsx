// app/industry-connect/snowflake-connect/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, Store, Search, ChevronRight, 
  Star, Truck, Shield, Package, Users,
  ShoppingBag, Heart, Menu, X,
  MapPin, Clock, CreditCard, Award,
  Zap, TrendingUp, ArrowRight, Filter
} from 'lucide-react';

// Hero slides with stock images
const heroSlides = [
  {
    id: 1,
    title: 'Real-Time Inventory Sync',
    subtitle: 'Shop with confidence knowing stock updates live across 85 stores',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: 'Shop Now',
    color: 'from-blue-900/70 to-blue-600/50'
  },
  {
    id: 2,
    title: 'Diwali Festival Sale',
    subtitle: 'Up to 50% off on Electronics & Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: 'View Offers',
    color: 'from-orange-900/70 to-orange-600/50'
  },
  {
    id: 3,
    title: 'Fastest Delivery',
    subtitle: 'Same-day delivery in 15+ cities across India',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    cta: 'Shop Today',
    color: 'from-green-900/70 to-emerald-600/50'
  },
];

// Product data with stock images
const products = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro Max', 
    price: '₹1,49,999', 
    originalPrice: '₹1,59,999',
    stock: 8, 
    category: 'Electronics', 
    rating: 4.9,
    reviews: 256,
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Best Seller', '5G']
  },
  { 
    id: 2, 
    name: 'Samsung Galaxy S24 Ultra', 
    price: '₹1,29,999', 
    originalPrice: '₹1,39,999',
    stock: 15, 
    category: 'Electronics', 
    rating: 4.8,
    reviews: 189,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['AI Features', '256GB']
  },
  { 
    id: 3, 
    name: 'Sony 75" 4K Smart TV', 
    price: '₹1,24,999', 
    originalPrice: '₹1,34,999',
    stock: 6, 
    category: 'Electronics', 
    rating: 4.7,
    reviews: 312,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Android TV', 'Dolby Vision']
  },
  { 
    id: 4, 
    name: 'Nike Air Max 270 React', 
    price: '₹9,999', 
    originalPrice: '₹11,999',
    stock: 24, 
    category: 'Footwear', 
    rating: 4.5,
    reviews: 143,
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Comfort', 'Running']
  },
  { 
    id: 5, 
    name: 'Bose QuietComfort Headphones', 
    price: '₹29,999', 
    originalPrice: '₹34,999',
    stock: 12, 
    category: 'Audio', 
    rating: 4.8,
    reviews: 421,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Noise Cancelling', 'Wireless']
  },
  { 
    id: 6, 
    name: 'Samsung Refrigerator 500L', 
    price: '₹54,999', 
    originalPrice: '₹62,999',
    stock: 7, 
    category: 'Appliances', 
    rating: 4.6,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1584568694244-e0e99e8bdf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Smart Cooling', 'Energy Saver']
  },
  { 
    id: 7, 
    name: 'Dell XPS 15 Laptop', 
    price: '₹1,89,999', 
    originalPrice: '₹2,09,999',
    stock: 9, 
    category: 'Computers', 
    rating: 4.9,
    reviews: 278,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['i9 Processor', '4K Display']
  },
  { 
    id: 8, 
    name: 'Adidas Ultraboost 22', 
    price: '₹12,999', 
    originalPrice: '₹14,999',
    stock: 18, 
    category: 'Footwear', 
    rating: 4.4,
    reviews: 167,
    imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['Running', 'Boost Technology']
  },
];

export default function RishabRetailCustomer() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(3);
  const [wishlistCount, setWishlistCount] = useState(2);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveStock, setLiveStock] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate live stock updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStock(prev => prev.map(p => {
        if (p.id === 1 && Math.random() > 0.7 && p.stock > 0) {
          return { ...p, stock: p.stock - 1 };
        }
        if (p.id === 4 && Math.random() > 0.8 && p.stock > 0) {
          return { ...p, stock: p.stock - 1 };
        }
        return p;
      }));
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const addToCart = (productId: number) => {
    const product = liveStock.find(p => p.id === productId);
    if (product && product.stock > 0) {
      setLiveStock(prev => prev.map(p => 
        p.id === productId ? { ...p, stock: p.stock - 1 } : p
      ));
      setCartCount(prev => prev + 1);
      // Show success notification
    }
  };

  const addToWishlist = (productId: number) => {
    setWishlistCount(prev => prev + 1);
    // Show success notification
  };

  const filteredProducts = selectedCategory === 'all' 
    ? liveStock 
    : liveStock.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER - Fixed z-index issue */}
      <header className="sticky top-0 z-30 bg-white shadow-md border-b">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="hidden md:flex items-center justify-between py-2 border-b text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>Deliver to: <span className="font-medium">New Delhi 110001</span></span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Store hours: 9AM - 10PM</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/help" className="text-gray-600 hover:text-blue-600">Help Center</Link>
              <Link href="/track" className="text-gray-600 hover:text-blue-600">Track Order</Link>
              <Link href="/stores" className="text-gray-600 hover:text-blue-600">Store Locator</Link>
            </div>
          </div>

          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Store className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Rishab Retail</h1>
                <p className="text-sm text-gray-600">Multi-store shopping experience</p>
              </div>
            </Link>

            {/* Live Stats Section (Fills empty space) */}
            <div className="hidden lg:flex items-center gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-4 h-4 text-green-500 animate-pulse" />
                  <span className="text-xs font-medium text-green-600">LIVE SYNC</span>
                </div>
                <p className="text-sm text-gray-600">85 Stores Active</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Package className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-medium text-blue-600">PRODUCTS</span>
                </div>
                <p className="text-sm text-gray-600">28,500+ SKUs</p>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span className="text-xs font-medium text-purple-600">TODAY</span>
                </div>
                <p className="text-sm text-gray-600">₹68.5L Sales</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for products, brands..."
                  className="w-full px-6 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6">
              {/* Admin Dashboard Link */}
              <Link 
                href="/industry-connect/snowflake-connect/admin" 
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 font-medium transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span className="hidden lg:inline">Admin Dashboard</span>
              </Link>

              <div className="hidden md:flex items-center gap-4">
                <Link href="/account" className="flex flex-col items-center text-gray-700 hover:text-blue-600">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span className="text-xs mt-1">Account</span>
                </Link>

                <Link href="/wishlist" className="flex flex-col items-center text-gray-700 hover:text-pink-600 relative">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="text-xs mt-1">Wishlist</span>
                </Link>

                <Link href="/cart" className="flex flex-col items-center text-gray-700 hover:text-blue-600 relative">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                  <span className="text-xs mt-1">Cart</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Category Navigation */}
          <nav className="hidden md:flex items-center gap-6 py-3 border-t">
            <button 
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              All Products
            </button>
            <button 
              onClick={() => setSelectedCategory('electronics')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'electronics' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Electronics
            </button>
            <button 
              onClick={() => setSelectedCategory('footwear')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'footwear' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Footwear
            </button>
            <button 
              onClick={() => setSelectedCategory('audio')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'audio' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Audio
            </button>
            <button 
              onClick={() => setSelectedCategory('appliances')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === 'appliances' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              Appliances
            </button>
            <Link href="/deals" className="text-red-600 hover:text-red-700 font-medium ml-auto">
              Today's Deals →
            </Link>
          </nav>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className={`p-3 rounded-lg ${
                      selectedCategory === 'all' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    All Products
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('electronics')}
                    className={`p-3 rounded-lg ${
                      selectedCategory === 'electronics' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    Electronics
                  </button>
                  <button 
                    onClick={() => setSelectedCategory('footwear')}
                    className={`p-3 rounded-lg ${
                      selectedCategory === 'footwear' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50'
                    }`}
                  >
                    Footwear
                  </button>
                  <Link href="/deals" className="p-3 bg-red-50 text-red-600 rounded-lg text-center">
                    Today's Deals
                  </Link>
                </div>
                <div className="pt-4 border-t">
                  <Link href="/account" className="flex items-center gap-3 p-3">Account</Link>
                  <Link href="/wishlist" className="flex items-center gap-3 p-3">Wishlist</Link>
                  <Link href="/cart" className="flex items-center gap-3 p-3">Cart ({cartCount})</Link>
                  <Link href="/industry-connect/snowflake-connect/admin" className="flex items-center gap-3 p-3 bg-blue-50 text-blue-700 rounded-lg mt-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    Admin Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO CAROUSEL */}
        <section className="relative h-[500px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.imageUrl}')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}`}></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
              </div>
              
              <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                <div className="text-white max-w-2xl">
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl text-white/90 mb-8">{slide.subtitle}</p>
                  <Link 
                    href="/products" 
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                  >
                    {slide.cta}
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </section>

        {/* CATEGORY FILTERS */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>{filteredProducts.length} products</span>
              </div>
            </div>
            
            {/* Active Category Indicator */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-blue-700">
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
                <span className="text-xs text-gray-600">
                  • Real-time stock from 85 stores
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCTS GRID */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                  {/* Product Image */}
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Stock Badge */}
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
                      </div>
                    </div>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={() => addToWishlist(product.id)}
                      className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white"
                    >
                      <Heart className="w-5 h-5 text-gray-700" />
                    </button>
                    
                    {/* Tags */}
                    <div className="absolute bottom-4 left-4 flex gap-2">
                      {product.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-gray-600">{product.category}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'fill-yellow-400 text-yellow-400' 
                                : 'fill-gray-300 text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button 
                      onClick={() => addToCart(product.id)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                        product.stock > 0 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.stock > 0 ? (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      ) : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Products */}
            <div className="mt-12 text-center">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 px-8 py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all"
              >
                View All Products
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* VALUE PROPOSITIONS */}
        <section className="py-12 bg-gradient-to-r from-blue-50 to-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
                <p className="text-gray-600">On orders above ₹999 across India</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
                <p className="text-gray-600">100% secure payment processing</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Dedicated customer support team</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">30-day return policy on all products</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Store className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Rishab Retail</h2>
              </div>
              <p className="text-gray-400">
                Multi-store retail experience with real-time inventory synchronization across 85 locations nationwide.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white">Careers</Link></li>
                <li><Link href="/press" className="text-gray-400 hover:text-white">Press</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white">Help Center</Link></li>
                <li><Link href="/returns" className="text-gray-400 hover:text-white">Returns & Refunds</Link></li>
                <li><Link href="/shipping" className="text-gray-400 hover:text-white">Shipping Policy</Link></li>
                <li><Link href="/privacy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for updates and offers.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 rounded-r-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500 text-sm">
              ⚠️ <strong>Demo Notice:</strong> Rishab Retail is a demonstration of real-time inventory synchronization technology powered by Snowflake.
            </p>
            <p className="text-gray-600 text-sm mt-2">
              © 2024 Rishab Retail Demo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}