import React from 'react';
import { StyleSheet, View } from 'react-native';

import OrdersScreen from './orders/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const MainScreen = () => (
  <View style={styles.container}>
    <OrdersScreen />
  </View>
);

MainScreen.navigationOptions = {
  title: 'List of orders',
};

export default MainScreen;