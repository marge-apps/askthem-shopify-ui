import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Layout, Page, FooterHelp, FormLayout, Checkbox, TextField, DropZone} from '@shopify/polaris';

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
        <Layout.AnnotatedSection
            title="Basic settings"
            description="AskThem will use these settings to contact your customers on your behalf."
        >
            <Card sectioned>
            <FormLayout>
                <TextField type="number" label="Days after order to ask for review" min={1} max={30} value={5}/>
                <Checkbox checked label="Submit satisfaction surveys to customers automatically" />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

		<Layout.AnnotatedSection
            title="Email details"
            description="AskThem will emails on your behalf with these settings."
        >
            <Card sectioned>
            <FormLayout>
                <TextField disabled label="Email from (usually the shop name)" value="My shop inc"/>
                <TextField disabled label="Email subject" value="Satisfaction survey for your recent order"/>
				<DropZone
					active
					label="Shop logo"
					accept="image/*"
					type="image"
					></DropZone>
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.Section sectioned>            <FooterHelp>
                Not sure how AskThem works?{' '}
                <a target="_blank" href="https://help.shopify.com/manual/orders/fulfill-orders">
                    View this video
                </a>
                .
                </FooterHelp>
        </Layout.Section>
        </Layout>
	</Page>
);

export default View;
