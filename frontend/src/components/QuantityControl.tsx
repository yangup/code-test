import React from 'react';

interface QuantityControlProps {
  value: number;
  maxStock: number;
  onChange: (val: number) => void;
  disabled: boolean;
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  value,
  maxStock,
  onChange,
  disabled
}) => {
  const handleDecrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < maxStock) onChange(value + 1);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '20px 0' }}>
      <strong>Quantity:</strong>
      <button
        onClick={handleDecrease}
        disabled={disabled || value <= 1}
        style={{ padding: '5px 12px', cursor: disabled || value <= 1 ? 'not-allowed' : 'pointer' }}
      >
        -
      </button>
      <span style={{ minWidth: '20px', textAlign: 'center' }}>{value}</span>
      <button
        onClick={handleIncrease}
        disabled={disabled || value >= maxStock}
        style={{ padding: '5px 12px', cursor: disabled || value >= maxStock ? 'not-allowed' : 'pointer' }}
      >
        +
      </button>
      <span style={{ fontSize: '12px', color: '#666' }}>(Max available: {maxStock})</span>
    </div>
  );
};