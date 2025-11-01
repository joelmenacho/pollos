import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import PrimaryButton from '../../presentation/components/PrimaryButton';
import { useCart } from '../viewmodels/CartContext';
import { useAuthVM } from '../viewmodels/useAuthVM';
import { http } from '../../data/api/client';
import { useNavigation } from '@react-navigation/native';
import { useStripe, CardField, initStripe } from '@stripe/stripe-react-native';

export default function CheckoutScreen(){
  const { items, total, clear } = useCart();
  const { user } = useAuthVM();
  const nav = useNavigation<any>();
  const { confirmPayment } = useStripe();
  const [clientSecret, setClientSecret] = useState<string| null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    // Inicializa Stripe (pon tu publishable key)
    initStripe({ publishableKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX' });
  },[]);

  const createIntent = async () => {
    try {
      setLoading(true);
      const { data } = await http.post('/payments/create-intent', { amount: total, currency: 'pen' });
      setClientSecret(data.clientSecret);
    } finally { setLoading(false); }
  };

  const pay = async () => {
    if (!clientSecret) return Alert.alert('Falta generar intento de pago');
    const { error, paymentIntent } = await confirmPayment(clientSecret, { paymentMethodType: 'Card' });
    if (error) {
      Alert.alert('Pago fallido', error.message || 'Intenta nuevamente');
    } else {
      Alert.alert('Pago aprobado', `Estado: ${paymentIntent?.status}`);
      clear();
      nav.navigate('Home');
    }
  };

  if (!user) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Debes iniciar sesión</Text>
        <PrimaryButton label="Ir a Iniciar sesión" onPress={()=> nav.navigate('Login')} />
      </View>
    );
  }

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 18, fontWeight: '700' }}>Total: S/ {total.toFixed(2)}</Text>
      <CardField postalCodeEnabled={false} style={{ height: 48 }} />
      {!clientSecret ? (
        <PrimaryButton label={loading ? 'Generando...' : 'Generar intento de pago'} onPress={createIntent} disabled={loading} />
      ) : (
        <PrimaryButton label="Pagar" onPress={pay} />
      )}
    </View>
  );
}
