import React from 'react';
import { View, FlatList, ActivityIndicator, RefreshControl, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import { useProductsVM } from '../viewmodels/useProductsVM';
import type { Product } from '../../domain/entities/Product';
import { useCart } from '../viewmodels/CartContext';

export default function ProductsScreen() {
  const nav = useNavigation<any>();
  const { items, loading, reload } = useProductsVM();
  const { add } = useCart();

  const handleAdd = (p: Product) => add(p, 1);

  if (loading && items.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(i) => String(i.id)}
      refreshControl={<RefreshControl refreshing={loading} onRefresh={reload} />}
      contentContainerStyle={{ padding: 12 }}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={() => nav.navigate('ProductDetail', { id: item.id })}
          onAdd={() => handleAdd(item)}
        />
      )}
      ListEmptyComponent={
        !loading ? (
          <View style={{ alignItems: 'center', padding: 24 }}>
            <Text>No hay productos</Text>
          </View>
        ) : null
      }
    />
  );
}
