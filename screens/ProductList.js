import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Text
} from 'react-native';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import SearchFilter from './SearchFilter';

export default function ProductList({ navigation }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then((res) => {
        setProducts(res.data);
        setFiltered(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (searchQuery === '') {
      setFiltered(products);
    } else {
      const result = products.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFiltered(result);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      {filtered.length === 0 ? (
        <Text style={styles.noResult}>No products found</Text>
      ) : (
        <FlatList
          data={filtered}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetail', { product: item })
              }
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  noResult: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
  },
});

