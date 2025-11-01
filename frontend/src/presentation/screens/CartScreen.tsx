import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Pressable } from 'react-native';
import { useCart } from '../viewmodels/CartContext';
import PrimaryButton from '../components/PrimaryButton';

export default function CartScreen() {
  const { items, total, add, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carrito</Text>
        <Text style={styles.empty}>Tu carrito está vacío</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.thumb} />
      ) : (
        <View style={[styles.thumb, styles.thumbPlaceholder]} />
      )}

      <View style={{ flex: 1 }}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.sub}>
          {`S/ ${Number(item.price).toFixed(2)}  x ${item.qty}`}
        </Text>

        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => (item.qty > 1 ? add(item, -1) : remove(item.id))}
          >
            <Text style={styles.qtyBtnText}>−</Text>
          </Pressable>

          <Text style={styles.qtyText}>{item.qty}</Text>

          <Pressable style={styles.qtyBtn} onPress={() => add(item, 1)}>
            <Text style={styles.qtyBtnText}>＋</Text>
          </Pressable>

          <Pressable style={styles.removeBtn} onPress={() => remove(item.id)}>
            <Text style={styles.removeBtnText}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <Text style={[styles.title, { alignSelf: 'center', marginBottom: 8 }]}>Carrito</Text>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>{`Total: S/ ${total.toFixed(2)}`}</Text>
        <PrimaryButton label="Vaciar carrito" onPress={clear} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF1F2' },
  listContainer: { flex: 1, backgroundColor: '#FFF1F2' },

  title: { fontSize: 22, fontWeight: '700', color: '#A90D1A', marginBottom: 8 },
  empty: { fontSize: 14, color: '#6B7280' },

  row: { flexDirection: 'row', padding: 12, backgroundColor: '#fff', borderRadius: 12 },
  sep: { height: 12, backgroundColor: '#FFF1F2' },

  thumb: { width: 64, height: 64, borderRadius: 10, marginRight: 12, backgroundColor: '#eee' },
  thumbPlaceholder: { alignItems: 'center', justifyContent: 'center' },

  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  sub: { marginTop: 2, color: '#6B7280' },

  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { width: 36, height: 36, borderRadius: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: '#A90D1A' },
  qtyBtnText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  qtyText: { width: 36, textAlign: 'center', fontWeight: '700' },

  removeBtn: { marginLeft: 'auto', paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: '#A90D1A', borderRadius: 8 },
  removeBtnText: { color: '#A90D1A', fontWeight: '600' },

  footer: { padding: 12, borderTopWidth: 1, borderTopColor: '#F5CDD1', backgroundColor: '#FFF1F2' },
  total: { fontSize: 18, fontWeight: '700', color: '#A90D1A', marginBottom: 8 },
});
