/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const response = await AsyncStorage.getItem('@GoMarketPlace:Products');

      if (response) {
        setProducts([...JSON.parse(response)]);
      }
    }
    loadProducts();
  }, []);

  const addToCart = useCallback(
    async (product: Product) => {
      const item = products.find(Product => Product.id === product.id);

      if (item) {
        setProducts(
          products.map(_product =>
            _product.id === product.id
              ? { ...product, quantity: _product.quantity + 1 }
              : _product,
          ),
        );
      } else {
        product.quantity = 1;
        setProducts([...products, product]);
      }

      await AsyncStorage.setItem(
        '@GoMarketplace:Products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const increment = useCallback(
    async (id: string) => {
      setProducts(
        products.map(_product =>
          _product.id === id
            ? { ..._product, quantity: _product.quantity + 1 }
            : _product,
        ),
      );

      await AsyncStorage.setItem(
        '@GoMarketplace:Products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async (id: string) => {
      const item = products.find(product => product.id === id);
      if (item) {
        if (item.quantity === 1) {
          setProducts(state => state.filter(product => product.id !== id));
        } else {
          setProducts(
            products.map(_product =>
              _product.id === id
                ? { ..._product, quantity: _product.quantity - 1 }
                : _product,
            ),
          );
        }
      }

      await AsyncStorage.setItem(
        '@GoMarketplace:Products',
        JSON.stringify(products),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
