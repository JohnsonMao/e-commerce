import { ReactElement } from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import AutoComplete, { DataSourceType } from '../';

export const chineseZodiac = [
	{ value: 'Rat', chineseName: '鼠' },
	{ value: 'Ox', chineseName: '牛' },
	{ value: 'Tiger', chineseName: '虎' },
	{ value: 'Rabbit', chineseName: '兔' },
	{ value: 'Dragon', chineseName: '龍' },
	{ value: 'Snake', chineseName: '蛇' },
	{ value: 'Horse', chineseName: '馬' },
	{ value: 'Goat', chineseName: '羊' },
	{ value: 'Monkey', chineseName: '猴' },
	{ value: 'Rooster', chineseName: '雞' },
	{ value: 'Dog', chineseName: '狗' },
	{ value: 'Pig', chineseName: '豬' }
];

export type IChineseZodiac = typeof chineseZodiac[0];
export type IGithubUser = {
	login: string;
	avatar_url: string;
};

export function testFetchSuggestions(str: string) {
	return chineseZodiac.filter((zodiac) =>
		zodiac.value.toLowerCase().includes(str.toLowerCase())
	);
}
export function testAsyncFetchSuggestions(str: string) {
	return fetch(`https://api.github.com/search/users?q=${str}`)
		.then((res) => res.json())
		.then(({ items }) =>
			Array.isArray(items)
				? items.slice(0, 10).map((item: IGithubUser) => ({
						value: item.login,
						...item
				  }))
				: []
		)
		.catch(() => []);
}

/**
 * @vitest-environment jsdom
 */

describe('Test AutoComplete component', () => {
	const onSelect = vi.fn((e: DataSourceType) => e);
	const handleFetchSuggestions = vi.fn((str: string) =>
		testFetchSuggestions(str)
	);
	const handleAsyncFetchSuggestions = vi.fn((str: string) =>
		testAsyncFetchSuggestions(str)
	);
	const handleRenderOption = vi.fn<[IChineseZodiac], ReactElement>((item) => {
		return (
			<>
				{item.chineseName} - {item.value}
			</>
		);
	});

	let wrapper: RenderResult,
		wrapperEl: HTMLElement,
		inputEl: HTMLInputElement,
		suggestionsEl: HTMLUListElement;

	beforeEach(() => {
		wrapper = render(
			<AutoComplete
				fetchSuggestions={handleFetchSuggestions}
				renderOption={handleRenderOption}
				onSelect={onSelect}
			/>
		);

		wrapperEl = wrapper.getByTestId('test-auto-complete');
		inputEl = wrapperEl.getElementsByTagName('input')[0];
	});

	it('should render the default AutoComplete component', () => {
		expect(wrapperEl).toBeVisible();
		expect(wrapperEl).toHaveClass('ac');
		expect(wrapperEl.tagName).toBe('DIV');
		expect(wrapperEl.children.length).toBe(1);
		expect(inputEl).toHaveClass('input-inner');
		expect(inputEl.tagName).toEqual('INPUT');
	});

	it('should render correct suggestions dropdown with input keyword', async () => {
		const keyword = 'o';
		const suggestionsLength = testFetchSuggestions(keyword).length;

		expect(wrapper.queryByText(keyword)).toBeNull();
		await user.type(inputEl, keyword);
		expect(inputEl.value).toBe(keyword);
		await waitFor(() => {
			expect(wrapper.queryByText('牛 - Ox')).toBeVisible();
		});
		suggestionsEl = wrapperEl.getElementsByTagName('ul')[0];
		expect(suggestionsEl.children.length).toBe(suggestionsLength);
		await user.click(suggestionsEl.children[0]);
		// expect(onSelect).toReturnWith(keyword);
	});

	it('should provide keyboard support', async () => {
	});

	it('should hide suggestions dropdown when click outside', async () => {
	});

	it('should renderOption generate correct template', async () => {
	});

	it('should fetchSuggestion support async', async () => {
	});
});
