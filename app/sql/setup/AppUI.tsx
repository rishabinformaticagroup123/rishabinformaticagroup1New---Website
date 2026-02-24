'use client'

import { useRef, useState, useEffect } from 'react'
import Split from 'react-split'
import { SqlMode } from '@/lib/conversion'
import { ChevronLeft, ChevronRight, Sparkles, Menu, X, Database, Eye, Plug, User, LogOut, Moon, Sun } from 'lucide-react'
import { Switch } from '@/components/ui/switch'

interface AppUIProps {
  // State values
  query: string
  result: any
  columns: any[]
  error: string | null
  sqlMode: SqlMode
  notice: string | null
  info: string | null
  tables: string[]
  views: string[]
  connections: string[]
  loading: boolean
  resultDisplayState: string
  isAIAssistantOpen: boolean
  isAuthModalOpen: string | null
  email: string
  password: string
  authError: string | null
  user: any
  
  // State setters
  setQuery: (query: string) => void
  setSqlMode: (mode: SqlMode) => void
  setAIAssistantOpen: (open: boolean) => void
  setAuthModalOpen: (modal: string | null) => void
  setEmail: (email: string) => void
  setPassword: (password: string) => void
  
  // Functions
  runQuery: () => void
  handleOwnAuth: () => void
  handleLogout: () => void
  signInWithGoogle: () => void
  renderResultsContent: () => JSX.Element
  AceEditor: any
  editorRef: React.MutableRefObject<any>
}

