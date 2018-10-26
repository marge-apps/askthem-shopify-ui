import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {
    Card,
	Layout,
    Page,
    DisplayText,
    TextContainer,
    ResourceList,
    TextStyle,
} from '@shopify/polaris';
import {
    branch,
	compose,
	withState,
	withStateHandlers,
	renderComponent,
} from 'recompose';
import TimeAgo from 'react-timeago'
import {path} from 'ramda'
import Markdown from '../components/markdown'
import {Satisfaction} from '../components/satisfaction'

const fixtureComment = `
Nam molestias et sed. Voluptatum quod non quisquam deserunt repudiandae. Pariatur voluptas cum non blanditiis possimus vitae. Enim sunt ut repellendus reiciendis. Quas ut nostrum quos et similique assumenda. Sapiente minima veritatis labore hic mollitia.

Exercitationem qui vel rerum mollitia et. Facere enim et at voluptate. Quis eos vero suscipit. Quia quia debitis esse eius aspernatur veritatis sit.
`

const LoadingView = props => (
	<Page
		title="Survey"
		breadcrumbs={[{ content: 'Surveys', url: '/surveys' }]}
		secondaryActions={[
			{
				icon: 'refresh',
				content: 'Refresh',
				onAction: () => props.data.refetch(),
            },
		]}
		>
		<Layout>
			<Layout.Section>
				<Card sectioned>
                    Loading...
				</Card>
			</Layout.Section>
		</Layout>
	</Page>
);

const handleLoading = branch(
    path(['data', 'loading']),
    renderComponent(LoadingView)
);

const fetchSurvey = graphql(gql`
	query {
		survey(id: "some-id") {
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
	}
`, {options: {notifyOnNetworkStatusChange: true}});

const View = props => (
	<Page
		title="Survey"
		breadcrumbs={[{ content: 'Surveys', url: '/surveys' }]}
		secondaryActions={[
			{
				icon: 'refresh',
				content: 'Refresh',
				onAction: () => props.data.refetch(),
            },
            {
				icon: 'notification',
				content: 'Resend notification',
			},
		]}
	>
		<Layout>
            <Layout.Section>
                <Card
                    title="Review"
                    >
                    <Card.Section>
                        <DisplayText size={"medium"}>Satisfied</DisplayText>
                    </Card.Section>
                    <Card.Section title="Comment">
                        <TextContainer>
                            <Markdown source={fixtureComment}/>
                        </TextContainer>
                    </Card.Section>
                </Card>

                <Card title="Timeline">
                    <ul>
                        <li> Bought on Tuesday, 14th September 2018 </li>
                        <li> Invited to review on Thursday, 21st September 2018 </li>
                        <li> Reviewed on Friday, 22st September 2018 </li>
                    </ul>
                </Card>
            </Layout.Section>

            <Layout.Section secondary>
                <Card
                    title="Order #123123"
                    actions={[
                        {content: 'View order'}
                    ]}
                    >
                    <ul>
                        <li><strong>Placed on:</strong> Tue, 18th March 2018</li>
                        <li><strong>Total amount:</strong> 205.00</li>
                    </ul>

                </Card>
                <Card
                    actions={[{content: 'All surveys'}]}
                    title="Previous surveys"
                    >
                <ResourceList
						resourceName={{singular: 'survey', plural: 'surveys'}}
						items={[{id: '1231', review: {satisfied: true, reviewedOn: new Date()}}]}
						renderItem={({id, review}) => (
							<ResourceList.Item
								id={id}
								media={<Satisfaction satisfied={review.satisfied} />}
								>
								<h3>
									<TextStyle variation="strong">
										#{id}
									</TextStyle>
								</h3>
								<div>
									<TextStyle variation="subdued">
										<TimeAgo date={review.reviewedOn}/>
									</TextStyle>
								</div>
							</ResourceList.Item>
						)}
						/>
                </Card>
            </Layout.Section>
		</Layout>
	</Page>
);

const enhance = compose(
    fetchSurvey,
    handleLoading,
);

export default enhance(View);
