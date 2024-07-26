import React, { useState, useRef, useEffect } from 'react';

function ResizableBox() {
  const [boxSize, setBoxSize] = useState({ width: 200, height: 200 });
  const [isResizing, setIsResizing] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const newWidth =
          e.clientX - boxRef.current.getBoundingClientRect().left;
        const newHeight =
          e.clientY - boxRef.current.getBoundingClientRect().top;
        setBoxSize({
          width: newWidth > 50 ? newWidth : 50, // Minimum width
          height: newHeight > 50 ? newHeight : 50, // Minimum height
        });
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = (e) => {
    setIsResizing(true);
  };

  return (
    <div>
      <h2>Resizable Box</h2>
      <div
        ref={boxRef}
        style={{
          width: `${boxSize.width}px`,
          height: `${boxSize.height}px`,
          backgroundColor: 'lightblue',
          border: '1px solid blue',
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        Box
        <div
          onMouseDown={handleMouseDown}
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: 'blue',
            position: 'absolute',
            bottom: '0',
            right: '0',
            cursor: 'se-resize',
          }}
        ></div>
      </div>
    </div>
  );
}

export default ResizableBox;
