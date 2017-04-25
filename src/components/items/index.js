import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Item from './item'
import { getFirebase } from '../../../store';

export default class ItemsScreen extends Component {
  state = { items: null };
  componentDidMount() {
    let orderVal = {};
    getFirebase().database().ref('items').on('value', this.updateItems);
  }

  updateItems = (snapshot) => {
    const items = snapshot.val();
    this.setState({ items });
  }

  static navigationOptions = {
    title: 'List of items',
  };

  render() {
    return (
      <View>
        <Text>
          List of items
    </Text>
        {(
          (this.state.items === null)
            ? <Text>Loading</Text>
            : (this.state.items.length === 0)
              ? <Text>'Items list is empty'</Text>
              : Object.keys(this.state.items).map((key) => (
                <Item key={key} id={key} item={this.state.items[key]} />
              ))
        )}
      </View>
    );
  }
}