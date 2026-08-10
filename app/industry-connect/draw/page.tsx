'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface DrawingElement {
  id: string;
  type: 'pen' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'text';
  points: Point[];
  color: string;
  width: number;
  text?: string;
  fontSize?: number;
  startPoint?: Point;
  endPoint?: Point;
}

export default function ShapeDrawingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [elements, setElements] = useState<DrawingElement[]>([]);
  const [currentElement, setCurrentElement] = useState<DrawingElement | null>(null);
  const [tool, setTool] = useState<'pen' | 'rectangle' | 'circle' | 'line' | 'arrow' | 'text' | 'select'>('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [fontSize, setFontSize] = useState(24);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [undoStack, setUndoStack] = useState<DrawingElement[][]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState<Point | null>(null);
  
  // Text input states
  const [showTextInput, setShowTextInput] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [typingPosition, setTypingPosition] = useState<Point | null>(null);
  const [textColor, setTextColor] = useState('#000000');

  // Load/Save
  useEffect(() => {
    try {
      const saved = localStorage.getItem('shape-drawing');
      if (saved) {
        const data = JSON.parse(saved);
        setElements(data.elements || []);
      }
    } catch (error) {
      console.error('Error loading:', error);
    }
  }, []);

  useEffect(() => {
    if (elements.length > 0) {
      localStorage.setItem('shape-drawing', JSON.stringify({ elements }));
    }
  }, [elements]);

  // Get coordinates from mouse/touch event
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  // Handle canvas click for text placement - FIXED
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool === 'text') {
      const coord = getCoordinates(e);
      setTypingPosition(coord);
      setTypingText('');
      setShowTextInput(true);
      // Focus after render
      setTimeout(() => {
        const input = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (input) input.focus();
      }, 50);
    }
  };

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypingText(e.target.value);
  };

  // Handle text input keydown - FIXED
  const handleTextKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && typingText.trim()) {
      // Add text to canvas
      const textElement: DrawingElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        points: [typingPosition || { x: 100, y: 100 }],
        color: textColor,
        width: lineWidth,
        text: typingText.trim(),
        fontSize: fontSize,
      };
      
      setElements((prev) => [...prev, textElement]);
      setUndoStack((prev) => [...prev, elements]);
      
      // Reset text input
      setTypingText('');
      setTypingPosition(null);
      setShowTextInput(false);
      
      // Switch back to select tool
      setTool('select');
    } else if (e.key === 'Escape') {
      setTypingText('');
      setTypingPosition(null);
      setShowTextInput(false);
    }
  };

  // Handle canvas click for shapes
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    
    // If in text mode, let the click handler handle it
    if (tool === 'text') {
      return;
    }
    
    const coord = getCoordinates(e);

    // Handle select tool
    if (tool === 'select') {
      const clickedElement = findElementAt(coord);
      if (clickedElement) {
        setSelectedElement(clickedElement.id);
        setIsDragging(true);
        setDragOffset({
          x: coord.x - (clickedElement.points[0]?.x || 0),
          y: coord.y - (clickedElement.points[0]?.y || 0)
        });
        return;
      } else {
        setSelectedElement(null);
        return;
      }
    }

    setStartPoint(coord);
    setIsDrawing(true);

    const newElement: DrawingElement = {
      id: `element-${Date.now()}`,
      type: tool as any,
      points: [coord],
      color,
      width: lineWidth,
      startPoint: coord,
      endPoint: coord,
    };

    setCurrentElement(newElement);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coord = getCoordinates(e);

    if (tool === 'select' && isDragging && selectedElement && dragOffset) {
      const element = elements.find(el => el.id === selectedElement);
      if (element) {
        const dx = coord.x - dragOffset.x - (element.points[0]?.x || 0);
        const dy = coord.y - dragOffset.y - (element.points[0]?.y || 0);
        
        const updatedElements = elements.map(el => {
          if (el.id === selectedElement) {
            const newPoints = el.points.map(p => ({ x: p.x + dx, y: p.y + dy }));
            return {
              ...el,
              points: newPoints,
              startPoint: el.startPoint ? { x: el.startPoint.x + dx, y: el.startPoint.y + dy } : undefined,
              endPoint: el.endPoint ? { x: el.endPoint.x + dx, y: el.endPoint.y + dy } : undefined,
            };
          }
          return el;
        });
        setElements(updatedElements);
        setDragOffset({
          x: coord.x - (element.points[0]?.x || 0),
          y: coord.y - (element.points[0]?.y || 0)
        });
      }
      return;
    }

    if (!isDrawing || !currentElement || !startPoint) return;

    const updatedElement = { ...currentElement };
    
    if (tool === 'pen') {
      updatedElement.points = [...currentElement.points, coord];
    } else if (tool === 'rectangle') {
      updatedElement.endPoint = coord;
    } else if (tool === 'circle') {
      updatedElement.endPoint = coord;
    } else if (tool === 'line' || tool === 'arrow') {
      updatedElement.endPoint = coord;
    }

    setCurrentElement(updatedElement);
  };

  const stopDrawing = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(null);
      return;
    }

    if (isDrawing && currentElement) {
      if (currentElement.points.length > 1 || 
          (currentElement.startPoint && currentElement.endPoint && 
           (Math.abs(currentElement.endPoint.x - currentElement.startPoint.x) > 5 ||
            Math.abs(currentElement.endPoint.y - currentElement.startPoint.y) > 5))) {
        setElements((prev) => [...prev, currentElement]);
        setUndoStack((prev) => [...prev, elements]);
      }
    }
    setIsDrawing(false);
    setCurrentElement(null);
    setStartPoint(null);
  };

  const findElementAt = (point: Point) => {
    for (let i = elements.length - 1; i >= 0; i--) {
      const el = elements[i];
      if (el.type === 'text' && el.points.length > 0) {
        const textPoint = el.points[0];
        const distance = Math.sqrt(
          Math.pow(point.x - textPoint.x, 2) + 
          Math.pow(point.y - textPoint.y, 2)
        );
        if (distance < 60) return el;
      } else if (el.points.length > 0) {
        const lastPoint = el.points[el.points.length - 1];
        const distance = Math.sqrt(
          Math.pow(point.x - lastPoint.x, 2) + 
          Math.pow(point.y - lastPoint.y, 2)
        );
        if (distance < 20) return el;
      }
    }
    return null;
  };

  const clearCanvas = () => {
    if (elements.length === 0) return;
    setUndoStack((prev) => [...prev, elements]);
    setElements([]);
    localStorage.removeItem('shape-drawing');
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setElements(previousState);
    setUndoStack((prev) => prev.slice(0, -1));
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Render everything on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all saved elements
    elements.forEach((el) => {
      drawElement(ctx, el);
    });

    // Draw current element
    if (currentElement) {
      drawElement(ctx, currentElement);
    }

    // Draw selection highlight
    if (selectedElement) {
      const el = elements.find(e => e.id === selectedElement);
      if (el) {
        ctx.strokeStyle = '#0066ff';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        el.points.forEach(p => {
          minX = Math.min(minX, p.x);
          minY = Math.min(minY, p.y);
          maxX = Math.max(maxX, p.x);
          maxY = Math.max(maxY, p.y);
        });
        
        const padding = 20;
        ctx.strokeRect(
          minX - padding,
          minY - padding,
          maxX - minX + padding * 2,
          maxY - minY + padding * 2
        );
        ctx.setLineDash([]);
      }
    }
  }, [elements, currentElement, selectedElement]);

  const drawElement = (ctx: CanvasRenderingContext2D, el: DrawingElement) => {
    ctx.save();
    ctx.strokeStyle = el.color;
    ctx.lineWidth = el.width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = el.color;

    switch (el.type) {
      case 'pen':
        if (el.points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(el.points[0].x, el.points[0].y);
        for (let i = 1; i < el.points.length; i++) {
          ctx.lineTo(el.points[i].x, el.points[i].y);
        }
        ctx.stroke();
        break;

      case 'rectangle':
        if (!el.startPoint || !el.endPoint) return;
        ctx.beginPath();
        const rectX = Math.min(el.startPoint.x, el.endPoint.x);
        const rectY = Math.min(el.startPoint.y, el.endPoint.y);
        const rectW = Math.abs(el.endPoint.x - el.startPoint.x);
        const rectH = Math.abs(el.endPoint.y - el.startPoint.y);
        ctx.rect(rectX, rectY, rectW, rectH);
        ctx.stroke();
        break;

      case 'circle':
        if (!el.startPoint || !el.endPoint) return;
        ctx.beginPath();
        const radius = Math.sqrt(
          Math.pow(el.endPoint.x - el.startPoint.x, 2) +
          Math.pow(el.endPoint.y - el.startPoint.y, 2)
        );
        ctx.arc(el.startPoint.x, el.startPoint.y, radius, 0, Math.PI * 2);
        ctx.stroke();
        break;

      case 'line':
        if (!el.startPoint || !el.endPoint) return;
        ctx.beginPath();
        ctx.moveTo(el.startPoint.x, el.startPoint.y);
        ctx.lineTo(el.endPoint.x, el.endPoint.y);
        ctx.stroke();
        break;

      case 'arrow':
        if (!el.startPoint || !el.endPoint) return;
        const angle = Math.atan2(
          el.endPoint.y - el.startPoint.y,
          el.endPoint.x - el.startPoint.x
        );
        const arrowSize = 15;
        
        ctx.beginPath();
        ctx.moveTo(el.startPoint.x, el.startPoint.y);
        ctx.lineTo(el.endPoint.x, el.endPoint.y);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(el.endPoint.x, el.endPoint.y);
        ctx.lineTo(
          el.endPoint.x - arrowSize * Math.cos(angle - Math.PI / 6),
          el.endPoint.y - arrowSize * Math.sin(angle - Math.PI / 6)
        );
        ctx.moveTo(el.endPoint.x, el.endPoint.y);
        ctx.lineTo(
          el.endPoint.x - arrowSize * Math.cos(angle + Math.PI / 6),
          el.endPoint.y - arrowSize * Math.sin(angle + Math.PI / 6)
        );
        ctx.stroke();
        break;

      case 'text':
        if (!el.points.length || !el.text) return;
        ctx.font = `${el.fontSize || 24}px Arial, sans-serif`;
        ctx.fillStyle = el.color;
        ctx.textBaseline = 'top';
        
        // Draw text with white background for visibility
        const metrics = ctx.measureText(el.text);
        const textWidth = metrics.width;
        const textHeight = (el.fontSize || 24) * 1.2;
        
        // White background
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillRect(
          el.points[0].x - 5,
          el.points[0].y - 5,
          textWidth + 10,
          textHeight + 10
        );
        
        // Border for visibility
        ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
        ctx.lineWidth = 1;
        ctx.strokeRect(
          el.points[0].x - 5,
          el.points[0].y - 5,
          textWidth + 10,
          textHeight + 10
        );
        
        // Text
        ctx.fillStyle = el.color;
        ctx.fillText(el.text, el.points[0].x, el.points[0].y);
        break;
    }

    ctx.restore();
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'z' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        undo();
      }
      if (e.key === 'Delete' && selectedElement) {
        setElements((prev) => prev.filter(el => el.id !== selectedElement));
        setSelectedElement(null);
        setUndoStack((prev) => [...prev, elements]);
      }
      if (e.key === 'Escape') {
        setShowTextInput(false);
        setTypingText('');
        setTypingPosition(null);
        setSelectedElement(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, selectedElement, elements]);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#FF69B4', '#00FFFF', '#FFD700', '#FF4500'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            🎨
          </div>
          <span className="font-semibold text-gray-800">Draw & Label</span>
        </div>

        {/* Tools */}
        <div className="flex gap-1 border-r pr-3">
          {[
            { id: 'pen', icon: '✏️', label: 'Pen' },
            { id: 'rectangle', icon: '⬜', label: 'Rectangle' },
            { id: 'circle', icon: '⭕', label: 'Circle' },
            { id: 'line', icon: '📏', label: 'Line' },
            { id: 'arrow', icon: '➡️', label: 'Arrow' },
            { id: 'text', icon: '🔤', label: 'Add Text' },
            { id: 'select', icon: '👆', label: 'Select/Move' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTool(t.id as any);
                setShowTextInput(false);
                setTypingText('');
              }}
              className={`px-3 py-1.5 text-sm rounded transition-all ${
                tool === t.id 
                  ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                  : 'hover:bg-gray-100'
              }`}
              title={t.label}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Colors */}
        <div className="flex gap-1 border-r pr-3">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setTextColor(c);
              }}
              className={`w-6 h-6 rounded-full border-2 ${
                color === c ? 'border-indigo-600 scale-110' : 'border-transparent'
              } hover:scale-110 transition-transform`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        {/* Size */}
        <div className="flex items-center gap-2 border-r pr-3">
          <span className="text-sm text-gray-600">Size:</span>
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-20"
          />
          <span className="text-sm text-gray-600 w-8">{lineWidth}px</span>
        </div>

        {/* Font Size for Text */}
        <div className="flex items-center gap-2 border-r pr-3">
          <span className="text-sm text-gray-600">Font:</span>
          <select
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
            <option value="24" selected>24</option>
            <option value="32">32</option>
            <option value="40">40</option>
            <option value="48">48</option>
            <option value="64">64</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="px-3 py-1.5 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            ↩ Undo
          </button>
          <button
            onClick={clearCanvas}
            disabled={elements.length === 0}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            ✕ Clear
          </button>
          <button
            onClick={exportImage}
            disabled={elements.length === 0}
            className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 p-4 relative">
        <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onClick={handleCanvasClick}
          />
          
          {/* Text Input - FIXED with better positioning */}
          {showTextInput && typingPosition && (
            <div 
              className="absolute"
              style={{
                left: Math.min(typingPosition.x, window.innerWidth - 300) + 'px',
                top: Math.min(typingPosition.y, window.innerHeight - 100) + 'px',
                zIndex: 20
              }}
            >
              <input
                type="text"
                value={typingText}
                onChange={handleTextChange}
                onKeyDown={handleTextKeyDown}
                className="px-3 py-2 border-2 border-indigo-500 rounded-lg shadow-xl text-lg focus:outline-none focus:ring-2 focus:ring-indigo-300"
                style={{
                  fontSize: fontSize + 'px',
                  color: textColor,
                  backgroundColor: 'white',
                  minWidth: '150px',
                  fontFamily: 'Arial, sans-serif'
                }}
                placeholder="Type text here..."
                autoFocus
              />
              <div className="text-xs text-gray-500 mt-1 ml-2 bg-white px-2 py-0.5 rounded shadow">
                Press Enter to add • Esc to cancel
              </div>
            </div>
          )}

          {/* Help overlay */}
          {elements.length === 0 && !currentElement && !showTextInput && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <p className="text-4xl mb-2">🎨</p>
                <p className="text-lg">Draw shapes and add text labels!</p>
                <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm">
                  <span>✏️ Pen</span>
                  <span>⬜ Square</span>
                  <span>⭕ Circle</span>
                  <span>📏 Line</span>
                  <span>➡️ Arrow</span>
                  <span>🔤 Click to add text</span>
                  <span>👆 Select/Move</span>
                </div>
                <p className="text-xs mt-3 text-gray-300">
                  ⌨️ Ctrl+Z: Undo • Delete: Remove • Click text to label shapes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 bg-white border-t border-gray-200 text-sm text-gray-600 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            {elements.length} elements
          </span>
          <span>•</span>
          <span>Tool: {tool.charAt(0).toUpperCase() + tool.slice(1)}</span>
          {tool === 'text' && <span className="text-indigo-600">💡 Click on canvas to add text</span>}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-400">
            {elements.length > 0 ? '💾 Auto-saved locally' : '📝 Ready'}
          </span>
          <span className="text-xs text-gray-400">
            Undo: {undoStack.length}
          </span>
        </div>
      </div>
    </div>
  );
}