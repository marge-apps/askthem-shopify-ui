import React from 'react';
import {Avatar, TextStyle, ResourceList} from '@shopify/polaris';

export const Survey = ({id, review, order, status}) => (
	<ResourceList.Item
		id={id}
		url={`/surveys/${id}`}
		media={
			<Avatar customer size="medium" name={`${order.customer.fullName}`} />
		}
	>
		<h3>
			{status} Order {order.id} {order.customer.full_name}
		</h3>
	</ResourceList.Item>
);
