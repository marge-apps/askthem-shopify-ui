import ReactDOM from 'react-dom';
import React from 'react';
import compose from 'recompose/compose';
import withAppProvider from './hoc/add-shopify-app-provider.jsx';
import Dashboard from './screens/dashboard.jsx';

const domContainer = document.querySelector('#app');

const enhance = compose(withAppProvider);

const App = enhance(Dashboard);

ReactDOM.render(<App />, domContainer);
