import React from 'react';

interface AddToCartButtonProps {
  isOutOfStock: boolean;
  isAdding: boolean;
  onClick: () => void;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  isOutOfStock,
  isAdding,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isOutOfStock || isAdding}
      style={{
        padding: '14px 24px',
        backgroundColor: isOutOfStock ? '#cccccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: isOutOfStock || isAdding ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        marginTop: '10px',
        width: '100%',
        transition: 'background-color 0.2s'
      }}
    >
      {isAdding ? 'Adding to Cart...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
    </button>
  );
};