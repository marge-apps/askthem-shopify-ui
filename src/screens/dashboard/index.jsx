import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import {pathEq, path} from 'ramda';
import {compose, withState, branch, renderComponent} from 'recompose';

import {ViewLoading} from './loading.jsx';
import {ViewError} from './error.jsx';
import {View} from './view.jsx';

const withRange = withState('range', 'setRange', 30);
const handleLoading = branch(
	pathEq(['data', 'loading'], true),
	renderComponent(ViewLoading),
);

const handleError = branch(
	path(['data', 'error']),
	renderComponent(ViewError),
);

const loadStatistics = graphql(
	gql`
		query {
			getStatistics(dateFrom: "2018-01-01") {
				positiveReviews
				negativeReviews
				perfomance {
					reviewedAt
					positiveReviews
					negativeReviews
				}
			}

			getSurveys(status: completed, limit: 5) {
				surveys {
					id
					createdAt
					review {
						comment
						createdAt
						satisfied
					}
					order
				}
			}
		}
	`,
	{
		options: {
			notifyOnNetworkStatusChange: true,
		},
	},
);

export default compose(
	withRange,
	loadStatistics,
	handleLoading,
	handleError,
)(View);
