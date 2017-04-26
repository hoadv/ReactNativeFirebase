import React from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import OrdersScreen from './src/components/orders/';
import ItemsScreen from './src/components/items/';
import CartScreen from './src/components/cart/';

import './store.js';


const ReactNativeFirebase = StackNavigator({
  Index: { screen: OrdersScreen },
  Items: { screen: ItemsScreen},
  Cart: { screen: CartScreen}
});

AppRegistry.registerComponent('ReactNativeFirebase', () => ReactNativeFirebase);