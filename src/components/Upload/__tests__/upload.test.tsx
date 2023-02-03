import { render, RenderResult } from '@testing-library/react';
import Upload from '../';
import Button from '../../Button';

/**
 * @vitest-environment jsdom
 */

describe('Test AutoComplete component', () => {
	let wrapper: RenderResult, wrapperEl: HTMLElement;

	beforeEach(() => {
		wrapper = render(
			<Upload action='#'><Button>上傳檔案</Button></Upload>
		);

		wrapperEl = wrapper.getByTestId('test-upload');
	});

	it('should', async () => {});
});
