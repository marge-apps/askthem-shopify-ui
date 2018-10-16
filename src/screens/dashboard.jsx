import React from 'react';
import {Link} from 'react-router-dom'
import { ActionList, Button, Popover, Card, ResourceList, DisplayText, EmptyState, Layout, Page, SkeletonBodyText, SkeletonDisplayText, TextStyle} from '@shopify/polaris';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from 'recharts'
import {css} from 'react-emotion'
import {pathEq} from 'ramda'
import TimeAgo from 'react-timeago'
import Markdown from 'react-markdown'
import {compose, withProps, withState, withStateHandlers, branch, renderComponent} from 'recompose';
import {Satisfaction} from '../components/satisfaction'
import messagingImg from '../images/messaging.svg'

export const RangePicker = withStateHandlers(
	{isActive: false},
	{toggle: ({isActive}) => () => ({isActive: !isActive})}
)(({isActive, range, setRange, toggle,}) => (
	<div className={css` margin-bottom: 2rem; `}>
		<Popover
			active={isActive}
			activator={<Button onClick={toggle} icon="calendar">Last {range} days</Button>}
			onClose={toggle}
			>
			<ActionList
				items={[
					{content: 'Last 7 days', onAction: () => {setRange(7); toggle()}},
					{content: 'Last 15 days', onAction: () => {setRange(15); toggle()}},
					{content: 'Last 30 days', onAction: () => {setRange(30); toggle()}},
					{content: 'Last 90 days', onAction: () => {setRange(90); toggle()}},
				]}
				/>
		</Popover>
	</div>
))

export const PerformanceChart = ({data}) => (
	<ResponsiveContainer width="100%" height={250}>
		<LineChart data={data}>
			<Line type="monotone" dataKey="Total" stroke="#9C6ADE" />
			<Line type="monotone" dataKey="Positives" stroke="#50B83C" />
			<Line type="monotone" dataKey="Negatives" stroke="#FEAD9A" />
			<CartesianGrid stroke="#ccc" />
			<XAxis
				dataKey="date"
				interval="preserveEnd"
				tick={{fill: '#919EAB', fontSize: 12}}
				tickMargin={10}
			/>
			<YAxis
				axisLine={false}
				interval={1}
				tick={{fill: '#919EAB', fontSize: 12}}
				tickMargin={10}
				width={25}
			/>
			<Tooltip />
			<Legend align="right" iconType="square" tick={{fill: 'red'}} />
		</LineChart>
	</ResponsiveContainer>
);

export const ViewError = () => (
	<EmptyState
		heading="Something went wrong"
		action={{content: 'Reload'}}
		secondaryAction={{content: 'Contact us', url: 'https://help.shopify.com'}}
		image={messagingImg}
		>
		<p>Something did not work as expected. Please click reload button below to refresh the page.</p>
		<p>If the problem persists, please click contact button and we will be happy to help you.</p>
	</EmptyState>
)

export const ViewLoading = (props) => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{ content: 'Surveys' },
			{ content: 'Settings' },
		]}
		>
		<RangePicker range={props.range} setRange={props.setRange}/>

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
				<Card
					sectioned
					title="Performance graph"
					>
					<SkeletonBodyText />
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card
					sectioned
					title="Latest complete surveys"
					actions={[{content: 'View all', url: '/surveys'}]}
					>
		     		<SkeletonBodyText />
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
)

const View = props => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{content: 'Surveys', url: '/surveys'},
			{content: 'Settings'},
		]}
	>

		<RangePicker range={props.range} setRange={props.setRange}/>

		<Layout>
			<Layout.Section secondary>
				<Card sectioned title="Positive responses">
					<DisplayText size={"medium"}>{props.positiveResponses}</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section secondary>
				<Card sectioned title="Negative responses">
					<DisplayText size={"medium"}>{props.negativeResponses}</DisplayText>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card sectioned title="Performance graph">
					<PerformanceChart data={props.performance} />
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
						items={props.latestResponses}
						renderItem={({orderId, review}) => (
							<ResourceList.Item
								id={orderId}
								media={<Satisfaction satisfied={review.satisfied} />}
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

const withRange = withState('range', 'setRange', 30)
const handleLoading = branch(pathEq(['data', 'loading'], true), renderComponent(ViewLoading))
const handleError = branch(pathEq(['data', 'error'], true), renderComponent(ViewError))

export default compose(
withRange,
handleLoading,
handleError,
withProps({
	positiveResponses: 20,
	negativeResponses: 10,
	performance: [
		{date: 'Oct 1', "Total": 10, "Positives": 7, "Negatives": 3},
		{date: 'Oct 2', "Total": 15, "Positives": 5, "Negatives": 8},
		{date: 'Oct 3', "Total": 12, "Positives": 11, "Negatives": 1},
		{date: 'Oct 4', "Total": 19, "Positives": 14, "Negatives": 5},
		{date: 'Oct 5', "Total": 16, "Positives": 3, "Negatives": 12},
		{date: 'Oct 6', "Total": 10, "Positives": 7, "Negatives": 3},
		{date: 'Oct 7', "Total": 15, "Positives": 5, "Negatives": 8},
		{date: 'Oct 8', "Total": 12, "Positives": 11, "Negatives": 1},
		{date: 'Oct 9', "Total": 19, "Positives": 14, "Negatives": 5},
		{date: 'Oct 10', "Total": 16, "Positives": 3, "Negatives": 12}
	],
	latestResponses: [
		{orderId: '#2326', review: {satisfied: true, comment: 'Lorem ipsum dorcet sit amet funky cutie pie.', reviewedOn: '2018-10-12T10:00'}},
		{orderId: '#2488', review: {satisfied: false, comment: 'Lorem ipsum dorcet sit amet funky cutie pie.', reviewedOn: '2018-10-12T06:00'}},
		{orderId: '#2019', review: {satisfied: false, comment: 'Lorem ipsum dorcet sit amet funky cutie pie.', reviewedOn: '2018-10-10T12:00'}},
		{orderId: '#2544', review: {satisfied: true, comment: 'Lorem ipsum dorcet sit amet funky cutie pie.', reviewedOn: '2018-10-09T10:00'}},
		{orderId: '#2874', review: {satisfied: true, comment: 'Lorem ipsum dorcet sit amet funky cutie pie.', reviewedOn: '2018-10-09T09:00'}},
	]
}),
)(View);
