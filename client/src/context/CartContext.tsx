import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export interface CartItem {
  id: string; // Product ID
  name: string;
  slug: string;
  price: number;
  image: string;
  color?: string;
  storage?: string;
  qty: number;
  stock?: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'qty'>, qty?: number) => void;
  removeFromCart: (id: string, color?: string) => void;
  updateQty: (id: string, qty: number, color?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('phone_web_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('phone_web_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'qty'>, qty: number = 1) => {
    const availableStock = product.stock ?? 99;
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.id === product.id && i.color === product.color
      );

      if (existingIndex > -1) {
        const newItems = [...prev];
        const newQty = newItems[existingIndex].qty + qty;
        if (newQty > availableStock) {
          toast.error(`Số lượng trong kho chỉ còn ${availableStock} sản phẩm`);
          return prev;
        }
        newItems[existingIndex].qty = newQty;
        toast.success(`Đã cập nhật số lượng "${product.name}" trong giỏ hàng!`);
        return newItems;
      } else {
        if (qty > availableStock) {
          toast.error(`Số lượng trong kho chỉ còn ${availableStock} sản phẩm`);
          return prev;
        }
        toast.success(`Đã thêm "${product.name}" vào giỏ hàng!`);
        return [...prev, { ...product, qty, stock: availableStock }];
      }
    });
  };

  const removeFromCart = (id: string, color?: string) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.color === color)));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const updateQty = (id: string, qty: number, color?: string) => {
    if (qty <= 0) {
      removeFromCart(id, color);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.color === color) {
          const maxStock = item.stock ?? 99;
          if (qty > maxStock) {
            toast.error(`Kho chỉ còn ${maxStock} sản phẩm`);
            return item;
          }
          return { ...item, qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
