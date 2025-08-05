import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ProductCard({ product, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
      <Text style={styles.price}>₹{product.price.toFixed(2)}</Text>
      <Text style={styles.rating}>⭐ {product.rating.rate}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fdfdfd',
    elevation: 2,
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
  },
  price: {
    fontSize: 13,
    color: 'green',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#555',
  },
});

