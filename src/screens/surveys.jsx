import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {
    Avatar,
    Card,
	Layout,
    Page,
    Spinner,
    SkeletonPage,
	FilterType,
	Pagination,
	ResourceList,
	TextStyle,
} from '@shopify/polaris';
import styled from 'react-emotion'
import { Flex, Box } from '@rebass/grid/emotion';
import {
    branch,
	compose,
	withState,
	withStateHandlers,
	renderComponent,
} from 'recompose';
import JsonView from 'react-json-view';
import {allPass, pipe, max, pick, path, isEmpty, pathOr} from 'ramda';

const Placeholder = styled('div')`
    padding: 100px 0;
    text-align: center;
`

const LoadingView = props => (
	<Page
		fullWidth
		title="Surveys"
		breadcrumbs={[{ content: 'Dashboard', url: '/' }]}
		secondaryActions={[
			{
				icon: 'refresh',
				content: 'Refresh',
				onAction: () => props.data.refetch(),
			},
		]}
		pagination={{
			hasPrevious: false,
			hasNext: false,
		}}
		>
		<Layout>
			<Layout.Section>
				<Card sectioned>
                    <Placeholder>
                        <Spinner />
                    </Placeholder>
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);

const handleLoading = branch(
    allPass([
        path(['data', 'loading']),
        pipe(pathOr([], ['data', 'surveys', 'surveys']), isEmpty)
    ]),
    renderComponent(LoadingView)
);

const handleSearch = withState('searchQuery', 'setSearchQuery', '');
const handleFilters = withState('appliedFilters', 'setAppliedFilters', []);
const handlePagination = withStateHandlers(
	{ limit: 20, offset: 0 },
	{
		nextPage: ({ offset, limit }) => () => ({ offset: offset + limit }),
		prevPage: ({ offset, limit }) => () => ({ offset: max(0, offset - limit) }),
	},
);

const fetchSurveys = graphql(gql`
	query {
		surveys {
			surveys {
				id
				status
				customer {
					firstName
					lastName
				}
				review {
					satisfied
					comment
				}
				order
			}
			total
		}
	}
`, {options: {notifyOnNetworkStatusChange: true}});

const filters = [
	{
		key: 'status',
		label: 'Survey status',
		operatorText: 'is',
		type: FilterType.Select,
		options: ['pending', 'complete', 'cancelled'],
	},
	{
		key: 'reviewSatisfaction',
		label: 'Review satisfaction',
		operatorText: 'is',
		type: FilterType.Select,
		options: ['satisfied', 'not satisfied'],
	},
];

const Survey = ({id, status, customer, review, order}) => (
	<ResourceList.Item
		id={id}
		url={`/surveys/${id}`}
		media={<Avatar customer size="medium" name={`${customer.firstName} ${customer.lastName}`}/>}
	>
		<h3>
			<TextStyle variation="strong">Order {order.id} - {customer.firstName} {customer.lastName}</TextStyle>
		</h3>
		<div>{review.comment}</div>
	</ResourceList.Item>
);

const View = props => (
	<Page
		fullWidth
		title="Surveys"
		breadcrumbs={[{ content: 'Dashboard', url: '/' }]}
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
                    loading={props.data.loading}
					hasMoreItems
					resourceName={{
						singular: 'survey',
						plural: 'surveys',
					}}
					filterControl={
						<ResourceList.FilterControl
							filters={filters}
							searchValue={props.searchQuery}
							onSearchChange={q => props.setSearchQuery(q)}
							appliedFilters={props.appliedFilters}
							onFiltersChange={q => props.setAppliedFilters(q)}
						/>
					}
					items={path(['data', 'surveys', 'surveys'], props)}
					renderItem={Survey}
				/>
				<Flex direction="row" justifyContent="center">
					<Box>
						<Pagination
							hasPrevious={props.offset > 0}
							onPrevious={props.prevPage}
							hasNext={true}
							onNext={props.nextPage}
						/>
					</Box>
				</Flex>
			</Card>
		</Layout>
	</Page>
);

const enhance = compose(
	handleSearch,
	handleFilters,
    handlePagination,
    fetchSurveys,
    handleLoading,
);

export default enhance(View);
