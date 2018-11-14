import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {
	branch,
	compose,
	withState,
	withStateHandlers,
	withProps,
	renderComponent,
	withPropsOnChange,
} from 'recompose';
import {
	allPass,
	propOr,
	pipe,
	max,
	path,
	isEmpty,
	pathOr,
	prop,
	uniqBy,
} from 'ramda';
import {debounce} from 'debounce';

import {View} from './view.jsx';
import {LoadingView} from './loading.jsx';

const handleLoading = branch(
	allPass([
		path(['data', 'loading']),
		pipe(
			pathOr([], ['data', 'getSurveys', 'surveys']),
			isEmpty,
		),
	]),
	renderComponent(LoadingView),
);

const handleSearch = withState('searchQuery', 'setSearchQuery', '');
const handleSearchQuery = withState('query', 'setQuery', '');
const handleFilters = withState('appliedFilters', 'setAppliedFilters', []);
const uniqueFilters = withProps(({appliedFilters}) => ({
	appliedFilters: uniqBy(prop('key'), appliedFilters.reverse()).reverse(),
}));

const debounceQuery = withPropsOnChange(['searchQuery'], debounce(({searchQuery, setQuery}) => setQuery(searchQuery), 500))

const handlePagination = withStateHandlers(
	{limit: 20, offset: 0},
	{
		nextPage: ({offset, limit}) => () => ({offset: offset + limit}),
		prevPage: ({offset, limit}) => () => ({offset: max(0, offset - limit)}),
	},
);

const fetchSurveys = graphql(
	gql`
		query GetSurveys($status: Status) {
			getSurveys(status: $status) {
				surveys {
					id
					status
					review {
						satisfied
						comment
					}
					order
				}
				total
			}
		}
	`,
	{
		options: props => {
			const status = propOr(
				undefined,
				'value',
				props.appliedFilters.find(({key}) => key === 'status'),
			);

			return {
				fetchPolicy: 'network-only',
				notifyOnNetworkStatusChange: true,
				variables: {
					status,
					query: props.query,
				},
			};
		},
	},
);

const enhance = compose(
	handleSearch,
	handleSearchQuery,
	debounceQuery,
	handleFilters,
	uniqueFilters,
	handlePagination,
	fetchSurveys,
	handleLoading,
);

export default enhance(View);
