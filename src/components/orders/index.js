import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { getFirebase } from '../../../store';

export default class OrdersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: null };
  }

  componentDidMount() {
    getFirebase().database().ref('orders').on('value', this.updateOrders);
  }

  updateOrders = (snapshot) => {
    let orders = snapshot.val();
    if (!orders) {
      orders = [];
    }
    this.setState({ orders });
  }

  static navigationOptions = {
    title: 'List of orders',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView style={styles.items}>
          {(
            (this.state.orders === null)
              ? <Text>Loading</Text>
              : (this.state.orders.length === 0)
                ? <Text>Orders list is empty</Text>
                : Object.keys(this.state.orders).map((key, index) => (
                  <Button
                    key={key}
                    onPress={() => navigate('Cart', {key: key})}
                    title={'order ' + (index + 1) + ', qty: ' + this.state.orders[key].num + ', total: ' + this.state.orders[key].total}
                    />
                ))
          )}
        </ScrollView>
        <Button
          onPress={() => navigate('Items')}
          title="create order"
          />
      </View >
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginBottom: 20
  }
});