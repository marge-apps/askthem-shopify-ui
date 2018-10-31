import React from 'react';
import {Card, Layout, Page, SkeletonBodyText, SkeletonDisplayText} from '@shopify/polaris';
import {RangePicker} from './range-picker.jsx';

export const ViewLoading = ({range, setRange}) => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{content: 'Surveys', url: '/surveys'},
			{content: 'Settings', url: '/settings'}
		]}
	>
		<RangePicker range={range} setRange={setRange}/>

		<Layout>
			<Layout.Section secondary>
				<Card sectioned title="Positive responses">
					<SkeletonDisplayText size="medium"/>
				</Card>
			</Layout.Section>

			<Layout.Section secondary>
				<Card sectioned title="Negative responses">
					<SkeletonDisplayText size="medium"/>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card sectioned title="Performance graph">
					<SkeletonBodyText/>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card
					sectioned
					title="Latest complete surveys"
					actions={[{content: 'View all', url: '/surveys'}]}
				>
					<SkeletonBodyText/>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);
