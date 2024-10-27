// src/components/DesignerTemplate.tsx
import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

interface TextBoxData {
  label: string;
  value: string;
  x: number;
  y: number;
}

const DesignerTemplate: React.FC = () => {
  const [textBoxes, setTextBoxes] = useState<TextBoxData[]>([
    {
      label: 'Absolute Leukocyte Count',
      value: '1.09 x 10^9 mmol/dL',
      x: 50,
      y: 50,
    },
    {
      label: 'Another Metric',
      value: 'Value',
      x: 50,
      y: 150,
    },
  ]);

  const [selectedBoxIndex, setSelectedBoxIndex] = useState<number | null>(null);

  const handleTextClick = (index: number) => {
    setSelectedBoxIndex(index);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedBoxIndex === null) return;

    const newTextBoxes = [...textBoxes];
    newTextBoxes[selectedBoxIndex].value = event.target.value;
    setTextBoxes(newTextBoxes);
  };

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {textBoxes.map((box, index) => (
            <React.Fragment key={index}>
              {/* Label */}
              <Text
                text={`${box.label}:`}
                x={box.x}
                y={box.y}
                fontSize={16}
                fontFamily="Arial"
                fill="black"
              />
              {/* Value */}
              <Text
                text={box.value}
                x={box.x + 200}
                y={box.y}
                fontSize={16}
                fontFamily="Arial"
                fill="blue"
                onClick={() => handleTextClick(index)}
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      {/* Input Field for Editing */}
      {selectedBoxIndex !== null && (
        <div style={{ marginTop: '20px' }}>
          <label>Edit Value:</label>
          <input
            type="text"
            value={textBoxes[selectedBoxIndex].value}
            onChange={handleValueChange}
          />
        </div>
      )}
    </div>
  );
};

export default DesignerTemplate;
export {};