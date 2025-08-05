import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
const { cart, dispatch } = useContext(CartContext);
dispatch({ type: 'ADD_TO_CART', payload: product });
dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: 3 } });
dispatch({ type: 'CLEAR_CART' });
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { cart, dispatch } = useContext(CartContext);

  const updateQuantity = (id, type) => {
    const item = cart.find((p) => p.id === id);
    const newQty = type === 'increment' ? item.quantity + 1 : item.quantity - 1;

    if (newQty >= 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id, quantity: newQty }
      });
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text>₹{item.price.toFixed(2)} x {item.quantity}</Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'decrement')}>
            <Text style={styles.qtyBtn}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'increment')}>
            <Text style={styles.qtyBtn}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
          />
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total: ₹{totalPrice.toFixed(2)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff'
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderColor: '#eee'
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 10
  },
  details: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '600'
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6
  },
  qtyBtn: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    color: 'blue'
  },
  qty: {
    fontSize: 16,
    paddingHorizontal: 8
  },
  totalBox: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ddd'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  empty: {
    fontSize: 16,
    marginTop: 40,
    textAlign: 'center',
    color: '#666'
  }
});

