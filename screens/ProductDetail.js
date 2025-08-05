import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert
} from 'react-native';
import { CartContext } from '../context/CartContext';

export default function ProductDetail({ route, navigation }) {
  const { product } = route.params;
  const { dispatch } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
    Alert.alert('Success', 'Product added to cart', [
      { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') },
      { text: 'Continue Shopping', style: 'cancel' }
    ]);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>
        ⭐ {product.rating.rate} ({product.rating.count} ratings)
      </Text>
      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.qtyContainer}>
        <Button title="-" onPress={decrement} />
        <Text style={styles.qtyText}>{quantity}</Text>
        <Button title="+" onPress={increment} />
      </View>

      <View style={styles.button}>
        <Button title="Add to Cart" onPress={addToCart} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginBottom: 6,
  },
  rating: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 20,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  button: {
    marginTop: 20,
  },
});
