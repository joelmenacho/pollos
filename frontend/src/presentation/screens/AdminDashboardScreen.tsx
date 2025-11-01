import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { http } from '../../data/api/client';
import { useAuthVM } from '../viewmodels/useAuthVM';

type P = { id:number; name:string; price:number; image?:string; description?:string };

export default function AdminDashboardScreen(){
  const { user } = useAuthVM();
  const [products, setProducts] = useState<P[]>([]);
  const [name,setName] = useState('Pollo a la brasa');
  const [price,setPrice] = useState('49.90');
  const [image,setImage] = useState('');
  const [description,setDescription] = useState('1/2 pollo + papas + ensalada');

  const load = async () => {
    const { data } = await http.get('/products');
    setProducts(data);
  };

  const create = async () => {
    try {
      await http.post('/products', { name, price: parseFloat(price), image, description });
      Alert.alert('Ok','Producto creado'); setName(''); setPrice(''); setImage(''); setDescription('');
      load();
    } catch (e:any){ Alert.alert('Error', e.message || 'No se pudo crear'); }
  };

  useEffect(()=>{ load(); },[]);

  if (!user || user.role !== 'ADMIN'){
    return <View style={{padding:16}}><Text>Acceso restringido</Text></View>;
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: '700' }}>Admin: Productos</Text>
      <Text>Nombre</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12 }} />
      <Text>Precio</Text>
      <TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" style={{ borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12 }} />
      <Text>Imagen (URL)</Text>
      <TextInput value={image} onChangeText={setImage} style={{ borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12 }} />
      <Text>Descripción</Text>
      <TextInput value={description} onChangeText={setDescription} style={{ borderWidth:1, borderColor:'#ddd', borderRadius:10, padding:12 }} />
      <PrimaryButton label="Crear" onPress={create} />
      <FlatList
        data={products}
        keyExtractor={(it)=> String(it.id)}
        renderItem={({item})=> <Text>- {item.name} S/ {item.price}</Text>}
        style={{ marginTop: 16 }}
      />
    </View>
  );
}
