import React from 'react';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import {Card, Layout, Page, FilterType, Pagination, ResourceList, TextStyle} from '@shopify/polaris';
import { Flex, Box } from '@rebass/grid/emotion'
import {compose, withState, withStateHandlers} from 'recompose'
import JsonView from 'react-json-view'
import max from 'ramda/es/max'
import pick from 'ramda/es/pick'

const handleSearch = withState('searchQuery', 'setSearchQuery', '')
const handleFilters = withState('appliedFilters', 'setAppliedFilters', [])
const handlePagination = withStateHandlers(
    {limit: 20, offset: 0},
    {
        nextPage: ({offset, limit}) => () => ({offset: offset + limit}),
        prevPage: ({offset, limit}) => () => ({offset: max(0, offset - limit)})
    }
)

const fetchSurveys = graphql(gql`
    query surveys {
        id
    }
`)

const filters = [
    {
        key: 'suveyStatus',
        label: 'Survey status',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['pending', 'complete', 'cancelled']
    },
    {
        key: 'orderCreated',
        label: 'Order created',
        type: FilterType.DateSelector,
    },
    {
        key: 'reviewSatisfaction',
        label: 'Review satisfaction',
        operatorText: 'is',
        type: FilterType.Select,
        options: ['satisfied', 'not satisfied']
    },
]

const Survey = ({id, url, name, location}) => (
	<ResourceList.Item
		id={id}
		url={url}
		media={<Avatar customer size="medium" name={name} />}
	>
		<h3>
			<TextStyle variation="strong">{name}</TextStyle>
		</h3>
		<div>{location}</div>
	</ResourceList.Item>
);

const View = props => (
    <Page
        title="Surveys"
        breadcrumbs={[{content: 'Dashboard', url: '/'}]}
        pagination={{
            hasPrevious: props.offset > 0,
            onPrevious: props.prevPage,
            hasNext: false,
            onNext: props.nextPage,
        }}
        >
		<Layout sectioned>
            <Card sectioned>
                <JsonView src={pick(['offset'], props)}/>
            </Card>

			<Card sectioned>
				<ResourceList
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
					items={[]}
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
)

export default enhance(View);
