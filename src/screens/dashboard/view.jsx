import React from 'react';
import {pathOr} from 'ramda';
import {Card, DisplayText, Layout, Page} from '@shopify/polaris';

import {RangePicker} from './range-picker.jsx';
import {PerformanceChart} from './performance-chart.jsx';
import {SurveysList} from './surveys-list.jsx';

export const View = props => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{content: 'Surveys', url: '/surveys'},
			{content: 'Settings', url: '/settings'},
		]}
	>
		<RangePicker range={props.range} setRange={props.setRange} />

		<Layout>
			<Layout.Section secondary>
				<Card sectioned title="Positive responses">
					<DisplayText size="medium">
						{props.data.getStatistics.positiveReviews}
					</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section secondary>
				<Card sectioned title="Negative responses">
					<DisplayText size="medium">
						{props.data.getStatistics.negativeReviews}
					</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card sectioned title="Performance graph">
					<PerformanceChart
						data={pathOr([], ['data', 'getStatistics', 'perfomance'], props)}
					/>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card
					sectioned
					title="Latest complete surveys"
					actions={[{content: 'View all', url: '/surveys'}]}
				>
					<SurveysList
						surveys={pathOr([], ['data', 'getSurveys', 'surveys'], props)}
					/>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);
