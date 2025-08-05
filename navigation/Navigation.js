// navigation/Navigation.js
import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductList from '../screens/ProductList';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext';

const Stack = createNativeStackNavigator();

const CartIcon = ({ navigation }) => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
      <View style={{ paddingRight: 15 }}>
        <Icon name="cart-outline" size={24} />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={({ navigation }) => ({
            title: 'Products',
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={({ navigation }) => ({
            title: 'Product Detail',
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Your Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
