import React, { useState, useEffect } from 'react';
import { Product, SKU } from './types/product';
import { VariantSelector } from './components/VariantSelector';
import { QuantityControl } from './components/QuantityControl';
import { AddToCartButton } from './components/AddToCartButton';

const App = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  const [cartCount, setCartCount] = useState<number>(0);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // 模拟获取产品详情的 API
  useEffect(() => {
    fetch('/mock-product.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        setProduct(data);
        if (data.skus && data.skus.length > 0) {
          setSelectedColor(data.skus[0].variant.color);
          setSelectedSize(data.skus[0].variant.size);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      });
  }, []);

  // 根据当前选中的变体，动态计算 SKU
  const currentSku: SKU | undefined = product?.skus.find(
    sku => sku.variant.color === selectedColor && sku.variant.size === selectedSize
  );

  const isOutOfStock = !currentSku || currentSku.stock === 0;

  // 模拟加入购物车的 API 请求
  const handleAddToCart = async () => {
    if (isOutOfStock || !currentSku) return;

    setIsAdding(true);
    try {
      // 模拟 800ms 的网络延迟
      await new Promise(resolve => setTimeout(resolve, 800));

      setCartCount(prev => prev + quantity);
      alert(`Successfully added ${quantity} item(s) to cart!`);

      // Bonus: 简单的埋点事件设计
      console.log('📊 Analytics Event:', {
        event: 'add_to_cart',
        product_id: product?.id,
        sku_id: currentSku.id,
        quantity: quantity,
        price: currentSku.price
      });

    } catch (err) {
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAdding(false);
    }
  };

  // 处理 Loading 状态
  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading product details...</div>;
  }

  // 处理 Error 状态
  if (error) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  if (!product) return null;

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* 左侧：产品图片 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
          />
        </div>

        {/* 右侧：产品信息与交互 */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h1 style={{ marginTop: 0 }}>{product.name}</h1>

          <p style={{ fontSize: '28px', color: '#e60023', fontWeight: 'bold', margin: '10px 0' }}>
            ${currentSku ? currentSku.price.toFixed(2) : '0.00'}
          </p>

          <p style={{
            color: isOutOfStock ? 'red' : 'green',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            {isOutOfStock ? '❌ Out of Stock' : `✅ In Stock: ${currentSku?.stock} available`}
          </p>

          <VariantSelector
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
          />

          <QuantityControl
            value={quantity}
            maxStock={currentSku?.stock || 0}
            onChange={setQuantity}
            disabled={isOutOfStock}
          />

          <AddToCartButton
            isOutOfStock={isOutOfStock}
            isAdding={isAdding}
            onClick={handleAddToCart}
          />

          <div style={{ marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <h3>Product Description</h3>
            <p style={{ lineHeight: '1.6', color: '#555' }}>{product.description}</p>
          </div>
        </div>
      </div>

      {/* 页面右上角的购物车计数展示 */}
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#333',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '20px'
      }}>
        🛒 Cart Items: {cartCount}
      </div>
    </div>
  );
};

export default App;