import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useProductsVM } from '../viewmodels/useProductsVM';
import PrimaryButton from '../components/PrimaryButton';
import { useCart } from '../viewmodels/CartContext';

export default function ProductDetailScreen(){
  const route = useRoute();
  const { getById } = useProductsVM();
  const { add } = useCart();

  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = route?.params?.id;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const prod = await getById(id);
        if (mounted) setP(prod);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id, getById]);

  if (loading) return <View style={s.center}><ActivityIndicator/></View>;
  if (!p) return <View style={s.center}><Text>No encontrado</Text></View>;

  const onAdd = () => {
    add(p, 1);
    // opcional: feedback
    // Alert.alert('Añadido', 'Producto agregado al carrito');
  };

  return (
    <View style={{padding:16, gap:12}}>
      {!!p.image && <Image source={{uri:p.image}} style={s.image}/>}
      <Text style={s.title}>{p.name}</Text>
      <Text style={s.price}>S/ {Number(p.price).toFixed(2)}</Text>
      {!!p.description && <Text style={s.desc}>{p.description}</Text>}
      <PrimaryButton label="Añadir al carrito" onPress={onAdd} />
    </View>
  );
}

const s = StyleSheet.create({
  center:{flex:1,alignItems:'center',justifyContent:'center'},
  image:{width:'100%',height:220,borderRadius:12,backgroundColor:'#eee'},
  title:{fontSize:22,fontWeight:'700'},
  price:{fontSize:18,fontWeight:'700',color:'#025EAA'},
  desc:{fontSize:14,color:'#444'},
});
