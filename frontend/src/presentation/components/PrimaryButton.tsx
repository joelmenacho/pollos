import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
export default function PrimaryButton({label, onPress, disabled}:{label:string; onPress:()=>void; disabled?:boolean}) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[s.btn, disabled && {opacity:.6}]}>
      <Text style={s.text}>{label}</Text>
    </Pressable>
  );
}
const s=StyleSheet.create({
  btn:{backgroundColor:'#A90D1A',padding:14,borderRadius:12,alignItems:'center'},
  text:{color:'#fff',fontWeight:'700'}
});
