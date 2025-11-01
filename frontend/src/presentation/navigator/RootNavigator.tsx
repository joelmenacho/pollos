// src/presentation/navigator/RootNavigator.tsx
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import LoginScreen from '../screens/LoginScreen';
import {colors} from '../../theme';

import CheckoutScreen from '../screens/CheckoutScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

export type RootStackParamList = {
  Home: undefined;
  Products: undefined;
  ProductDetail: {id: number};
  Cart: undefined;
  Login: undefined;
  Checkout: undefined; // <-- nuevo
  AdminDashboard: undefined; // <-- nuevo
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: colors.primary},
        headerTintColor: colors.white,
        contentStyle: {backgroundColor: colors.background},
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Inicio'}}
      />
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{title: 'Productos'}}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{title: 'Detalle'}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Carrito'}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{title: 'Ingresar'}}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{title: 'Pagar'}}
      />
      <Stack.Screen
        name="AdminDashboard"
        component={AdminDashboardScreen}
        options={{title: 'Admin'}}
      />
    </Stack.Navigator>
  );
}
