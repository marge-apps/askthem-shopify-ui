import React from 'react';
import { Card, DataTable, DisplayText, Layout, Page, } from '@shopify/polaris';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer} from 'recharts'
import mapProps from 'recompose/mapProps';

export const PerformanceChart = ({data}) => (
	<ResponsiveContainer width="100%" height={250}>
	<LineChart data={data}>
		<Line type="monotone" dataKey="Total" stroke="#9C6ADE" />
		<Line type="monotone" dataKey="Positives" stroke="#50B83C" />
		<Line type="monotone" dataKey="Negatives" stroke="#FEAD9A" />
		<CartesianGrid stroke="#ccc" />
		<XAxis dataKey="date" interval="preserveEnd" tick={{fill: '#919EAB', fontSize: 12, }} tickMargin={10}/>
		<YAxis axisLine={false} interval={1} tick={{fill: '#919EAB', fontSize: 12, }} tickMargin={10} width={25}/>
		<Tooltip/>
		<Legend align="right" iconType="square" tick={{fill: "red"}}/>
	</LineChart>
	</ResponsiveContainer>
);

export const DisplayCard = ({ title, size = 'large', children }) => (
	<Card sectioned title={title}>
		<DisplayText size={size}>{children}</DisplayText>
	</Card>
);

const View = props => (
	<Page
		title="Dashboard"
		secondaryActions={[
			{ content: 'Surveys' },
			{ content: 'Settings' },
		]}
	>
		<Layout>
			<Layout.Section secondary>
				<DisplayCard title="Positive responses">
					{props.positiveResponses}
				</DisplayCard>
			</Layout.Section>

			<Layout.Section secondary>
				<DisplayCard title="Negative responses">
					{props.negativeResponses}
				</DisplayCard>
			</Layout.Section>

			<Layout.Section>
				<Card
					sectioned
					title="Performance graph"
					>
					<PerformanceChart data={props.performance}/>
				</Card>
			</Layout.Section>

			<Layout.Section>
				<Card
					title="Latest complete surveys"
					actions={[{content: 'View all'}]}
					>
					<br/>
					{
						// TODO: Fix me
					}
					<DataTable
						columnContentTypes={['text', 'text', 'text', 'text']}
						headings={[ 'Rating', 'Customer', 'Order', 'Comment', ]}
						rows={[
							['Positive', 'Marios Mistoglou', '#2434', 'Lorem ipsum dorcet sit amet funky cutie pie'],
							['Negative', 'George Kostopoulos', '#6546', 'Lorem ipsum dorcet sit amet funky cutie pie'],
							['Positive', 'Frank Sinatra', '#5645', 'Lorem ipsum dorcet sit amet funky cutie pie'],
							['Negative', 'Janet Jackson', '#2342', 'Lorem ipsum dorcet sit amet funky cutie pie'],
							['Positive', 'Leeroy Merlin', '#8972', 'Lorem ipsum dorcet sit amet funky cutie pie'],
						]}
						/>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);

export default mapProps(props => ({
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
	]
}))(View);
