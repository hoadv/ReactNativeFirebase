import React, { PropTypes } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { getFirebase } from '../../../store';
import OrderItem from './order-item'

const OrdersScreen = ({ navigation }) => {
  let orders = null;
  const firebase = getFirebase();
  var ordersRef = firebase.database().ref('orders');
  ordersRef.on('value', function (snapshot) {
    orders = snapshot.val();
    if (orders === null) {
      orders = [];
    }

    navigation.dispatch({ type: 'UpdateValuesForOrders', orders:  orders});
  });

  const ordersList = (orders === null)
    ? <Text>Loading</Text>
    : (orders.length === 0)
      ? <Text>'Orders list is empty'</Text>
      : Object.keys(orders).map((key) => (
        <OrderItem key={key} id={key} order={orders[key]} />
      ));

  return (
    <View>
      <Text>
        List of orders
    </Text>
     { ordersList }
    </View>
  );
}

OrdersScreen.propTypes = {
  navigation: PropTypes.object,
};

OrdersScreen.navigationOptions = {
  title: 'List of orders',
};

export default OrdersScreen;