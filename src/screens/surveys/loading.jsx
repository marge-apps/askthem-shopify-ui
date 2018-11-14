import React from 'react';
import {Page, Layout, Card, Spinner} from '@shopify/polaris';
import styled from 'react-emotion';

const SpinnerContainer = styled('div')`
	padding: 100px 0;
	text-align: center;
`;

export const LoadingView = props => (
	<Page
		fullWidth
		title="Surveys"
		breadcrumbs={[{content: 'Dashboard', url: '/'}]}
		secondaryActions={[
			{
				icon: 'refresh',
				content: 'Refresh',
				onAction: () => props.data.refetch(),
			},
		]}
		pagination={{
			hasPrevious: false,
			hasNext: false,
		}}
	>
		<Layout>
			<Layout.Section>
				<Card sectioned>
					<SpinnerContainer>
						<Spinner />
					</SpinnerContainer>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);
