import React from 'react';
import {ResourceList, TextStyle} from '@shopify/polaris';
import TimeAgo from 'react-timeago';
import Markdown from 'react-markdown';
import {Satisfaction} from '../../components/satisfaction.jsx';

export const SurveysList = ({surveys}) => (
	<div>
		<ResourceList
			resourceName={{singular: 'survey', plural: 'surveys'}}
			items={surveys}
			renderItem={({order, review}) => (
				<ResourceList.Item
					id={order.id}
					media={<Satisfaction satisfied={review.satisfied} />}
					url={`/surveys/${order.id}`}
				>
					<h3>
						<TextStyle variation="strong">
							Order #{order.id} {order.customer.fullName}
						</TextStyle>
					</h3>
					<div>
						<TextStyle variation="subdued">
							<TimeAgo date={review.reviewedOn} />
						</TextStyle>
					</div>
					<Markdown>{review.comment}</Markdown>
				</ResourceList.Item>
			)}
		/>
	</div>
);
