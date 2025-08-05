import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const initialState = { cart: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const exists = state.cart.find(p => p.id === item.id);
      if (exists) {
        return {
          ...state,
          cart: state.cart.map(p =>
            p.id === item.id
              ? { ...p, quantity: p.quantity + (item.quantity || 1) }
              : p
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }]
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        cart: state.cart.map(p =>
          p.id === action.payload.id
            ? { ...p, quantity: action.payload.quantity }
            : p
        )
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'LOAD_CART':
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load cart from storage on mount
  useEffect(() => {
    AsyncStorage.getItem('cart').then(data => {
      if (data) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(data) });
      }
    });
  }, []);

  // Save cart on every update
  useEffect(() => {
    AsyncStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

