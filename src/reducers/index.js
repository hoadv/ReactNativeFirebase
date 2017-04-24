import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/app-navigator';

// Start with two routes: The Main screen, with the Login screen on top.
const initialNavState = {
  index: 1,
  routes: [
    { key: 'InitA', routeName: 'Main' },
    { key: 'InitB', routeName: 'Orders' },
  ],
};

const initialAuthState = { isLoggedIn: false };

function nav(state = initialNavState, action) {
  switch (action.type) {
    case 'Orders':
      return AppNavigator.router.getStateForAction(NavigationActions.back(), state);
    case 'Logout':
      return AppNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Orders' }), state);
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}

const AppReducer = combineReducers({
  nav,
});

export default AppReducer;