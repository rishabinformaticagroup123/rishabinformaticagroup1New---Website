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
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isTextMode, setIsTextMode] = useState(false);
  const [textPosition, setTextPosition] = useState<Point | null>(null);
  const [undoStack, setUndoStack] = useState<DrawingElement[][]>([]);

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

  // Drawing logic
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

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const coord = getCoordinates(e);
    
    if (tool === 'text') {
      setTextPosition(coord);
      setIsTextMode(true);
      return;
    }

    if (tool === 'select') {
      // Simple selection - just store the point
      setStartPoint(coord);
      return;
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
    if (!isDrawing || !currentElement || !startPoint) return;

    const coord = getCoordinates(e);

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
    if (isDrawing && currentElement) {
      // Only add if it's a valid shape
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

  const handleTextInput = () => {
    if (textInput && textPosition) {
      const textElement: DrawingElement = {
        id: `text-${Date.now()}`,
        type: 'text',
        points: [textPosition],
        color,
        width: 16,
        text: textInput,
      };
      setElements((prev) => [...prev, textElement]);
      setUndoStack((prev) => [...prev, elements]);
      setTextInput('');
      setTextPosition(null);
      setIsTextMode(false);
    }
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
        ctx.strokeRect(
          Math.min(el.points[0]?.x || 0, el.points[el.points.length - 1]?.x || 0) - 10,
          Math.min(el.points[0]?.y || 0, el.points[el.points.length - 1]?.y || 0) - 10,
          Math.abs((el.points[el.points.length - 1]?.x || 0) - (el.points[0]?.x || 0)) + 20,
          Math.abs((el.points[el.points.length - 1]?.y || 0) - (el.points[0]?.y || 0)) + 20
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
        
        // Draw arrowhead
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
        ctx.font = `${el.width * 2}px Arial`;
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
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, selectedElement]);

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#FF69B4', '#00FFFF'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mr-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            🎨
          </div>
          <span className="font-semibold text-gray-800">Shape Draw</span>
        </div>

        {/* Tools */}
        <div className="flex gap-1 border-r pr-3">
          {[
            { id: 'pen', icon: '✏️', label: 'Pen' },
            { id: 'rectangle', icon: '⬜', label: 'Rectangle' },
            { id: 'circle', icon: '⭕', label: 'Circle' },
            { id: 'line', icon: '📏', label: 'Line' },
            { id: 'arrow', icon: '➡️', label: 'Arrow' },
            { id: 'text', icon: '🔤', label: 'Text' },
            { id: 'select', icon: '👆', label: 'Select' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTool(t.id as any);
                setIsTextMode(false);
                setTextPosition(null);
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
              onClick={() => setColor(c)}
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
            className="w-24"
          />
          <span className="text-sm text-gray-600 w-8">{lineWidth}px</span>
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
      <div className="flex-1 p-4">
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
          />
          
          {/* Text Input Modal */}
          {isTextMode && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <h3 className="text-lg font-semibold mb-4">Add Text</h3>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTextInput()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your text..."
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleTextInput}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Add Text
                  </button>
                  <button
                    onClick={() => {
                      setIsTextMode(false);
                      setTextPosition(null);
                      setTextInput('');
                    }}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Empty state */}
          {elements.length === 0 && !currentElement && !isTextMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-gray-400">
                <p className="text-4xl mb-2">🎨</p>
                <p className="text-lg">Select a tool and start drawing!</p>
                <p className="text-sm mt-1">Pen • Rectangle • Circle • Line • Arrow • Text</p>
                <p className="text-xs mt-2 text-gray-300">Ctrl+Z to undo • Delete to remove selected</p>
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