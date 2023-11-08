import { FC, useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { CanvasProps } from '../../interfaces/Canvas';

const Canvas: FC<CanvasProps> = ({ width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [color, setColor] = useState<string>('#000000');
  const [lineWidth, setLineWidth] = useState<number>(6);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      let isDrawing: boolean = false;

      if (context) {
        canvas.addEventListener('mousedown', () => {
          isDrawing = true;
          context.beginPath();
          context.lineWidth = lineWidth;
          context.strokeStyle = color;
        });

        canvas.addEventListener('mousemove', (e) => {
          if (!isDrawing) return;
          context.lineCap = 'round';
          context.lineTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop,
          );
          context.stroke();
          context.beginPath();
          context.moveTo(
            e.clientX - canvas.offsetLeft,
            e.clientY - canvas.offsetTop,
          );
        });

        canvas.addEventListener('mouseup', () => {
          isDrawing = false;
        });

        canvas.addEventListener('mouseout', () => {
          isDrawing = false;
        });
      }
    }
  }, [lineWidth, color]);

  const clearCanvas = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <>
      <canvas
        width={width}
        height={height}
        ref={canvasRef}
        style={{ border: '1px solid #000' }}
      />
      <>
        <Form.Control
          type='color'
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
        <Form.Range
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
        />
        <Button variant='outline-primary' onClick={clearCanvas}>
          Очистить холст
        </Button>
      </>
    </>
  );
};

export default Canvas;
