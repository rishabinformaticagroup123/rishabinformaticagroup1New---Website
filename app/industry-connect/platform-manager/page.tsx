// app/platforms/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Check, Upload, Globe, GripVertical } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  url: string;
  thumbnail: string;
  isCustomThumbnail: boolean;
  order: number;
  isLocked?: boolean;
}

// ✅ EMOJI MAPPING
const getPlatformEmoji = (name: string): string => {
  const map: { [key: string]: string } = {
    'google': '🔍', 'amazon': '🛒', 'deepseek': '🤖',
    'chatgpt': '💬', 'openai': '💬', 'claude': '🧠',
    'facebook': '👥', 'linkedin': '💼', 'paypal': '💰',
    'whatsapp': '📱', 'snowflake': '❄️', 'github': '🐙',
    'slack': '💬', 'notion': '📝', 'trello': '📋',
    'spotify': '🎵', 'netflix': '🎬', 'zoom': '📹',
    'gmail': '📧', 'drive': '📁', 'docs': '📄',
    'lms': '🎓', 'course': '📚', 'dashboard': '📊',
    'rishab': '🏢'
  };
  
  const key = name.toLowerCase();
  for (const [k, v] of Object.entries(map)) {
    if (key.includes(k)) return v;
  }
  return name.charAt(0).toUpperCase();
};

