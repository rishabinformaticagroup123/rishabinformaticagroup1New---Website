'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Excalidraw, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';

// Types for Excalidraw
type ExcalidrawElement = any;
type ExcalidrawAppState = any;
type ExcalidrawFiles = any;

// Dynamic import with no SSR to avoid hydration issues
const ExcalidrawComponent = dynamic(
  async () => {
    const { Excalidraw } = await import('@excalidraw/excalidraw');
    return { default: Excalidraw };
  },
  { ssr: false }
);

export default function DrawingPage() {
  const [isClient, setIsClient] = useState(false);
  const [elements, setElements] = useState<ExcalidrawElement[]>([]);
  const [appState, setAppState] = useState<ExcalidrawAppState | null>(null);
  const [files, setFiles] = useState<ExcalidrawFiles | null>(null);
  const [drawingName, setDrawingName] = useState('Untitled Drawing');
  const excalidrawRef = useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Load saved drawing from localStorage if exists
    const savedDrawing = localStorage.getItem('excalidraw-drawing');
    if (savedDrawing) {
      try {
        const { elements: savedElements, appState: savedAppState } = JSON.parse(savedDrawing);
        setElements(savedElements || []);
        setAppState(savedAppState || null);
      } catch (error) {
        console.error('Error loading saved drawing:', error);
      }
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (isClient && elements.length > 0) {
      const saveTimeout = setTimeout(() => {
        localStorage.setItem(
          'excalidraw-drawing',
          JSON.stringify({
            elements,
            appState,
          })
        );
      }, 1000);

      return () => clearTimeout(saveTimeout);
    }
  }, [elements, appState, isClient]);

  const handleChange = (
    newElements: ExcalidrawElement[],
    newAppState: ExcalidrawAppState,
    newFiles: ExcalidrawFiles
  ) => {
    setElements(newElements);
    setAppState(newAppState);
    setFiles(newFiles);
  };

  const handleExport = async (format: 'png' | 'svg' | 'json') => {
    if (!excalidrawRef.current) return;

    try {
      const { exportToCanvas, exportToSvg, exportToBlob } = await import(
        '@excalidraw/excalidraw'
      );

      const canvas = await exportToCanvas({
        elements,
        appState: {
          ...appState,
          exportPadding: 10,
        },
        files,
      });

      if (format === 'png') {
        const link = document.createElement('a');
        link.download = `${drawingName}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } else if (format === 'svg') {
        const svg = await exportToSvg({
          elements,
          appState: {
            ...appState,
            exportPadding: 10,
          },
          files,
        });
        const svgString = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${drawingName}.svg`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } else if (format === 'json') {
        const data = JSON.stringify({ elements, appState, files }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${drawingName}.excalidraw`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error exporting drawing:', error);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the drawing?')) {
      setElements([]);
      setAppState(null);
      setFiles(null);
      localStorage.removeItem('excalidraw-drawing');
    }
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);
        if (data.elements) {
          setElements(data.elements);
          setAppState(data.appState || null);
          setFiles(data.files || null);
        }
      } catch (error) {
        console.error('Error importing drawing:', error);
        alert('Error importing file. Please make sure it\'s a valid Excalidraw file.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading drawing editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <svg
            className="w-6 h-6 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
          <h1 className="text-xl font-semibold text-gray-800">Drawing Editor</h1>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            value={drawingName}
            onChange={(e) => setDrawingName(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Drawing name..."
          />

          <div className="flex gap-2">
            <button
              onClick={() => handleExport('png')}
              className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Export PNG
            </button>
            <button
              onClick={() => handleExport('svg')}
              className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Export SVG
            </button>
            <button
              onClick={() => handleExport('json')}
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Project
            </button>
          </div>

          <div className="flex gap-2">
            <label className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors cursor-pointer">
              Import
              <input
                type="file"
                accept=".excalidraw,.json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Drawing Canvas */}
      <div className="flex-1 relative">
        <ExcalidrawComponent
          ref={excalidrawRef}
          initialData={{
            elements,
            appState: {
              ...appState,
              viewBackgroundColor: '#f9fafb',
            },
            files,
          }}
          onChange={handleChange}
          theme="light"
          UIOptions={{
            canvasActions: {
              changeViewBackgroundColor: true,
              clearCanvas: true,
              export: true,
              loadScene: true,
              saveToActiveFile: true,
              toggleTheme: true,
              zoomIn: true,
              zoomOut: true,
              resetZoom: true,
            },
          }}
        >
          <MainMenu>
            <MainMenu.DefaultItems.LoadScene />
            <MainMenu.DefaultItems.SaveToActiveFile />
            <MainMenu.DefaultItems.Export />
            <MainMenu.DefaultItems.ClearCanvas />
            <MainMenu.DefaultItems.Help />
          </MainMenu>
          <WelcomeScreen>
            <WelcomeScreen.Hints.ToolbarHint />
            <WelcomeScreen.Hints.HelpHint />
          </WelcomeScreen>
        </ExcalidrawComponent>
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-white border-t border-gray-200 text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Elements: {elements.length}</span>
          <span>•</span>
          <span>Auto-save enabled</span>
        </div>
        <div>
          <span className="text-gray-400">
            {elements.length > 0 ? 'Drawing saved locally' : 'Start drawing!'}
          </span>
        </div>
      </div>
    </div>
  );
}