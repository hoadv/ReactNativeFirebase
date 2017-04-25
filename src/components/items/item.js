import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Item extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() =>  this.props.onOrderPress()}
          title={this.props.item.name + ', qty: ' + this.props.item.num + ', total: ' + this.props.item.total}
        />
      </View>
    )
  }
}