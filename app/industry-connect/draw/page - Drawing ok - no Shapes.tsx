'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface DrawingLine {
  points: Point[];
  color: string;
  width: number;
  type: 'pen' | 'rectangle' | 'circle';
}

export default function SecureDrawingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);
  const [lines, setLines] = useState<DrawingLine[]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [tool, setTool] = useState<'pen' | 'rectangle' | 'circle'>('pen');
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [undoStack, setUndoStack] = useState<DrawingLine[][]>([]);

  // Load from localStorage (safe, stays on your machine)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('secure-drawing');
      if (saved) {
        const data = JSON.parse(saved);
        setLines(data.lines || []);
      }
    } catch (error) {
      console.error('Error loading:', error);
    }
  }, []);

  // Save to localStorage (safe, stays on your machine)
  useEffect(() => {
    if (lines.length > 0) {
      localStorage.setItem('secure-drawing', JSON.stringify({ lines }));
    }
  }, [lines]);

  // Drawing functions
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
    setStartPoint(coord);
    setIsDrawing(true);
    setCurrentLine([coord]);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const coord = getCoordinates(e);
    setCurrentLine((prev) => [...prev, coord]);
  };

  const stopDrawing = () => {
    if (isDrawing && currentLine.length > 1) {
      setLines((prev) => [
        ...prev,
        {
          points: currentLine,
          color,
          width: lineWidth,
          type: tool,
        },
      ]);
      setUndoStack((prev) => [...prev, lines]);
    }
    setIsDrawing(false);
    setCurrentLine([]);
    setStartPoint(null);
  };

  const clearCanvas = () => {
    if (lines.length === 0) return;
    setUndoStack((prev) => [...prev, lines]);
    setLines([]);
    localStorage.removeItem('secure-drawing');
  };

  const undo = () => {
    if (undoStack.length === 0) return;
    const previousState = undoStack[undoStack.length - 1];
    setLines(previousState);
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

  // Draw everything
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all saved lines
    lines.forEach((line) => {
      if (line.points.length < 2) return;
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(line.points[0].x, line.points[0].y);
      for (let i = 1; i < line.points.length; i++) {
        ctx.lineTo(line.points[i].x, line.points[i].y);
      }
      ctx.stroke();
    });

    // Draw current line
    if (currentLine.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(currentLine[0].x, currentLine[0].y);
      for (let i = 1; i < currentLine.length; i++) {
        ctx.lineTo(currentLine[i].x, currentLine[i].y);
      }
      ctx.stroke();
    }
  }, [lines, currentLine, color, lineWidth]);

  // Color options
  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#FF69B4', '#00FFFF'];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toolbar - All local, no external dependencies */}
      <div className="flex flex-wrap items-center gap-3 p-3 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            🎨
          </div>
          <span className="font-semibold text-gray-800">Secure Draw</span>
        </div>

        {/* Tools */}
        <div className="flex gap-1 border-r pr-3">
          {['pen', 'rectangle', 'circle'].map((t) => (
            <button
              key={t}
              onClick={() => setTool(t as any)}
              className={`px-3 py-1 text-sm rounded ${
                tool === t ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`}
            >
              {t === 'pen' && '✏️ Pen'}
              {t === 'rectangle' && '⬜ Rect'}
              {t === 'circle' && '⭕ Circle'}
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
                color === c ? 'border-indigo-600' : 'border-transparent'
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
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
          >
            ↩ Undo
          </button>
          <button
            onClick={clearCanvas}
            disabled={lines.length === 0}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
          >
            ✕ Clear
          </button>
          <button
            onClick={exportImage}
            disabled={lines.length === 0}
            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            ⬇ Export
          </button>
        </div>
      </div>

      {/* Canvas - All drawing stays locally in your browser */}
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
          {lines.length === 0 && currentLine.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <p className="text-gray-400 text-lg">🖌️ Start drawing here</p>
            </div>
          )}
        </div>
      </div>

      {/* Security Status */}
      <div className="px-4 py-1.5 bg-white border-t border-gray-200 text-sm text-gray-600 flex justify-between">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Lines: {lines.length}
        </span>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          All data stored locally - No external servers
        </span>
        <span>{lines.length > 0 ? '💾 Auto-saved to your browser' : '📝 Ready'}</span>
      </div>
    </div>
  );
}