// ✅ FORMAT URL
const formatUrl = (url: string): string => {
  url = url.trim();
  if (!url) return '';
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

// ✅ LOCKED PLATFORM IDs (These can NEVER be deleted)
const LOCKED_IDS = ['lms-1', 'lms-2', 'lms-3'];

// ✅ DEFAULT PLATFORMS - THESE ARE PERMANENTLY LOCKED
const getDefaultPlatforms = (): Platform[] => {
  return [
    // 🔒 PERMANENTLY LOCKED - CANNOT BE DELETED
    { 
      id: 'lms-1', 
      name: 'LMS Dashboard', 
      url: 'https://lms.rishabinformaticagroup.com', 
      thumbnail: '🎓', 
      isCustomThumbnail: false, 
      order: 0, 
      isLocked: true
    },
    { 
      id: 'lms-2', 
      name: 'Course Platform', 
      url: 'https://course.rishabinformatica.group', 
      thumbnail: '📚', 
      isCustomThumbnail: false, 
      order: 1, 
      isLocked: true
    },
    { 
      id: 'lms-3', 
      name: 'Rishab Informatics', 
      url: 'https://www.rishabinformaticagroup.com', 
      thumbnail: '🏢', 
      isCustomThumbnail: false, 
      order: 2, 
      isLocked: true
    },
    // 🆓 FREE - Can be deleted
    { id: '1', name: 'Google', url: 'https://www.google.com', thumbnail: '🔍', isCustomThumbnail: false, order: 3, isLocked: false },
    { id: '2', name: 'Amazon', url: 'https://www.amazon.com', thumbnail: '🛒', isCustomThumbnail: false, order: 4, isLocked: false },
    { id: '3', name: 'DeepSeek', url: 'https://www.deepseek.com', thumbnail: '🤖', isCustomThumbnail: false, order: 5, isLocked: false },
    { id: '4', name: 'ChatGPT', url: 'https://chat.openai.com', thumbnail: '💬', isCustomThumbnail: false, order: 6, isLocked: false },
    { id: '5', name: 'Claude', url: 'https://claude.ai', thumbnail: '🧠', isCustomThumbnail: false, order: 7, isLocked: false },
    { id: '6', name: 'WhatsApp', url: 'https://web.whatsapp.com', thumbnail: '📱', isCustomThumbnail: false, order: 8, isLocked: false },
    { id: '7', name: 'Facebook', url: 'https://www.facebook.com', thumbnail: '👥', isCustomThumbnail: false, order: 9, isLocked: false },
    { id: '8', name: 'LinkedIn', url: 'https://www.linkedin.com', thumbnail: '💼', isCustomThumbnail: false, order: 10, isLocked: false },
    { id: '9', name: 'PayPal', url: 'https://www.paypal.com', thumbnail: '💰', isCustomThumbnail: false, order: 11, isLocked: false },
  ];
};

export default function PlatformManager() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatform, setEditingPlatform] = useState<Platform | null>(null);
  const [formData, setFormData] = useState({ name: '', url: '' });
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [unlockedIds, setUnlockedIds] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setIsClient(true);
  }, []);

  // ✅ LOAD PLATFORMS - ALWAYS INCLUDE LOCKED PLATFORMS
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const saved = localStorage.getItem('platforms');
      const defaults = getDefaultPlatforms();
      
      // 🔒 ALWAYS include locked platforms
      const lockedPlatforms = defaults.filter(p => LOCKED_IDS.includes(p.id));
      
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Start with locked platforms
        const merged = [...lockedPlatforms];
        
        // Add user platforms and free platforms that are NOT in locked
        parsed.forEach((p: Platform) => {
          const isLocked = LOCKED_IDS.includes(p.id);
          const exists = merged.some(d => d.id === p.id);
          if (!exists && !isLocked) {
            merged.push({ ...p, isLocked: false });
          }
        });
        
        // Add any free default platforms that are missing
        defaults.forEach((d: Platform) => {
          if (!LOCKED_IDS.includes(d.id)) {
            const exists = merged.some(m => m.id === d.id);
            if (!exists) {
              merged.push(d);
            }
          }
        });
        
        merged.sort((a, b) => a.order - b.order);
        setPlatforms(merged);
        localStorage.setItem('platforms', JSON.stringify(merged));
      } else {
        setPlatforms(defaults);
        localStorage.setItem('platforms', JSON.stringify(defaults));
      }
    } catch (e) {
      console.error('Error:', e);
      const defaults = getDefaultPlatforms();
      setPlatforms(defaults);
      localStorage.setItem('platforms', JSON.stringify(defaults));
    }
  }, [isClient]);

  // SAVE PLATFORMS
  useEffect(() => {
    if (!isClient || platforms.length === 0) return;
    localStorage.setItem('platforms', JSON.stringify(platforms));
  }, [platforms, isClient]);

  // ===== 4-CLICK UNLOCK (SECRET - ONLY YOU KNOW) =====
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});

  const handlePlatformClick = (platform: Platform, e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.action-button')) return;

    const id = platform.id;

    if (!platform.isLocked || unlockedIds[id]) {
      window.open(platform.url, '_blank');
      return;
    }

    const currentCount = (clickCounts[id] || 0) + 1;
    setClickCounts({ ...clickCounts, [id]: currentCount });

    if (currentCount >= 4) {
      setUnlockedIds({ ...unlockedIds, [id]: true });
      setPlatforms(platforms.map(p => 
        p.id === id ? { ...p, isLocked: false } : p
      ));
      setClickCounts({ ...clickCounts, [id]: 0 });
      window.open(platform.url, '_blank');
    } else {
      setTimeout(() => {
        setClickCounts(prev => ({ ...prev, [id]: 0 }));
      }, 3000);
    }
  };

  // ===== CRUD =====
  const handleAddPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newPlatform: Platform = {
        id: Date.now().toString(),
        name: formData.name,
        url: formatUrl(formData.url),
        thumbnail: customImage || getPlatformEmoji(formData.name),
        isCustomThumbnail: !!customImage,
        order: platforms.length,
        isLocked: false,
      };
      setPlatforms([...platforms, newPlatform]);
      resetForm();
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlatform) return;
    setIsLoading(true);
    try {
      // 🔒 If it's a locked platform and NOT unlocked → SILENTLY DO NOTHING
      if (LOCKED_IDS.includes(editingPlatform.id) && !unlockedIds[editingPlatform.id]) {
        setIsLoading(false);
        return;
      }
      
      const updated: Platform = {
        ...editingPlatform,
        name: formData.name,
        url: formatUrl(formData.url),
        thumbnail: customImage || getPlatformEmoji(formData.name),
        isCustomThumbnail: !!customImage || editingPlatform.isCustomThumbnail,
        isLocked: false,
      };
      setPlatforms(platforms.map(p => p.id === editingPlatform.id ? updated : p));
      resetForm();
      setIsModalOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ DELETE - LOCKED PLATFORMS CANNOT BE DELETED
  const handleDeletePlatform = (platform: Platform) => {
    // 🔒 If it's a locked platform → SILENTLY DO NOTHING (even if unlocked)
    if (LOCKED_IDS.includes(platform.id)) {
      return; // 👈 SILENT FAIL - NOTHING HAPPENS
    }
    
    if (confirm(`Delete "${platform.name}"?`)) {
      const filtered = platforms.filter(p => p.id !== platform.id);
      const reordered = filtered.map((p, i) => ({ ...p, order: i }));
      setPlatforms(reordered);
      const newUnlocked = { ...unlockedIds };
      delete newUnlocked[platform.id];
      setUnlockedIds(newUnlocked);
    }
  };

  // ✅ EDIT MODAL - LOCKED PLATFORMS CANNOT BE EDITED
  const openEditModal = (platform: Platform) => {
    // 🔒 If it's a locked platform and NOT unlocked → SILENTLY DO NOTHING
    if (LOCKED_IDS.includes(platform.id) && !unlockedIds[platform.id]) {
      return;
    }
    setEditingPlatform(platform);
    setFormData({ name: platform.name, url: platform.url });
    setCustomImage(platform.isCustomThumbnail ? platform.thumbnail : null);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({ name: '', url: '' });
    setCustomImage(null);
    setEditingPlatform(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setCustomImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // ===== DRAG & DROP =====
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
    (e.currentTarget as HTMLElement).style.opacity = '0.5';
  };

  const onDragEnd = (e: React.DragEvent) => {
    setDraggedId(null);
    setDragOverId(null);
    (e.currentTarget as HTMLElement).style.opacity = '1';
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  };

  const onDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverId(id);
    const el = e.currentTarget as HTMLElement;
    if (!el.classList.contains('drag-over')) {
      document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
      el.classList.add('drag-over');
    }
  };

  const onDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const sourceId = draggedId;
    if (!sourceId || sourceId === targetId) {
      setDragOverId(null);
      return;
    }
    const srcIdx = platforms.findIndex(p => p.id === sourceId);
    const tgtIdx = platforms.findIndex(p => p.id === targetId);
    if (srcIdx === -1 || tgtIdx === -1) return;
    const newList = [...platforms];
    const [removed] = newList.splice(srcIdx, 1);
    newList.splice(tgtIdx, 0, removed);
    const reordered = newList.map((p, i) => ({ ...p, order: i }));
    setPlatforms(reordered);
    setDraggedId(null);
    setDragOverId(null);
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
  };

  // ===== RENDER =====
  const renderThumb = (p: Platform) => {
    if (p.isCustomThumbnail && p.thumbnail?.startsWith('data:image')) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-50">
          <img src={p.thumbnail} alt={p.name} className="w-32 h-32 object-contain rounded-lg" />
        </div>
      );
    }
    const emoji = p.thumbnail || getPlatformEmoji(p.name);
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
          <span className="text-6xl">{emoji}</span>
        </div>
      </div>
    );
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🚀 Platform Manager</h1>
            <p className="text-gray-600 mt-1">Click to open • Drag to reorder</p>
          </div>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus size={20} /> Add Platform
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {platforms.sort((a, b) => a.order - b.order).map((p) => {
            const isLocked = LOCKED_IDS.includes(p.id);
            
            return (
              <div
                key={p.id}
                draggable
                onDragStart={(e) => onDragStart(e, p.id)}
                onDragEnd={onDragEnd}
                onDragOver={(e) => onDragOver(e, p.id)}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => onDrop(e, p.id)}
                onClick={(e) => handlePlatformClick(p, e)}
                className={`group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer ${
                  draggedId === p.id ? 'scale-95' : ''
                } ${dragOverId === p.id ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : ''}`}
              >
                {/* ⚠️ NO LOCK BADGE - COMPLETELY HIDDEN */}

                {/* DRAG HANDLE */}
                <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity action-button">
                  <GripVertical size={16} className="text-gray-400" />
                </div>

                {/* THUMBNAIL */}
                <div className="aspect-square relative bg-gray-50">
                  {renderThumb(p)}

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); openEditModal(p); }}
                        className={`p-2 bg-white rounded-full transition-colors action-button ${
                          isLocked && !unlockedIds[p.id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
                        }`}
                      >
                        <Pencil size={16} className={isLocked && !unlockedIds[p.id] ? 'text-gray-400' : 'text-gray-700'} />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDeletePlatform(p); }}
                        className={`p-2 bg-white rounded-full transition-colors action-button ${
                          isLocked ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-50'
                        }`}
                      >
                        <Trash2 size={16} className={isLocked ? 'text-gray-400' : 'text-red-600'} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* NAME & URL */}
                <div className="p-3 text-center">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{p.name}</h3>
                  <p className="text-xs text-gray-500 truncate mt-1">
                    {(() => { try { return new URL(p.url).hostname; } catch { return p.url; } })()}
                  </p>
                </div>

                {dragOverId === p.id && (
                  <div className="absolute inset-0 border-2 border-blue-500 border-dashed rounded-xl pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {platforms.length === 0 && (
          <div className="text-center py-12">
            <Globe size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No platforms added yet</h3>
            <p className="text-gray-500 mt-2">Click "Add Platform" to get started</p>
          </div>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingPlatform ? 'Edit Platform' : 'Add New Platform'}
              </h2>
              <button onClick={() => { setIsModalOpen(false); resetForm(); }} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={editingPlatform ? handleEditPlatform : handleAddPlatform}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="e.g., Twitter"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                <input
                  type="text"
                  required
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="www.example.com or https://..."
                />
                <p className="text-xs text-gray-400 mt-1">Works with or without https://</p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Thumbnail (Optional)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600">Upload image</p>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                  {customImage && (
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <img src={customImage} alt="Preview" className="w-full h-full object-cover rounded-lg border-2 border-blue-500" />
                      <button type="button" onClick={() => setCustomImage(null)} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                  {isLoading ? 'Processing...' : (editingPlatform ? 'Update' : 'Add')}
                </button>
                <button type="button" onClick={() => { setIsModalOpen(false); resetForm(); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
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