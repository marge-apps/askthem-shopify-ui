import React from 'react';
import {
	FilterType,
	Card,
	Layout,
	Page,
	Pagination,
	ResourceList,
} from '@shopify/polaris';
import {Flex, Box} from '@rebass/grid/emotion';
import {pathOr} from 'ramda';
import {debounce} from 'debounce';
import {Survey} from './survey.jsx';

const filters = [
	{
		key: 'status',
		label: 'Survey status',
		operatorText: 'is',
		type: FilterType.Select,
		options: ['pending', 'completed', 'cancelled'],
	},
	{
		key: 'reviewSatisfaction',
		label: 'Review satisfaction',
		operatorText: 'is',
		type: FilterType.Select,
		options: ['satisfied', 'not satisfied'],
	},
];

export const View = props => (
	<Page
		fullWidth
		title="Surveys"
		breadcrumbs={[{content: 'Dashboard', url: '/'}]}
		pagination={{
			hasPrevious: props.offset > 0,
			hasNext: true,
			onPrevious: props.prevPage,
			onNext: props.nextPage,
		}}
		secondaryActions={[
			{
				icon: 'refresh',
				content: 'Refresh',
				onAction: () => props.data.refetch(),
			},
		]}
	>
		<Layout sectioned>
			<Card sectioned>
				<ResourceList
					hasMoreItems
					loading={props.data.loading}
					resourceName={{
						singular: 'survey',
						plural: 'surveys',
					}}
					filterControl={
						<ResourceList.FilterControl
							filters={filters}
							searchValue={props.searchQuery}
							appliedFilters={props.appliedFilters}
							onSearchChange={q => props.setSearchQuery(q)}
							onFiltersChange={q => props.setAppliedFilters(q)}
						/>
					}
					items={pathOr([], ['data', 'getSurveys', 'surveys'], props)}
					renderItem={Survey}
				/>
				<Flex direction="row" justifyContent="center">
					<Box>
						<Pagination
							hasNext
							hasPrevious={props.offset > 0}
							onNext={props.nextPage}
							onPrevious={props.prevPage}
						/>
					</Box>
				</Flex>
			</Card>
		</Layout>
	</Page>
);
