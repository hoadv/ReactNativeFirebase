import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import OrdersScreen from '../components/orders';
import MainScreen from '../components/main-screen';
import { getFirebase } from '../../store';

const firebase = getFirebase();
let orders = null;

firebase.database().ref('orders').on('value', function (snapshot) {
  orders = snapshot.val();
});

export const AppNavigator = StackNavigator({
  Orders: { screen: OrdersScreen },
  Main: { screen: MainScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);