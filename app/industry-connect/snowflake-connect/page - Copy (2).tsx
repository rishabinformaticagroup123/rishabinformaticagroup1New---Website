// app/rishab-retail/page.tsx - UPDATED WITH IMAGE UPLOAD
'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, Store, Search, ChevronRight, 
  Star, Zap, Shield, Truck, ArrowRight,
  Package, Users, TrendingUp, Settings,
  BarChart3, RefreshCw, ShoppingBag, Upload,
  X, Image as ImageIcon, Plus, Camera
} from 'lucide-react';

// Default hero images (Unsplash URLs - free to use)
const defaultHeroSlides = [
  {
    id: 1,
    title: 'Real-Time Inventory',
    subtitle: 'Shop with confidence knowing our stock is always accurate',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    overlayColor: 'from-blue-900/70 to-blue-600/50'
  },
  {
    id: 2,
    title: '42 Stores Nationwide',
    subtitle: 'Buy online, pickup from any store instantly',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    overlayColor: 'from-green-900/70 to-emerald-600/50'
  },
  {
    id: 3,
    title: 'Price Match Guarantee',
    subtitle: 'Find it cheaper? We\'ll match the price',
    imageUrl: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    overlayColor: 'from-purple-900/70 to-pink-600/50'
  },
];

// Default product images
const defaultProducts = [
  { 
    id: 1, 
    name: 'iPhone 15 Pro', 
    price: '₹1,29,999', 
    stock: 5, 
    category: 'Electronics', 
    imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 2, 
    name: 'Samsung Galaxy S24', 
    price: '₹89,999', 
    stock: 12, 
    category: 'Electronics', 
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 3, 
    name: 'Sony 65" 4K TV', 
    price: '₹84,999', 
    stock: 8, 
    category: 'Electronics', 
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  { 
    id: 4, 
    name: 'Nike Air Max 270', 
    price: '₹7,999', 
    stock: 3, 
    category: 'Footwear', 
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
];

export default function RishabRetailHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cartCount, setCartCount] = useState(2);
  const [liveStock, setLiveStock] = useState(defaultProducts);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  // IMAGE UPLOAD STATES
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [products, setProducts] = useState(defaultProducts);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [uploadType, setUploadType] = useState<'hero' | 'product' | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageSubtitle, setImageSubtitle] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-rotate hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  // WebSocket simulation for live stock updates
  useEffect(() => {
    const simulateLiveUpdates = () => {
      setTimeout(() => {
        setLiveStock(prev => prev.map(p => 
          p.id === 1 ? { ...p, stock: p.stock > 0 ? p.stock - 1 : 0 } : p
        ));
      }, 8000);
      
      setTimeout(() => {
        setLiveStock(prev => prev.map(p => 
          p.id === 4 ? { ...p, stock: p.stock > 0 ? p.stock - 1 : 0 } : p
        ));
      }, 15000);
    };
    
    simulateLiveUpdates();
  }, []);

  const simulateSale = (productId: number) => {
    setLiveStock(prev => prev.map(p => 
      p.id === productId ? { ...p, stock: Math.max(0, p.stock - 1) } : p
    ));
    setCartCount(prev => prev + 1);
  };

  // IMAGE UPLOAD FUNCTIONS
  const openImageUpload = (type: 'hero' | 'product') => {
    setUploadType(type);
    setShowImageUpload(true);
    setImageUrl('');
    setImageTitle('');
    setImageSubtitle('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const addImage = () => {
    if (!imageUrl.trim()) {
      alert('Please enter an image URL or upload a file');
      return;
    }

    if (uploadType === 'hero') {
      if (!imageTitle.trim()) {
        alert('Please enter a title for the hero slide');
        return;
      }
      
      const newSlide = {
        id: heroSlides.length + 1,
        title: imageTitle,
        subtitle: imageSubtitle || 'New slide added',
        imageUrl: imageUrl,
        overlayColor: 'from-gray-900/70 to-blue-600/50'
      };
      
      setHeroSlides([...heroSlides, newSlide]);
      alert('Hero slide added successfully!');
    } 
    else if (uploadType === 'product') {
      if (!imageTitle.trim()) {
        alert('Please enter a product name');
        return;
      }
      
      const newProduct = {
        id: products.length + 1,
        name: imageTitle,
        price: '₹9,999', // Default price
        stock: 10, // Default stock
        category: 'New Arrival',
        imageUrl: imageUrl
      };
      
      setProducts([...products, newProduct]);
      setLiveStock(prev => [...prev, { ...newProduct, stock: 10 }]);
      alert('Product added successfully!');
    }
    
    setShowImageUpload(false);
    setImageUrl('');
    setImageTitle('');
    setImageSubtitle('');
  };

  const removeHeroSlide = (id: number) => {
    if (heroSlides.length <= 1) {
      alert('Cannot remove all hero slides');
      return;
    }
    setHeroSlides(heroSlides.filter(slide => slide.id !== id));
    if (currentSlide >= heroSlides.length - 1) {
      setCurrentSlide(0);
    }
  };

  const removeProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    setLiveStock(liveStock.filter(product => product.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* IMAGE UPLOAD MODAL */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {uploadType === 'hero' ? 'Add Hero Slide' : 'Add Product'}
              </h3>
              <button onClick={() => setShowImageUpload(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Image Preview */}
              {imageUrl && (
                <div className="border rounded-lg p-2">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-40 object-cover rounded"
                  />
                </div>
              )}
              
              {/* Upload Options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={triggerFileInput}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 flex flex-col items-center justify-center"
                >
                  <Upload className="w-8 h-8 text-gray-500 mb-2" />
                  <span className="text-sm">Upload File</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </button>
                
                <div className="p-4 border rounded-lg">
                  <label className="block text-sm font-medium mb-2">
                    Or enter URL:
                  </label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>
              
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {uploadType === 'hero' ? 'Slide Title' : 'Product Name'} *
                </label>
                <input
                  type="text"
                  placeholder={uploadType === 'hero' ? 'Enter slide title' : 'Enter product name'}
                  value={imageTitle}
                  onChange={(e) => setImageTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              
              {/* Subtitle/Description */}
              {uploadType === 'hero' && (
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Slide Subtitle
                  </label>
                  <input
                    type="text"
                    placeholder="Enter slide subtitle"
                    value={imageSubtitle}
                    onChange={(e) => setImageSubtitle(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addImage}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add {uploadType === 'hero' ? 'Slide' : 'Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HEADER - Updated with Image Controls */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md shadow-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <Store className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Rishab Retail
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live Inventory Sync • 42 Stores
                </p>
              </div>
            </Link>

            {/* Admin Panel with Image Controls */}
            <div className="relative">
              <button
                onClick={() => setShowAdminPanel(!showAdminPanel)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 text-blue-700 rounded-lg hover:from-blue-100 hover:to-blue-200 font-medium transition-all"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Admin Panel</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </button>

              {showAdminPanel && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border p-4 z-50">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ImageIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Image Management</h3>
                      <p className="text-xs text-gray-600">Add/Remove demo images</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {/* Image Controls */}
                    <button 
                      onClick={() => openImageUpload('hero')}
                      className="w-full flex items-center justify-between p-3 hover:bg-blue-50 rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Plus className="w-4 h-4 text-purple-600" />
                        </div>
                        <span>Add Hero Slide</span>
                      </div>
                      <Camera className="w-4 h-4 text-gray-400 group-hover:text-purple-600" />
                    </button>

                    <button 
                      onClick={() => openImageUpload('product')}
                      className="w-full flex items-center justify-between p-3 hover:bg-green-50 rounded-lg group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <Plus className="w-4 h-4 text-green-600" />
                        </div>
                        <span>Add Product Image</span>
                      </div>
                      <Package className="w-4 h-4 text-gray-400 group-hover:text-green-600" />
                    </button>

                    {/* Quick Actions Divider */}
                    <div className="pt-2 border-t">
                      <p className="text-xs text-gray-500 mb-2">Quick Actions:</p>
                      <button 
                        onClick={() => simulateSale(1)}
                        className="w-full mb-2 p-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                      >
                        Sell iPhone (Stock: {liveStock.find(p => p.id === 1)?.stock})
                      </button>
                      <Link 
                        href="/rishab-retail-admin"
                        className="block w-full p-2 bg-gray-800 text-white text-center text-sm rounded hover:bg-gray-900"
                      >
                        Open Full Dashboard →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION WITH REMOVE BUTTONS */}
        <section className="relative h-[500px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.imageUrl}')` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayColor}`}></div>
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
                
                {/* Remove Button (Admin only) */}
                <button
                  onClick={() => removeHeroSlide(slide.id)}
                  className="absolute top-4 right-4 z-20 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              {/* Slide Content */}
              <div className="container mx-auto px-4 h-full flex items-center relative z-20">
                <div className="text-white max-w-2xl">
                  <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl text-white/90 mb-8">{slide.subtitle}</p>
                  <div className="flex gap-4">
                    <Link 
                      href="/products" 
                      className="px-8 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-gray-100 transition-all hover:scale-105"
                    >
                      Shop Now
                    </Link>
                    <button 
                      onClick={() => openImageUpload('hero')}
                      className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Slide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
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

        {/* PRODUCTS SECTION WITH ADD/REMOVE */}
        <section className="py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
                <p className="text-gray-600">Real-time stock from Snowflake</p>
              </div>
              <button
                onClick={() => openImageUpload('product')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            {/* PRODUCT GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  {/* Product Image with Remove Button */}
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    
                    {/* Product Badges */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-4 right-4 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    {/* Stock Badge */}
                    <div className="absolute bottom-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        product.stock > 10 ? 'bg-green-100 text-green-800' :
                        product.stock > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Sold out'}
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => simulateSale(product.id)}
                      disabled={product.stock === 0}
                      className={`w-full py-3 rounded-lg font-medium transition-all ${
                        product.stock > 0 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800' 
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
              
              {/* Add New Product Card */}
              <div 
                onClick={() => openImageUpload('product')}
                className="border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Plus className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Product</h3>
                <p className="text-gray-500 text-center text-sm">
                  Upload an image and enter product details
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400 mb-2">
              <span className="text-green-400">⚠️ DEMO NOTICE:</span> This is a demonstration of real-time sync technology.
            </p>
            <p className="text-gray-500 text-sm">
              Rishab Retail is a fictional brand. Use the Admin Panel to add/remove images for demo purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}