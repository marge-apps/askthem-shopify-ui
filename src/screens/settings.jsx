import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Layout, Page, FooterHelp, FormLayout, Checkbox, TextField} from '@shopify/polaris';

const View = props => (
    <Page
        title="Settings"
        breadcrumbs={[{content: 'Dashboard', url: '/'}]}
        primaryAction={{content: 'Save'}}
        >
        <Layout>
        <Layout.AnnotatedSection
            title="Store details"
            description="AskThem will use these settings to contact your customers on your behalf."
        >
            <Card sectioned>
            <FormLayout>
                <TextField type="number" label="Days after order to ask for review" min={1} max={30} />
                <Checkbox checked label="Submit satisfaction surveys to customers automatically" />
            </FormLayout>
            </Card>
        </Layout.AnnotatedSection>

        <Layout.Section sectioned>
            <FooterHelp>
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
