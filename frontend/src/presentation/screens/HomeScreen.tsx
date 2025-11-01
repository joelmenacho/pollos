import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen(){
  const nav:any = useNavigation();
  return (
    <View style={s.container}>
      <Text style={s.title}>Pollería App</Text>
      <Text style={s.subtitle}>Delivery rápido y sabroso 🍗</Text>
      <PrimaryButton label="Ver productos" onPress={() => nav.navigate('Products')} />
    </View>
  );
}
const s=StyleSheet.create({
  container:{flex:1,alignItems:'center',justifyContent:'center',gap:12},
  title:{fontSize:28,fontWeight:'700'},
  subtitle:{fontSize:16,color:'#555'},
});
