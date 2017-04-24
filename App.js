import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import AppReducer from './src/reducers';
import AppWithNavigationState from './src/navigators/app-navigator';
import { configureFirebase } from './store.js';

class ReactNativeFirebase extends React.Component {
  store = createStore(AppReducer);
  firebase = configureFirebase();
  
  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('ReactNativeFirebase', () => ReactNativeFirebase);