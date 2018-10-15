import React from 'react';
import {AppProvider} from '@shopify/polaris';
import {Link} from 'react-router-dom';

import nest from 'recompose/nest';
import queryString from 'query-string';

const apiKey = process.env.API_KEY;
const {shop: shopOrigin} = queryString.parse(window.location.search);

const CustomLink = ({children, url, ...rest}) => (
	<Link to={url} {...rest}>
		{children}
	</Link>
);

export default Component =>
	nest(
		props => (
			<AppProvider
				apiKey={apiKey}
				linkComponent={CustomLink}
				shopOrigin={shopOrigin}
			>
				{props.children}
			</AppProvider>
		),
		Component,
	);
