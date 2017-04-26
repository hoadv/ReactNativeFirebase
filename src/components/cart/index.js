import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { getFirebase } from '../../../store';

export default class cartsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { carts: null };
  }

  componentDidMount() {
    getFirebase().database().ref('carts/' + this.props.navigation.state.params.key).on('value', this.updatecarts);
  }

  updatecarts = (snapshot) => {
    let total = 0;
    let carts = snapshot.val();
    if (!carts) {
      carts = [];
    } else {
      Object.keys(carts).map((key) => {
        total += (carts[key].price * carts[key].num);
      })
    }

    this.setState({ carts: carts, total: total });
  }

  static navigationOptions = {
    title: 'items in cart',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <ScrollView style={styles.items}>
          {(
            (this.state.carts === null)
              ? <Text>Loading</Text>
              : (this.state.carts.length === 0)
                ? <Text>carts list is empty</Text>
                : Object.keys(this.state.carts).map((key, index) => (
                  <Text key={key}>
                    {this.state.carts[key].name + ', price: ' + this.state.carts[key].price + ', qty: ' + this.state.carts[key].num}
                  </Text>
                ))
          )}
        </ScrollView>
        <View>
          <Text>Total: {this.state.total}</Text>
        </View>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  items: {
    marginBottom: 20
  }
});