import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

import Item from './item'
import { getFirebase } from '../../../store';

let purchuseList = {};
export default class ItemsScreen extends Component {
  state = {
    items: null,
    numAddedItems: 0,
    totalPrice: 0
  };
  componentDidMount() {
    getFirebase().database().ref('items').on('value', this.updateItems);
  }

  updateItems = (snapshot) => {
    const items = snapshot.val();
    this.setState({ items });
  }

  updateCart = (item, index) => {
    const numAddedItem = this.state.numAddedItems + 1;
    this.setState({ numAddedItems: numAddedItem });
    const totalPrice = item.price + this.state.totalPrice;
    this.setState({ totalPrice: totalPrice });
    if (purchuseList[index]) {
      purchuseList[index].num++;
    } else {
      purchuseList[index] = { name: item.name, price: item.price, num: 1 };
    }
  }

  save = () => {
    const num = this.state.numAddedItems;
    const total = this.state.totalPrice;
    const timeStamp = Math.floor(Date.now());
    getFirebase().database().ref('orders/' + timeStamp).set({ num: num, total: total });

    try {
      // Save items
      Object.keys(purchuseList).map((key, index) => {
        getFirebase().database().ref('carts/' + timeStamp + '/' + index).set({ name: purchuseList[key].name, price: purchuseList[key].price, num: purchuseList[key].num });
      });
    } catch (e) {
      alert(e.message);
      getFirebase().database().ref('orders/' + timeStamp).remove();
    }

    this.props.navigation.navigate('Index');
  }

  static navigationOptions = {
    title: 'Order',
  };

  render() {
    return (
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'green', height: 10 }}>
          <Text>
            cart (qty: {this.state.numAddedItems}, Total:${this.state.totalPrice})}
            </Text>
        </View>
        <ScrollView>
          <Text>
            List of items
        </Text>
          {(
            (this.state.items === null)
              ? <Text>Loading</Text>
              : (this.state.items.length === 0)
                ? <Text>'Items list is empty'</Text>
                : Object.keys(this.state.items).map((key, index) => (
                  <View key={key} style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.8, paddingBottom: 20 }}>
                      <Text>{this.state.items[key].name + ', ' + '$' + this.state.items[key].price}</Text>
                    </View>
                    <View style={{ flex: 0.2 }} >
                      <Button
                        onPress={() => this.updateCart(this.state.items[key], index)}
                        title='Add'
                        />
                    </View>
                  </View>
                ))
          )}
        </ScrollView>
        <View>
          {(
            (this.state.numAddedItems > 0 && this.state.totalPrice > 0) && <Button
              onPress={() => this.save()}
              title='Save'
              />
          )}

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 5
  }
});