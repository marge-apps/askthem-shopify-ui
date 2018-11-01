import React from 'react';
import {EmptyState, Page} from '@shopify/polaris';
import messagingImg from '../../images/messaging.svg';

export const ViewError = () => (
	<Page title="Dashboard">
		<EmptyState
			heading="Uh, oh... Something went wrong!"
			action={{content: 'Reload'}}
			secondaryAction={{content: 'Contact us', url: 'https://help.shopify.com'}}
			image={messagingImg}
		>
			<p>
				Something did not work as expected. Please click reload button below to
				refresh the page.
			</p>
			<p>
				If the problem persists, please click contact button and we will be
				happy to help you.
			</p>
		</EmptyState>
	</Page>
);
