import React, { useState } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAuthVM } from '../viewmodels/useAuthVM';

export default function LoginScreen(){
  const { login, loading } = useAuthVM();
  const [email,setEmail] = useState('admin@mail.com');
  const [password,setPassword] = useState('123456');

  const onLogin = async () => {
    try { await login(email,password); Alert.alert('Listo','Sesión iniciada'); }
    catch(e:any){ Alert.alert('Error', e.message); }
  };

  return (
    <View style={{padding:16,gap:10}}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none"
        style={{borderWidth:1,borderColor:'#ddd',borderRadius:10,padding:12}}/>
      <Text>Contraseña</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry
        style={{borderWidth:1,borderColor:'#ddd',borderRadius:10,padding:12}}/>
      <PrimaryButton label={loading?'Ingresando...':'Ingresar'} onPress={onLogin} disabled={loading}/>
    </View>
  );
}
