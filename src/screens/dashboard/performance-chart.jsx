import React from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import {map, sum} from 'ramda';
import {mapProps} from 'recompose';

export const Chart = ({data}) => (
	<ResponsiveContainer width="100%" height={250}>
		<LineChart data={data}>
			<Line type="monotone" dataKey="Total reviews" stroke="#9C6ADE" />
			<Line type="monotone" dataKey="Positive reviews" stroke="#50B83C" />
			<Line type="monotone" dataKey="Negative reviews" stroke="#FEAD9A" />
			<CartesianGrid stroke="#ccc" />
			<XAxis
				dataKey="Reviewed on"
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

export const transformData = mapProps(({data}) => ({
	data: map(
		({positiveReviews, negativeReviews, reviewedAt}) => ({
			'Positive reviews': positiveReviews,
			'Negative reviews': negativeReviews,
			'Total reviews': positiveReviews + negativeReviews,
			'Reviewed on': reviewedAt,
		}),
		data,
	),
}));

export const PerformanceChart = transformData(Chart);
