import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Product } from '../../domain/entities/Product';
import PrimaryButton from './PrimaryButton';

export default function ProductCard({product, onPress, onAdd}:{product:Product; onPress:()=>void; onAdd:()=>void}) {
  return (
    <Pressable onPress={onPress} style={s.card}>
      <Image source={{uri: product.image || 'https://via.placeholder.com/300x200'}} style={s.image}/>
      <View style={s.row}>
        <Text style={s.name}>{product.name}</Text>
        <Text style={s.price}>S/ {product.price.toFixed(2)}</Text>
      </View>
      <PrimaryButton label="Añadir" onPress={onAdd} />
    </Pressable>
  );
}
const s=StyleSheet.create({
  card:{backgroundColor:'#fff',borderRadius:14,padding:12,gap:10,elevation:1},
  image:{width:'100%',height:160,borderRadius:10,backgroundColor:'#eee'},
  row:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  name:{fontSize:16,fontWeight:'600'},
  price:{fontSize:16,fontWeight:'700',color:'#025EAA'},
});
