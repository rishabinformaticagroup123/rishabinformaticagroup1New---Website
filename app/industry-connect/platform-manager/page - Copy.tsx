// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, X, Check, Upload, Globe } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  isCustomThumbnail: boolean;
}

export default function PlatformManager() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [formData, setFormData] = useState({ name: '', url: '' });
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load platforms from localStorage on mount
  useEffect(() => {
    const savedPlatforms = localStorage.getItem('platforms');
    if (savedPlatforms) {
      setPlatforms(JSON.parse(savedPlatforms));
    } else {
      // Default platforms
      const defaultPlatforms: Platform[] = [
        { id: '1', name: 'Google', url: 'https://www.google.com', thumbnail: '', isCustomThumbnail: false },
        { id: '2', name: 'Amazon', url: 'https://www.amazon.com', thumbnail: '', isCustomThumbnail: false },
        { id: '3', name: 'DEEPSEEK', url: 'https://www.deepseek.com', thumbnail: '', isCustomThumbnail: false },
        { id: '4', name: 'ChatGPT', url: 'https://chat.openai.com', thumbnail: '', isCustomThumbnail: false },
        { id: '5', name: 'Claude.ai', url: 'https://claude.ai', thumbnail: '', isCustomThumbnail: false },
        { id: '6', name: 'WhatsApp Web', url: 'https://web.whatsapp.com', thumbnail: '', isCustomThumbnail: false },
        { id: '7', name: 'Facebook', url: 'https://www.facebook.com', thumbnail: '', isCustomThumbnail: false },
        { id: '8', name: 'LinkedIn', url: 'https://www.linkedin.com', thumbnail: '', isCustomThumbnail: false },
        { id: '9', name: 'PayPal', url: 'https://www.paypal.com', thumbnail: '', isCustomThumbnail: false },
        { id: '10', name: 'Snowflake', url: 'https://app.snowflake.com', thumbnail: '', isCustomThumbnail: false },
      ];
      setPlatforms(defaultPlatforms);
      localStorage.setItem('platforms', JSON.stringify(defaultPlatforms));
    }
  }, []);

  // Save platforms to localStorage whenever they change
  useEffect(() => {
    if (platforms.length > 0) {
      localStorage.setItem('platforms', JSON.stringify(platforms));
    }
  }, [platforms]);

  // Generate favicon URL for a domain
  const getFaviconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return '';
    }
  };

  // Generate screenshot URL (using a service like screenshotapi or similar)
  const getScreenshotUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://api.microlink.io/?url=${domain}&screenshot=true&embed=screenshot.url`;
    } catch {
      return '';
    }
  };

  // Automatically load thumbnail for a platform
  const loadThumbnail = async (platform: Platform): Promise<string> => {
    try {
      // Try to get favicon first
      const favicon = getFaviconUrl(platform.url);
      if (favicon) {
        // Check if favicon loads
        const response = await fetch(favicon);
        if (response.ok) {
          return favicon;
        }
      }

      // Try to get screenshot as fallback
      const screenshot = getScreenshotUrl(platform.url);
      return screenshot;
    } catch {
      return '';
    }
  };

  // Add new platform
  const handleAddPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newPlatform: Platform = {
        id: Date.now().toString(),
        name: formData.name,
        url: formData.url,
        thumbnail: customImage || '',
        isCustomThumbnail: !!customImage,
      };

      // If no custom image, try to load thumbnail automatically
      if (!customImage) {
        const thumbnail = await loadThumbnail(newPlatform);
        newPlatform.thumbnail = thumbnail;
      }

      setPlatforms([...platforms, newPlatform]);
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding platform:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit platform
  const handleEditPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlatform) return;

    setIsLoading(true);
    try {
      const updatedPlatform: Platform = {
        ...editingPlatform,
        name: formData.name,
        url: formData.url,
        thumbnail: customImage || editingPlatform.thumbnail,
        isCustomThumbnail: !!customImage || editingPlatform.isCustomThumbnail,
      };

      // If no custom image and no existing thumbnail, try to load automatically
      if (!customImage && !updatedPlatform.thumbnail) {
        const thumbnail = await loadThumbnail(updatedPlatform);
        updatedPlatform.thumbnail = thumbnail;
        updatedPlatform.isCustomThumbnail = false;
      }

      setPlatforms(platforms.map(p => p.id === editingPlatform.id ? updatedPlatform : p));
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error editing platform:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete platform
  const handleDeletePlatform = (id: string) => {
    if (confirm('Are you sure you want to delete this platform?')) {
      setPlatforms(platforms.filter(p => p.id !== id));
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({ name: '', url: '' });
    setCustomImage(null);
    setEditingPlatform(null);
  };

  // Open edit modal
  const openEditModal = (platform: Platform) => {
    setEditingPlatform(platform);
    setFormData({ name: platform.name, url: platform.url });
    setCustomImage(platform.isCustomThumbnail ? platform.thumbnail : null);
    setIsModalOpen(true);
  };

  // Open add modal
  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open platform in new tab
  const openPlatform = (url: string) => {
    window.open(url, '_blank');
  };

  // Render thumbnail
  const renderThumbnail = (platform: Platform) => {
    if (platform.thumbnail) {
      return (
        <div className="relative w-full h-full">
          <img
            src={platform.thumbnail}
            alt={platform.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // If image fails to load, show fallback
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'w-full h-full flex items-center justify-center bg-gray-200';
                fallback.innerHTML = `<span class="text-4xl font-bold text-gray-400">${platform.name.charAt(0)}</span>`;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>
      );
    }

    // Show fallback with first letter
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <span className="text-4xl font-bold text-white">{platform.name.charAt(0)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Platform Manager</h1>
            <p className="text-gray-600 mt-1">Manage all your platforms in one place</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Platform
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer"
              onClick={() => openPlatform(platform.url)}
            >
              {/* Thumbnail */}
              <div className="aspect-square relative bg-gray-100">
                {renderThumbnail(platform)}
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(platform);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <Pencil size={16} className="text-gray-700" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePlatform(platform.id);
                      }}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Platform name */}
              <div className="p-3 text-center">
                <h3 className="text-sm font-medium text-gray-900 truncate">{platform.name}</h3>
                <p className="text-xs text-gray-500 truncate mt-1">
                  {new URL(platform.url).hostname}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {platforms.length === 0 && (
          <div className="text-center py-12">
            <Globe size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No platforms added yet</h3>
            <p className="text-gray-500 mt-2">Click the &quot;Add Platform&quot; button to get started</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPlatform ? 'Edit Platform' : 'Add New Platform'}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={editingPlatform ? handleEditPlatform : handleAddPlatform}>
              {/* Platform Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Platform Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Facebook"
                />
              </div>

              {/* URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <input
                  type="url"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="https://www.example.com"
                />
              </div>

              {/* Custom Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Thumbnail (Optional)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-400">PNG, JPG, SVG up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  
                  {customImage && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <img
                        src={customImage}
                        alt="Custom thumbnail preview"
                        className="w-full h-full object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => setCustomImage(null)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Leave empty to auto-load favicon/thumbnail
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      {editingPlatform ? 'Update Platform' : 'Add Platform'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}