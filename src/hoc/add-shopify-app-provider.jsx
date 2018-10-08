import React from 'react';
import {AppProvider} from '@shopify/polaris';
import nest from 'recompose/nest';
import queryString from 'query-string';

const apiKey = process.env.API_KEY;
const {shop: shopOrigin} = queryString.parse(window.location.search);

export default Component =>
	nest(
		props => (
			<AppProvider apiKey={apiKey} shopOrigin={shopOrigin}>
				{props.children}
			</AppProvider>
		),
		Component,
	);
