import ReactDOM from 'react-dom';
import React from 'react';
import compose from 'recompose/compose';
import {Route} from 'react-router-dom';

import withAppProvider from './hoc/add-shopify-app-provider.jsx';
import addRouter from './hoc/add-router.jsx';
import addApolloClient from './hoc/add-apollo-client.jsx';
import Dashboard from './screens/dashboard.jsx';
import Surveys from './screens/surveys';
import Settings from './screens/settings';

const domContainer = document.querySelector('#app');

const enhance = compose(
	addApolloClient,
	addRouter,
	withAppProvider,
);

const App = enhance(() => (
	<div>
		<Route exact path="/" component={Dashboard} />
		<Route exact path="/surveys" component={Surveys} />
		<Route exact path="/settings" component={Settings} />
	</div>
));

ReactDOM.render(<App />, domContainer);
