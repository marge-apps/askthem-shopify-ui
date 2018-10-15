import React from 'react';
import testRenderer from 'react-test-renderer';
import addShopifyAppProvider from './add-shopify-app-provider';

describe('addShopifyAppProvider hoc', () => {
	test('renders component properly', () => {
		const Component = addShopifyAppProvider(() => <div>Hello world!</div>);

		const renderer = testRenderer.create(<Component />);

		const actual = renderer.toJSON();
		const expectation = {type: 'div', props: {}, children: ['Hello world!']};

		expect(actual).toEqual(expectation);
	});
});
