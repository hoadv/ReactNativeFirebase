import React, { PropTypes, Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class OrderItem extends Component {
  static propTypes = {
    order: PropTypes.object,
    id: PropTypes.string
  }

  render(){
    const {order, id} = this.props

    return (
      <tr>
        <td className="project-wrapper">
          <a href={'/edit?projectId=' + id + '&projectName=' + order.name}>
            <Text> { order.name + ', qty: ' +   order.num + ', total: ' + order.total } </Text>
          </a>
        </td>
      </tr>
    )
  }
}
export default OrderItem;