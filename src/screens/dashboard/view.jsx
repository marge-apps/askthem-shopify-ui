import React from 'react';
import Markdown from 'react-markdown';
import TimeAgo from 'react-timeago';

import {
	Card,
	DisplayText,
	Layout,
	Page,
	ResourceList,
	TextStyle
} from '@shopify/polaris';

import {Satisfaction} from '../../components/satisfaction.jsx';
import {RangePicker} from './range-picker.jsx';
import {PerformanceChart} from './performance-chart.jsx';

export const View = props => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{content: 'Surveys', url: '/surveys'},
			{content: 'Settings', url: '/settings'}
		]}
	>
		<RangePicker range={props.range} setRange={props.setRange}/>

		<Layout>
			<Layout.Section secondary>
				<Card sectioned title="Positive responses">
					<DisplayText size="medium">{props.data.getStatistics.positiveReviews}</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section secondary>
				<Card sectioned title="Negative responses">
					<DisplayText size="medium">{props.data.getStatistics.negativeReviews}</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card sectioned title="Performance graph">
					<PerformanceChart data={props.data.getStatistics.performance}/>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card
					sectioned
					title="Latest complete surveys"
					actions={[{content: 'View all', url: '/surveys'}]}
				>
					<ResourceList
						resourceName={{singular: 'survey', plural: 'surveys'}}
						items={[]}
						renderItem={({orderId, review}) => (
							<ResourceList.Item
								id={orderId}
								media={<Satisfaction satisfied={review.satisfied}/>}
							>
								<h3>
									<TextStyle variation="strong">
										Order {orderId} - John Doe
									</TextStyle>
								</h3>
								<div>
									<TextStyle variation="subdued">
										<TimeAgo date={review.reviewedOn}/>
									</TextStyle>
								</div>
								<Markdown>{review.comment}</Markdown>
							</ResourceList.Item>
						)}
					/>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);
