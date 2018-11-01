import React from 'react';
import {Link} from 'react-router-dom';
import {
	Banner,
	Card,
	Layout,
	Page,
	FooterHelp,
	FormLayout,
	Checkbox,
	TextField,
	DropZone,
} from '@shopify/polaris';

const View = props => (
	<Page
		title="Settings"
		breadcrumbs={[{content: 'Dashboard', url: '/'}]}
		primaryAction={{content: 'Save'}}
		secondaryActions={[
			{content: 'Send a test email'},
			{content: 'View feedback page'},
		]}
	>
		<Layout>
			<Layout.Section>
				<Banner title="This application is under development" status="info">
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
						scelerisque orci augue, vel rhoncus lacus condimentum non. Aliquam
						dolor ex, finibus a odio et, sollicitudin volutpat quam.
						Pellentesque tempor viverra est eget sagittis. Suspendisse
						pellentesque, lacus a commodo mattis, lorem mi fermentum risus,
						volutpat semper orci elit et lacus. Nullam hendrerit lacus a mauris
						aliquam, in tincidunt metus vulputate. Quisque ac ipsum consectetur,
						pellentesque nulla eu, hendrerit enim. Cras nec gravida justo. Donec
						venenatis auctor sodales. Fusce eget libero consequat, commodo
						tortor nec, hendrerit neque. Nulla velit magna, accumsan at tempor
						vel, lobortis sed justo. Sed tristique tristique augue, quis
						malesuada lectus vestibulum sit amet. Proin nec feugiat urna, sit
						amet sodales urna.
					</p>
				</Banner>
			</Layout.Section>
			<Layout.AnnotatedSection
				title="Basic settings"
				description="AskThem will use these settings to contact your customers on your behalf."
			>
				<Card sectioned>
					<FormLayout>
						<TextField
							type="number"
							label="Days after order to ask for review"
							min={1}
							max={30}
							value={5}
						/>
						<Checkbox
							checked
							label="Submit satisfaction surveys to customers automatically"
						/>
					</FormLayout>
				</Card>
			</Layout.AnnotatedSection>

			<Layout.AnnotatedSection
				title="Email details"
				description="AskThem will emails on your behalf with these settings."
			>
				<Card sectioned>
					<FormLayout>
						<TextField
							disabled
							label="Email from (usually the shop name)"
							value="My shop inc"
						/>
						<TextField
							disabled
							label="Email subject"
							value="Satisfaction survey for your recent order"
						/>
						<DropZone active label="Shop logo" accept="image/*" type="image" />
					</FormLayout>
				</Card>
			</Layout.AnnotatedSection>

			<Layout.Section sectioned>
				{' '}
				<FooterHelp>
					Not sure how AskThem works?{' '}
					<a
						target="_blank"
						href="https://help.shopify.com/manual/orders/fulfill-orders"
					>
						View this video
					</a>
					.
				</FooterHelp>
			</Layout.Section>
		</Layout>
	</Page>
);

export default View;
