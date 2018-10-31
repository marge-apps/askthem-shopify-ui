import React from 'react';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

export const PerformanceChart = ({data}) => (
	<ResponsiveContainer width="100%" height={250}>
		<LineChart data={data}>
			<Line type="monotone" dataKey="Total" stroke="#9C6ADE"/>
			<Line type="monotone" dataKey="Positives" stroke="#50B83C"/>
			<Line type="monotone" dataKey="Negatives" stroke="#FEAD9A"/>
			<CartesianGrid stroke="#ccc"/>
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
			<Tooltip/>
			<Legend align="right" iconType="square" tick={{fill: 'red'}}/>
		</LineChart>
	</ResponsiveContainer>
);
