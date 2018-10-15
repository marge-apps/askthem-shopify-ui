import React from 'react';
import {Card, Layout, Page, FilterType, ResourceList, TextStyle} from '@shopify/polaris';
import {compose, withState} from 'recompose'

const handleSearch = withState('searchQuery', 'setSearchQuery', '')
const handleFilters = withState('appliedFilters', 'setAppliedFilters', [])

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
	<Page title="Surveys" breadcrumbs={[{content: 'Dashboard', url: '/'}]}>
		<Layout sectioned>
			<Card sectioned>
				<ResourceList
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
			</Card>
		</Layout>
	</Page>
);

const enhance = compose(
    handleSearch,
    handleFilters,
)

export default enhance(View);
