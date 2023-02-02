import { render, RenderResult } from '@testing-library/react';
import Upload from '../';

/**
 * @vitest-environment jsdom
 */

describe('Test AutoComplete component', () => {
	let wrapper: RenderResult, wrapperEl: HTMLElement;

	beforeEach(() => {
		wrapper = render(
			<Upload action='http://jsonplaceholder.typicode.com/posts' />
		);

		wrapperEl = wrapper.getByTestId('test-upload');
	});

	it('should', async () => {});
});
