import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';

import { CartProvider } from './context/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ProductList">
          <Stack.Screen name="ProductList" component={ProductList} />
          <Stack.Screen name="ProductDetail" component={ProductDetail} />
          <Stack.Screen name="Cart" component={Cart} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
