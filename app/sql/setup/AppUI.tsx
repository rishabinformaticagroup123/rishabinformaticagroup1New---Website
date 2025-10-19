'use client'

import { useRef, useState, useEffect } from 'react'
import Split from 'react-split'
import { SqlMode } from '@/lib/conversion'
import { ChevronLeft, ChevronRight, Sparkles, Menu, X, Database, Eye, Plug, User, LogOut } from 'lucide-react'
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
  }, [])

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
    <div className="min-h-screen bg-[#f5f6f7] text-gray-800 flex flex-col">
      {/* Header - Professional Design */}
      <header className="flex items-center justify-between px-4 py-3 bg-[#2c3e50] text-white border-b">
        {/* Left: Hamburger Menu (Mobile Only) & DB Toggle (Desktop) */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button - Mobile Only */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#3a506b] transition-colors"
          >
            <Menu size={20} />
          </button>

          {/* DB Switch - Desktop Only */}
          <div className="hidden md:flex items-center gap-2 bg-[#3a506b] rounded-lg py-1 px-3">
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

        {/* Right: Auth Buttons */}
        <div className="flex items-center gap-2">
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
              <div className="hidden sm:flex items-center gap-2 bg-[#3a506b] rounded-lg py-1 px-3">
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
      <div className="md:hidden flex items-center justify-center py-2 bg-[#3a506b] text-white">
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
            fixed md:relative top-0 left-0 h-full w-64 md:w-auto bg-[#f8f9fa] p-3 overflow-auto border-r border-gray-300 z-50
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            md:translate-x-0 md:flex md:flex-shrink-0
          `}
          style={{ width: `${sidebarWidth}px` }}
        >
          {/* Resize Handle */}
          <div 
            className="absolute top-0 right-0 w-2 h-full cursor-col-resize z-10 bg-transparent hover:bg-blue-200 active:bg-blue-300 transition-colors"
            onMouseDown={() => setIsResizing(true)}
          />

          {/* Close button for mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden absolute top-3 right-3 p-1 rounded hover:bg-gray-200 transition-colors"
          >
            <X size={18} />
          </button>

          {/* Mobile Tabs */}
          <div className="md:hidden flex border-b border-gray-300 mb-3">
            <button
              onClick={() => setActiveTab('tables')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'tables' ? 'text-[#2c3e50] border-b-2 border-[#2c3e50]' : 'text-gray-500'
              }`}
            >
              <Database size={16} className="mx-auto mb-1" />
              Tables
            </button>
            <button
              onClick={() => setActiveTab('views')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'views' ? 'text-[#2c3e50] border-b-2 border-[#2c3e50]' : 'text-gray-500'
              }`}
            >
              <Eye size={16} className="mx-auto mb-1" />
              Views
            </button>
            <button
              onClick={() => setActiveTab('connections')}
              className={`flex-1 py-2 text-center text-sm font-medium ${
                activeTab === 'connections' ? 'text-[#2c3e50] border-b-2 border-[#2c3e50]' : 'text-gray-500'
              }`}
            >
              <Plug size={16} className="mx-auto mb-1" />
              Connections
            </button>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block">
            <h2 className="font-semibold text-[#2c3e50] mb-2 pb-1 border-b border-gray-300 text-sm">Tables</h2>
            <div className="max-h-40 overflow-y-auto">
              {tables.length > 0 ? tables.map(table => (
                <div key={table} className="cursor-pointer py-1 px-2 rounded hover:bg-blue-100 text-sm mb-1 truncate" onClick={() => setQuery(`SELECT * FROM ${table};`)}>{table}</div>
              )) : <p className="text-gray-500 text-sm">No tables found.</p>}
            </div>

            <h2 className="font-semibold text-[#2c3e50] mt-4 mb-2 pb-1 border-b border-gray-300 text-sm">Views</h2>
            <div className="max-h-40 overflow-y-auto">
              {views.length > 0 ? views.map(view => (
                <div key={view} className="cursor-pointer py-1 px-2 rounded hover:bg-green-100 text-sm mb-1 truncate" onClick={() => setQuery(`SELECT * FROM ${view};`)}>{view}</div>
              )) : <p className="text-gray-500 text-sm">No views found.</p>}
            </div>

            <h2 className="font-semibold text-[#2c3e50] mt-4 mb-2 pb-1 border-b border-gray-300 text-sm">Connections</h2>
            <div className="max-h-40 overflow-y-auto">
              {connections.length > 0 ? connections.map(conn => (
                <div key={conn} className="cursor-pointer py-1 px-2 rounded hover:bg-purple-100 text-sm mb-1 truncate">{conn}</div>
              )) : <p className="text-gray-500 text-sm">No connections found.</p>}
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden">
            {activeTab === 'tables' && (
              <>
                <h2 className="font-semibold text-[#2c3e50] mb-2">Tables</h2>
                <div className="max-h-64 overflow-y-auto">
                  {tables.length > 0 ? tables.map(table => (
                    <div key={table} className="cursor-pointer py-2 px-2 rounded hover:bg-blue-100 text-sm border-b" onClick={() => { setQuery(`SELECT * FROM ${table};`); setIsSidebarOpen(false); }}>{table}</div>
                  )) : <p className="text-gray-500 text-sm">No tables found.</p>}
                </div>
              </>
            )}
            
            {activeTab === 'views' && (
              <>
                <h2 className="font-semibold text-[#2c3e50] mb-2">Views</h2>
                <div className="max-h-64 overflow-y-auto">
                  {views.length > 0 ? views.map(view => (
                    <div key={view} className="cursor-pointer py-2 px-2 rounded hover:bg-green-100 text-sm border-b" onClick={() => { setQuery(`SELECT * FROM ${view};`); setIsSidebarOpen(false); }}>{view}</div>
                  )) : <p className="text-gray-500 text-sm">No views found.</p>}
                </div>
              </>
            )}
            
            {activeTab === 'connections' && (
              <>
                <h2 className="font-semibold text-[#2c3e50] mb-2">Connections</h2>
                <div className="max-h-64 overflow-y-auto">
                  {connections.length > 0 ? connections.map(conn => (
                    <div key={conn} className="cursor-pointer py-2 px-2 rounded hover:bg-purple-100 text-sm border-b">{conn}</div>
                  )) : <p className="text-gray-500 text-sm">No connections found.</p>}
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
            <div className="bg-white p-4 flex flex-col h-full" style={{ minHeight: '200px' }}>
              <div className="flex-1 overflow-hidden min-h-[150px]">
                <AceEditor
                  mode="sql"
                  theme="sqlserver"
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
                  onLoad={editor => { editorRef.current = { editor } }}
                />
              </div>
              <div className="mt-3 flex flex-col sm:flex-row justify-between items-center gap-3">
                <div className="flex flex-wrap gap-2">
                  <button onClick={runQuery} disabled={loading} className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {loading ? 'Running...' : 'Run Query'}
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
                    Import CSV
                  </button>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md text-sm font-medium flex items-center gap-1 transition-colors">
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
                <span className="hidden lg:inline text-xs text-gray-500">
                  Press Ctrl+Enter to run query
                </span>
                {notice && <span className="text-xs text-yellow-600 sm:text-right">ℹ️ {notice}</span>}
              </div>
              {error && <pre className="text-red-600 whitespace-pre-wrap bg-red-50 p-2 rounded mt-3 text-xs max-h-40 overflow-auto">{error}</pre>}
              {info && !error && <div className="text-green-700 bg-green-50 rounded p-2 mt-3 text-xs max-h-40 overflow-auto">{info}</div>}
            </div>

            {/* SQL Results - Stable positioning */}
            <div 
              className="bg-white p-4 overflow-auto relative" 
              style={{ 
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
        <div className="fixed top-0 right-0 h-full w-full lg:w-[350px] border-l border-gray-300 bg-white flex flex-col z-50 shadow-lg">
          <div className="px-4 py-3 border-b border-gray-300 flex justify-between items-center bg-[#2c3e50]">
            <div className="flex items-center gap-2">
              <Sparkles className="text-yellow-400" size={16} />
              <h3 className="font-semibold text-white text-sm">Rishab SQL Assistant</h3>
            </div>
            <button onClick={() => setAIAssistantOpen(false)} className="p-1 rounded hover:bg-gray-600 text-white transition-colors">
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
            <div className="md:hidden absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </div>
        </div>
      )}

      {!isAIAssistantOpen && (
        <button onClick={() => setAIAssistantOpen(true)} className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#2c3e50] text-white p-2 pl-3 rounded-l-lg shadow-lg hover:bg-[#1a2634] transition-colors flex items-center gap-1 z-40">
          <Sparkles className="text-yellow-400 mr-1" size={16} />
          <span className="hidden sm:inline text-xs font-medium mr-1">SQL AI Help</span>
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto shadow-xl">
            <h2 className="text-lg font-semibold mb-4">{isAuthModalOpen === 'login' ? 'Login' : 'Sign Up'}</h2>
            <input type="email" placeholder="Email" className="w-full mb-3 p-3 border rounded-md" value={email} onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" className="w-full mb-4 p-3 border rounded-md" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleOwnAuth} className="w-full bg-blue-600 text-white py-3 rounded-md mb-3 font-medium hover:bg-blue-700 transition-colors">
              {isAuthModalOpen === 'login' ? 'Login' : 'Sign Up'}
            </button>
            {authError && <div className="text-red-600 text-sm mb-3 text-center">{authError}</div>}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <button onClick={signInWithGoogle} className="w-full flex justify-center items-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors mb-4">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <button onClick={() => setAuthModalOpen(null)} className="w-full bg-gray-200 text-gray-800 py-3 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
          </div>
        </div>
      )}

      {/* Add CSS for Split component stability */}
      <style jsx>{`
        .gutter.gutter-vertical {
          background-color: #e1e5e9;
          cursor: row-resize;
          position: relative;
          z-index: 10;
          background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyLjUiIGN5PSIyLjUiIHI9IjIuNSIgZmlsbD0iI2I4YzFkMSIvPjxjaXJjbGUgY3g9IjEwIiBjeT0iMi41IiByPSIyLjUiIGZpbGw9IiNiOGMxZDEiLz48Y2lyY2xlIGN4PSIxNy41IiBjeT0iMi41IiByPSIyLjUiIGZpbGw9IiNiOGMxZDEiLz48L3N2Zz4=');
          background-repeat: no-repeat;
          background-position: 50% 50%;
        }
        .gutter.gutter-vertical:hover {
          background-color: #c8d0d9;
        }
        .split-vertical {
          display: flex;
          flex-direction: column;
          height: 100% !important;
        }
        .split-vertical > div {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  )
}