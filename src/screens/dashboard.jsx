import React from 'react';
import {Page} from '@shopify/polaris';

export default () => (
	<Page
		title="Dashboard"
		secondaryActions={[{content: 'View Surveys'}, {content: 'Open settings'}]}
	>
		This is the dashboard
	</Page>
);
