import React from 'react';
import {withStateHandlers} from 'recompose';
import styled from 'react-emotion';
import {Popover, ActionList, Button} from '@shopify/polaris';

const Container = styled('div')`
	margin-bottom: 2rem;
`;

export const RangePicker = withStateHandlers(
	{isActive: false},
	{toggle: ({isActive}) => () => ({isActive: !isActive})},
)(({isActive, range, setRange, toggle}) => (
	<Container>
		<Popover
			active={isActive}
			activator={
				<Button icon="calendar" onClick={toggle}>
					Last {range} days
				</Button>
			}
			onClose={toggle}
		>
			<ActionList
				items={[
					{
						content: 'Last 7 days',
						onAction: () => {
							setRange(7);
							toggle();
						},
					},
					{
						content: 'Last 15 days',
						onAction: () => {
							setRange(15);
							toggle();
						},
					},
					{
						content: 'Last 30 days',
						onAction: () => {
							setRange(30);
							toggle();
						},
					},
					{
						content: 'Last 90 days',
						onAction: () => {
							setRange(90);
							toggle();
						},
					},
				]}
			/>
		</Popover>
	</Container>
));
