import ReactDOM from 'react-dom';
import React from 'react';
import compose from 'recompose/compose';
import {Route} from 'react-router-dom';

import withAppProvider from './hoc/add-shopify-app-provider.jsx';
import addRouter from './hoc/add-router.jsx';
import addApolloClient from './hoc/add-apollo-client.jsx';
import Dashboard from './screens/dashboard/index.jsx';
import Surveys from './screens/surveys.jsx';
import Survey from './screens/survey.jsx';
import Settings from './screens/settings.jsx';

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
		<Route path="/surveys/:surveyId" component={Survey} />
		<Route exact path="/settings" component={Settings} />
	</div>
));

ReactDOM.render(<App />, domContainer);