export default function AppUI({
  // State values
  query,
  result,
  columns,
  error,
  sqlMode,
  notice,
  info,
  tables,
  views,
  connections,
  loading,
  resultDisplayState,
  isAIAssistantOpen,
  isAuthModalOpen,
  email,
  password,
  authError,
  user,
  
  // State setters
  setQuery,
  setSqlMode,
  setAIAssistantOpen,
  setAuthModalOpen,
  setEmail,
  setPassword,
  
  // Functions
  runQuery,
  handleOwnAuth,
  handleLogout,
  signInWithGoogle,
  renderResultsContent,
  AceEditor,
  editorRef
}: AppUIProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'tables' | 'views' | 'connections'>('tables')
  const [isClient, setIsClient] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(280)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [splitSizes, setSplitSizes] = useState([70, 30])
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Load saved split sizes from localStorage
    const savedSizes = localStorage.getItem('sql-playground-split-sizes')
    if (savedSizes) {
      try {
        const sizes = JSON.parse(savedSizes)
        setSplitSizes(sizes)
      } catch (e) {
        console.error('Error loading split sizes:', e)
      }
    }

    // Load dark mode preference from localStorage
    const savedDarkMode = localStorage.getItem('sql-playground-dark-mode')
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    localStorage.setItem('sql-playground-dark-mode', JSON.stringify(newDarkMode))
  }

  // Handle split drag end and save to localStorage
  const handleSplitDragEnd = (sizes: number[]) => {
    setSplitSizes(sizes)
    localStorage.setItem('sql-playground-split-sizes', JSON.stringify(sizes))
  }

  // Reset split sizes to default
  const resetSplitSizes = () => {
    const defaultSizes = [70, 30]
    setSplitSizes(defaultSizes)
    localStorage.setItem('sql-playground-split-sizes', JSON.stringify(defaultSizes))
  }

  // Handle sidebar resizing
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = e.clientX
      if (newWidth > 200 && newWidth < 500) {
        setSidebarWidth(newWidth)
      }
    }

    const handleMouseUp = () => {
      setIsResizing(false)
    }

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing])

  // Add Ctrl+Enter shortcut for desktop view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault()
        runQuery()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [runQuery])

  // Define theme colors based on dark mode
  const themeColors = {
    bgPrimary: isDarkMode ? '#0f172a' : '#f5f6f7',
    bgSecondary: isDarkMode ? '#1e293b' : '#ffffff',
    bgHeader: isDarkMode ? '#111827' : '#2c3e50',
    bgSidebar: isDarkMode ? '#1e293b' : '#f8f9fa',
    bgButton: isDarkMode ? '#334155' : '#3a506b',
    bgButtonHover: isDarkMode ? '#475569' : '#4a6280',
    textPrimary: isDarkMode ? '#f1f5f9' : '#333333',
    textSecondary: isDarkMode ? '#94a3b8' : '#666666',
    borderColor: isDarkMode ? '#334155' : '#d1d5db',
    accentBlue: isDarkMode ? '#3b82f6' : '#2563eb',
    accentRed: isDarkMode ? '#ef4444' : '#dc2626',
    accentGreen: isDarkMode ? '#10b981' : '#059669',
    accentYellow: isDarkMode ? '#f59e0b' : '#d97706',
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#f5f6f7] text-gray-800 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 bg-[#2c3e50] text-white border-b">
          <h1 className="text-lg font-semibold">Rishab SQL Playground</h1>
        </div>
        <div className="flex-1 bg-white p-3">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen flex flex-col transition-colors duration-200"
      style={{ 
        backgroundColor: themeColors.bgPrimary,
        color: themeColors.textPrimary
      }}
    >
      {/* Header - Professional Design */}
      <header 
        className="flex items-center justify-between px-4 py-3 border-b transition-colors duration-200"
        style={{ 
          backgroundColor: themeColors.bgHeader,
          color: '#ffffff',
          borderColor: themeColors.borderColor
        }}
      >
        {/* Left: Hamburger Menu (Mobile Only) & DB Toggle (Desktop) */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#3a506b] transition-colors"
            style={{ backgroundColor: isDarkMode ? '#374151' : '#3a506b' }}
          >
            <Menu size={20} />
          </button>

          {/* DB Switch - Desktop Only */}
          <div 
            className="hidden md:flex items-center gap-2 rounded-lg py-1 px-3 transition-colors duration-200"
            style={{ backgroundColor: themeColors.bgButton }}
          >
            <span className="text-sm font-medium">Oracle</span>
            <Switch 
              checked={sqlMode === 'postgres'} 
              onCheckedChange={checked => setSqlMode(checked ? 'postgres' : 'oracle')} 
              className="data-[state=checked]:bg-blue-600" 
            />
            <span className="text-sm font-medium">PostgreSQL</span>
          </div>
        </div>

        {/* Center: Title */}
        <h1 className="text-lg md:text-xl font-semibold text-center">
          Rishab SQL Play Ground
        </h1>

        {/* Right: Dark Mode & Auth Buttons */}
        <div className="flex items-center gap-2">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md transition-colors duration-200 hover:bg-opacity-80"
            style={{ 
              backgroundColor: themeColors.bgButton,
              color: '#ffffff'
            }}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {!user ? (
            <button 
              onClick={() => setAuthModalOpen('login')} 
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 md:px-4 rounded-md text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <User size={16} />
              <span className="hidden sm:inline">Sign in</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div 
                className="hidden sm:flex items-center gap-2 rounded-lg py-1 px-3 transition-colors duration-200"
                style={{ backgroundColor: themeColors.bgButton }}
              >
                <User size={16} className="text-blue-300" />
                <span className="text-sm">Hi, {user.name || user.email.split('@')[0]}</span>
              </div>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* DB Switch for Mobile - Below Header */}
      <div 
        className="md:hidden flex items-center justify-center py-2 transition-colors duration-200"
        style={{ 
          backgroundColor: themeColors.bgButton,
          color: '#ffffff'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Oracle</span>
          <Switch 
            checked={sqlMode === 'postgres'} 
            onCheckedChange={checked => setSqlMode(checked ? 'postgres' : 'oracle')} 
            className="data-[state=checked]:bg-blue-600 h-4 w-8" 
          />
          <span className="text-sm font-medium">PostgreSQL</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Left Panel - Sidebar with Resize Handle */}
        <div 
          ref={sidebarRef}
          className={`
            fixed md:relative top-0 left-0 h-full w-64 md:w-auto p-3 overflow-auto border-r z-50
            transform transition-transform duration-300 ease-in-out transition-colors duration-200
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:flex md:flex-shrink-0
          `}
          style={{ 
            width: `${sidebarWidth}px`,
            backgroundColor: themeColors.bgSidebar,
            color: themeColors.textPrimary,
            borderColor: themeColors.borderColor
          }}
        >
          {/* Resize Handle */}
          <div 
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 bg-transparent hover:bg-blue-200 active:bg-blue-300 transition-colors"
            style={{ 
              backgroundColor: isDarkMode ? 'transparent' : 'transparent',
              '--hover-color': isDarkMode ? '#4b5563' : '#bfdbfe',
              '--active-color': isDarkMode ? '#6b7280' : '#93c5fd'
            } as React.CSSProperties}
            onMouseDown={() => setIsResizing(true)}
          />

          {/* Close button for mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute top-3 right-3 p-1 rounded transition-colors duration-200"
            style={{ 
              backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
              color: themeColors.textPrimary
            }}
          >
            <X size={18} />
          </button>

          {/* Mobile Tabs */}
          <div 
            className="md:hidden flex border-b mb-3 transition-colors duration-200"
            style={{ borderColor: themeColors.borderColor }}
          >
            <button
              onClick={() => setActiveTab('tables')}
              className={`flex-1 py-2 text-center text-sm font-medium transition-colors duration-200 ${
                activeTab === 'tables' ? 'border-b-2' : 'text-gray-500'
              }`}
              style={{ 
                color: activeTab === 'tables' ? themeColors.accentBlue : themeColors.textSecondary,
                borderColor: activeTab === 'tables' ? themeColors.accentBlue : 'transparent'
              }}
            >
              <Database size={16} className="mx-auto mb-1" />
              Tables
            </button>
            <button
              onClick={() => setActiveTab('views')}
              className={`flex-1 py-2 text-center text-sm font-medium transition-colors duration-200 ${
                activeTab === 'views' ? 'border-b-2' : 'text-gray-500'
              }`}
              style={{ 
                color: activeTab === 'views' ? themeColors.accentBlue : themeColors.textSecondary,
                borderColor: activeTab === 'views' ? themeColors.accentBlue : 'transparent'
              }}
            >
              <Eye size={16} className="mx-auto mb-1" />
              Views
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`flex-1 py-2 text-center text-sm font-medium transition-colors duration-200 ${
                activeTab === 'connections' ? 'border-b-2' : 'text-gray-500'
              }`}
              style={{ 
                color: activeTab === 'connections' ? themeColors.accentBlue : themeColors.textSecondary,
                borderColor: activeTab === 'connections' ? themeColors.accentBlue : 'transparent'
              }}
            >
              <Plug size={16} className="mx-auto mb-1" />
              Connections
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <h2 
              className="font-semibold mb-2 pb-1 border-b text-sm transition-colors duration-200"
              style={{ 
                color: themeColors.accentBlue,
                borderColor: themeColors.borderColor
              }}
            >
              Tables
            </h2>
            <div className="max-h-40 overflow-y-auto">
              {tables.length > 0 ? tables.map(table => (
                <div 
                  key={table} 
                  className="cursor-pointer py-1 px-2 rounded hover:bg-opacity-20 text-sm mb-1 truncate transition-colors duration-200"
                  style={{ 
                    color: themeColors.textPrimary,
                    '--hover-bg': isDarkMode ? '#3b82f6' : '#dbeafe'
                  } as React.CSSProperties}
                  onClick={() => setQuery(`SELECT * FROM ${table};`)}
                >
                  {table}
                </div>
              )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No tables found.</p>}
            </div>

            <h2 
              className="font-semibold mt-4 mb-2 pb-1 border-b text-sm transition-colors duration-200"
              style={{ 
                color: themeColors.accentBlue,
                borderColor: themeColors.borderColor
              }}
            >
              Views
            </h2>
            <div className="max-h-40 overflow-y-auto">
              {views.length > 0 ? views.map(view => (
                <div 
                  key={view} 
                  className="cursor-pointer py-1 px-2 rounded hover:bg-opacity-20 text-sm mb-1 truncate transition-colors duration-200"
                  style={{ 
                    color: themeColors.textPrimary,
                    '--hover-bg': isDarkMode ? '#10b981' : '#d1fae5'
                  } as React.CSSProperties}
                  onClick={() => setQuery(`SELECT * FROM ${view};`)}
                >
                  {view}
                </div>
              )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No views found.</p>}
            </div>

            <h2 
              className="font-semibold mt-4 mb-2 pb-1 border-b text-sm transition-colors duration-200"
              style={{ 
                color: themeColors.accentBlue,
                borderColor: themeColors.borderColor
              }}
            >
              Connections
            </h2>
            <div className="max-h-40 overflow-y-auto">
              {connections.length > 0 ? connections.map(conn => (
                <div 
                  key={conn} 
                  className="cursor-pointer py-1 px-2 rounded hover:bg-opacity-20 text-sm mb-1 truncate transition-colors duration-200"
                  style={{ 
                    color: themeColors.textPrimary,
                    '--hover-bg': isDarkMode ? '#8b5cf6' : '#f3e8ff'
                  } as React.CSSProperties}
                >
                  {conn}
                </div>
              )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No connections found.</p>}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {activeTab === 'tables' && (
              <>
                <h2 
                  className="font-semibold mb-2 transition-colors duration-200"
                  style={{ color: themeColors.accentBlue }}
                >
                  Tables
                </h2>
                <div className="max-h-64 overflow-y-auto">
                  {tables.length > 0 ? tables.map(table => (
                    <div 
                      key={table} 
                      className="cursor-pointer py-2 px-2 rounded hover:bg-opacity-20 text-sm border-b transition-colors duration-200"
                      style={{ 
                        color: themeColors.textPrimary,
                        borderColor: themeColors.borderColor,
                        '--hover-bg': isDarkMode ? '#3b82f6' : '#dbeafe'
                      } as React.CSSProperties}
                      onClick={() => { setQuery(`SELECT * FROM ${table};`); setIsSidebarOpen(false); }}
                    >
                      {table}
                    </div>
                  )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No tables found.</p>}
                </div>
              </>
            )}
            
            {activeTab === 'views' && (
              <>
                <h2 
                  className="font-semibold mb-2 transition-colors duration-200"
                  style={{ color: themeColors.accentBlue }}
                >
                  Views
                </h2>
                <div className="max-h-64 overflow-y-auto">
                  {views.length > 0 ? views.map(view => (
                    <div 
                      key={view} 
                      className="cursor-pointer py-2 px-2 rounded hover:bg-opacity-20 text-sm border-b transition-colors duration-200"
                      style={{ 
                        color: themeColors.textPrimary,
                        borderColor: themeColors.borderColor,
                        '--hover-bg': isDarkMode ? '#10b981' : '#d1fae5'
                      } as React.CSSProperties}
                      onClick={() => { setQuery(`SELECT * FROM ${view};`); setIsSidebarOpen(false); }}
                    >
                      {view}
                    </div>
                  )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No views found.</p>}
                </div>
              </>
            )}
            
            {activeTab === 'connections' && (
              <>
                <h2 
                  className="font-semibold mb-2 transition-colors duration-200"
                  style={{ color: themeColors.accentBlue }}
                >
                  Connections
                </h2>
                <div className="max-h-64 overflow-y-auto">
                  {connections.length > 0 ? connections.map(conn => (
                    <div 
                      key={conn} 
                      className="cursor-pointer py-2 px-2 rounded hover:bg-opacity-20 text-sm border-b transition-colors duration-200"
                      style={{ 
                        color: themeColors.textPrimary,
                        borderColor: themeColors.borderColor,
                        '--hover-bg': isDarkMode ? '#8b5cf6' : '#f3e8ff'
                      } as React.CSSProperties}
                    >
                      {conn}
                    </div>
                  )) : <p className="text-sm transition-colors duration-200" style={{ color: themeColors.textSecondary }}>No connections found.</p>}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Panel - Editor & Results */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Split 
            className="flex flex-col flex-1 h-full"
            direction="vertical" 
            sizes={splitSizes}
            minSize={[200, 150]} // Increased minimum sizes for stability
            gutterSize={6} 
            snapOffset={30}
            onDragEnd={handleSplitDragEnd} // Use the persistent handler
          >
            {/* SQL Editor */}
            <div 
              className="p-4 flex flex-col h-full transition-colors duration-200"
              style={{ 
                backgroundColor: themeColors.bgSecondary,
                minHeight: '200px'
              }}
            >
              <div className="flex-1 overflow-hidden min-h-[150px]">
                <AceEditor
                  mode="sql"
                  theme={isDarkMode ? "tomorrow_night" : "sqlserver"}
                  value={query}
                  onChange={setQuery}
                  width="100%"
                  height="100%"
                  fontSize={14}
                  setOptions={{ 
                    enableBasicAutocompletion: true, 
                    enableLiveAutocompletion: true, 
                    showLineNumbers: true, 
                    tabSize: 2,
                    useWorker: false
                  }}
                  onLoad={editor => { 
                    editorRef.current = { editor }
                    // Set editor background color for dark mode
                    if (isDarkMode) {
                      editor.setOption('theme', 'tomorrow_night')
                      editor.container.style.backgroundColor = '#1e293b'
                    }
                  }}
                />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={runQuery} 
                    disabled={loading} 
                    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? 'Running...' : 'Run Query'}
                  </button>
                  <button 
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    Import CSV
                  </button>
                  <button 
                    className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                  >
                    Export CSV
                  </button>
                  <button 
                    onClick={resetSplitSizes}
                    className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-md text-sm font-medium flex items-center gap-1 transition-colors"
                    title="Reset Layout"
                  >
                    Reset Layout
                  </button>
                </div>
                <span className="hidden lg:inline text-xs transition-colors duration-200" style={{ color: themeColors.textSecondary }}>
                  Press Ctrl+Enter to run query
                </span>
                {notice && <span className="text-xs text-yellow-600 sm:text-right">ℹ️ {notice}</span>}
              </div>
              {error && (
                <pre 
                  className="whitespace-pre-wrap p-2 rounded mt-3 text-xs max-h-40 overflow-auto transition-colors duration-200"
                  style={{ 
                    color: themeColors.accentRed,
                    backgroundColor: isDarkMode ? '#450a0a' : '#fef2f2'
                  }}
                >
                  {error}
                </pre>
              )}
              {info && !error && (
                <div 
                  className="rounded p-2 mt-3 text-xs max-h-40 overflow-auto transition-colors duration-200"
                  style={{ 
                    color: themeColors.accentGreen,
                    backgroundColor: isDarkMode ? '#064e3b' : '#f0fdf4'
                  }}
                >
                  {info}
                </div>
              )}
            </div>

            {/* SQL Results - Stable positioning */}
            <div 
              className="p-4 overflow-auto relative transition-colors duration-200" 
              style={{ 
                backgroundColor: themeColors.bgSecondary,
                minHeight: '150px',
                maxHeight: 'calc(100vh - 250px)' // Prevent excessive growth
              }}
            >
              {renderResultsContent()}
            </div>
          </Split>
        </div>
      </div>

      {/* AI Assistant */}
      {isAIAssistantOpen && (
        <div 
          className="fixed top-0 right-0 h-full w-full lg:w-[350px] border-l flex flex-col z-50 shadow-lg transition-colors duration-200"
          style={{ 
            backgroundColor: themeColors.bgSecondary,
            borderColor: themeColors.borderColor
          }}
        >
          <div 
            className="px-4 py-3 border-b flex justify-between items-center transition-colors duration-200"
            style={{ 
              backgroundColor: themeColors.bgHeader,
              borderColor: themeColors.borderColor
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={16} />
              <h3 className="font-semibold text-white text-sm">Rishab SQL Assistant</h3>
            </div>
            <button 
              onClick={() => setAIAssistantOpen(false)} 
              className="p-1 rounded hover:bg-opacity-50 text-white transition-colors duration-200"
              style={{ backgroundColor: isDarkMode ? '#374151' : '#4a6280' }}
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex-1 relative">
            <iframe 
              src="https://www.chatbase.co/chatbot-iframe/TVtP0qH0gU4mn3sBMHMnL" 
              className="w-full h-full border-none" 
              title="SQL AI Assistant"
              style={{ marginBottom: '0' }}
            />
            <div 
              className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t pointer-events-none transition-colors duration-200"
              style={{ 
                background: `linear-gradient(to top, ${themeColors.bgSecondary}, transparent)`
              }}
            ></div>
          </div>
        </div>
      )}

      {!isAIAssistantOpen && (
        <button 
          onClick={() => setAIAssistantOpen(true)} 
          className="fixed right-0 top-1/2 transform -translate-y-1/2 p-2 pl-3 rounded-l-lg shadow-lg transition-colors duration-200 flex items-center gap-1 z-40"
          style={{ 
            backgroundColor: themeColors.bgHeader,
            color: '#ffffff'
          }}
        >
          <Sparkles className="text-yellow-400 mr-1" size={16} />
          <span className="hidden sm:inline text-xs font-medium mr-1">SQL AI Help</span>
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div 
            className="rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-xl transition-colors duration-200"
            style={{ 
              backgroundColor: themeColors.bgSecondary,
              color: themeColors.textPrimary
            }}
          >
            <h2 className="text-lg font-semibold mb-4">{isAuthModalOpen === 'login' ? 'Login' : 'Sign Up'}</h2>
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full mb-3 p-3 border rounded-md transition-colors duration-200"
              style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: themeColors.textPrimary,
                borderColor: themeColors.borderColor
              }}
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="Password" 
              className="w-full mb-4 p-3 border rounded-md transition-colors duration-200"
              style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: themeColors.textPrimary,
                borderColor: themeColors.borderColor
              }}
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
            <button 
              onClick={handleOwnAuth} 
              className="w-full bg-blue-600 text-white py-3 rounded-md mb-3 font-medium hover:bg-blue-700 transition-colors"
            >
              {isAuthModalOpen === 'login' ? 'Login' : 'Sign Up'}
            </button>
            {authError && <div className="text-red-600 text-sm mb-3 text-center">{authError}</div>}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div 
                  className="w-full border-t transition-colors duration-200"
                  style={{ borderColor: themeColors.borderColor }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-2 transition-colors duration-200"
                  style={{ 
                    backgroundColor: themeColors.bgSecondary,
                    color: themeColors.textSecondary
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>
            <button 
              onClick={signInWithGoogle} 
              className="w-full flex justify-center items-center gap-2 border py-3 px-4 rounded-md hover:bg-opacity-10 transition-colors mb-4"
              style={{ 
                backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
                color: themeColors.textPrimary,
                borderColor: themeColors.borderColor
              }}
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <button 
              onClick={() => setAuthModalOpen(null)} 
              className="w-full py-3 rounded-md hover:bg-opacity-20 transition-colors"
              style={{ 
                backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
                color: themeColors.textPrimary
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Add CSS for Split component stability */}
      <style jsx>{`
        .gutter.gutter-vertical {
          background-color: ${isDarkMode ? '#334155' : '#e1e5e9'};
          cursor: row-resize;
          position: relative;
          z-index: 10;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyLjUiIGN5PSIyLjUiIHI9IjIuNSIgZmlsbD0iI2I4YzFkMSIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMi41IiByPSIyLjUiIGZpbGw9IiNiOGMxZDEiLz48Y2lyY2xlIGN4PSIxNy41IiBjeT0iMi41IiByPSIyLjUiIGZpbGw9IiNiOGMxZDEiLz48L3N2Zz4=');
          background-repeat: no-repeat;
          background-position: 50% 50%;
          transition: background-color 0.2s ease;
        }
        .gutter.gutter-vertical:hover {
          background-color: ${isDarkMode ? '#475569' : '#c8d0d9'};
        }
        .split-vertical {
          display: flex;
          flex-direction: column;
          height: 100% !important;
        }
        .split-vertical > div {
          overflow: hidden !important;
        }
        
        /* Hover styles for sidebar items */
        div[class*="hover:bg-opacity-20"]:hover {
          background-color: var(--hover-bg, rgba(0, 0, 0, 0.1)) !important;
        }
        
        /* Resize handle hover styles */
        div[class*="hover:bg-blue-200"]:hover {
          background-color: ${isDarkMode ? '#4b5563' : '#bfdbfe'} !important;
        }
        
        div[class*="active:bg-blue-300"]:active {
          background-color: ${isDarkMode ? '#6b7280' : '#93c5fd'} !important;
        }
      `}</style>
    </div>
  )
}