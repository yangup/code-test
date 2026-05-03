import React from 'react';

interface VariantSelectorProps {
  selectedColor: string;
  selectedSize: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange
}) => {
  const colors = ['Red', 'Blue', 'Black'];
  const sizes = ['S', 'M', 'L'];

  return (
    <div style={{ margin: '20px 0' }}>
      <div style={{ marginBottom: '15px' }}>
        <strong style={{ display: 'block', marginBottom: '8px' }}>Color:</strong>
        {colors.map(color => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            style={{
              margin: '0 8px 0 0',
              padding: '8px 16px',
              border: selectedColor === color ? '2px solid #000' : '1px solid #ccc',
              backgroundColor: selectedColor === color ? '#f0f0f0' : '#fff',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            {color}
          </button>
        ))}
      </div>

      <div>
        <strong style={{ display: 'block', marginBottom: '8px' }}>Size:</strong>
        {sizes.map(size => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            style={{
              margin: '0 8px 0 0',
              padding: '8px 16px',
              border: selectedSize === size ? '2px solid #000' : '1px solid #ccc',
              backgroundColor: selectedSize === size ? '#f0f0f0' : '#fff',
              cursor: 'pointer',
              borderRadius: '4px'
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};