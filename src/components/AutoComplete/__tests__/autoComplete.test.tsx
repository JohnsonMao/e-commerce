import { ReactElement } from 'react';
import { cleanup, render, RenderResult, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import AutoComplete, { DataSourceType } from '../';
import { IChineseZodiac, testFetchSuggestions } from '../const';

/**
 * @vitest-environment jsdom
 */

describe('Test AutoComplete component', () => {
	const hoverClassName = 'ac__suggestion__item-hightlighted';
	const formatText = (item: IChineseZodiac) =>
		`${item.chineseName} - ${item.value}`;

	let wrapper: RenderResult,
		wrapperEl: HTMLElement,
		inputEl: HTMLInputElement,
		suggestionsEl: HTMLUListElement,
		targetEl: HTMLElement,
		keyword: string,
		suggestions: ReturnType<typeof testFetchSuggestions>;

	const onSelect = vi.fn((e: DataSourceType) => e);

	const handleFetchSuggestions = vi.fn((str: string) =>
		testFetchSuggestions(str)
	);

	const handleAsyncFetchSuggestions = vi.fn<
		[string],
		Promise<DataSourceType[]>
	>((str: string) => new Promise((res) => res([{ value: str }])));

	const handleRenderOption = vi.fn<[IChineseZodiac], ReactElement>((item) => {
		return <>{formatText(item)}</>;
	});

	const waitKeyDown = async (key: string) => {
		keyword = key;
		suggestions = testFetchSuggestions(keyword);

		await user.clear(inputEl);
		await user.type(inputEl, keyword);
		expect(inputEl.value).toBe(keyword);
		await waitFor(() => {
			suggestionsEl = wrapperEl.getElementsByTagName('ul')[0];
			expect(suggestionsEl.tagName).toBe('UL');
			expect(suggestionsEl).toBeInTheDocument();
			expect(suggestionsEl).toHaveClass('ac__suggestion');
		});
		expect(handleFetchSuggestions).toBeCalled();
	};

	beforeEach(() => {
		wrapper = render(
			<AutoComplete
				fetchSuggestions={handleFetchSuggestions}
				onSelect={onSelect}
			/>
		);

		wrapperEl = wrapper.getByTestId('test-auto-complete');
		inputEl = wrapperEl.getElementsByTagName('input')[0];
	});

	afterEach(() => {
		keyword = '';
		suggestions = [];
		onSelect.mockClear();
	});

	it('should render the default AutoComplete component', () => {
		expect(wrapperEl).toBeVisible();
		expect(wrapperEl).toHaveClass('ac');
		expect(wrapperEl.tagName).toBe('DIV');
		expect(wrapperEl.children.length).toBe(1);
		expect(inputEl).toHaveClass('input-inner');
		expect(inputEl.tagName).toEqual('INPUT');
	});

	it('should render correct suggestions dropdown by input keyword', async () => {
		await waitKeyDown('a');

		const lastIndex = suggestions.length - 1;

		expect(suggestionsEl.children.length).toBe(suggestions.length);
		expect(suggestionsEl.children[0].textContent).toBe(
			suggestions[0].value
		);
		expect(suggestionsEl.children[lastIndex].textContent).toBe(
			suggestions[lastIndex].value
		);
	});

	it('should render correct click and hover event', async () => {
		await waitKeyDown('e');

		targetEl = wrapper.getByText(suggestions[0].value);
		expect(targetEl).not.toHaveClass(hoverClassName);
		await user.hover(targetEl);
		expect(targetEl).toHaveClass(hoverClassName);
		await user.hover(suggestionsEl.children[1]);
		expect(targetEl).not.toHaveClass(hoverClassName);
		expect(suggestionsEl.children[1]).toHaveClass(hoverClassName);

		await user.click(targetEl);
		expect(onSelect).toBeCalledWith(suggestions[0]);
		expect(inputEl.value).toBe(suggestions[0].value);
		expect(
			wrapper.queryByText(suggestions[0].value)
		).not.toBeInTheDocument();
	});

	it('should provide keyboard support', async () => {
		await waitKeyDown('i');

		await user.keyboard('{Down}');
		expect(suggestionsEl.children[0]).toHaveClass(hoverClassName);
		await user.keyboard('{Down}');
		expect(suggestionsEl.children[0]).not.toHaveClass(hoverClassName);
		expect(suggestionsEl.children[1]).toHaveClass(hoverClassName);
		await user.keyboard('{Down}');
		expect(suggestionsEl.children[1]).not.toHaveClass(hoverClassName);
		expect(suggestionsEl.children[2]).toHaveClass(hoverClassName);
		await user.keyboard('{Down}');
		expect(suggestionsEl.children[2]).toHaveClass(hoverClassName);
		await user.keyboard('{Up}');
		expect(suggestionsEl.children[2]).not.toHaveClass(hoverClassName);
		expect(suggestionsEl.children[1]).toHaveClass(hoverClassName);
		expect(wrapper.queryByText(suggestions[1].value)).toBeInTheDocument();
		await user.keyboard('{Enter}');
		expect(onSelect).toBeCalledWith(suggestions[1]);
		expect(inputEl.value).toBe(suggestions[1].value);
		expect(
			wrapper.queryByText(suggestions[1].value)
		).not.toBeInTheDocument();

		await waitKeyDown('i');
		await user.keyboard('{Down}');
		expect(suggestionsEl.children[0]).toHaveClass(hoverClassName);
		onSelect.mockClear();
		await user.keyboard('{Esc}');
		expect(onSelect).not.toBeCalled();
		expect(inputEl.value).toBe('i');
		expect(
			wrapper.queryByText(suggestions[1].value)
		).not.toBeInTheDocument();
	});

	it('should hide suggestions dropdown when click outside', async () => {
		await waitKeyDown('o');
		expect(suggestionsEl).toBeInTheDocument();
		await user.click(document.body);
		await waitFor(() => {
			expect(suggestionsEl).not.toBeInTheDocument();
		});
	});

	it('should renderOption generate correct template', async () => {
		cleanup();
		wrapper = render(
			<AutoComplete
				fetchSuggestions={handleFetchSuggestions}
				renderOption={handleRenderOption}
				onSelect={onSelect}
			/>
		);

		wrapperEl = wrapper.getByTestId('test-auto-complete');
		inputEl = wrapperEl.getElementsByTagName('input')[0];
		await waitKeyDown('o');
		expect(suggestionsEl.children[0].textContent).toBe(
			formatText(suggestions[0])
		);
		expect(handleRenderOption).toBeCalled();
	});

	it('should fetchSuggestion support async', async () => {
		const key = 'testAsync';

		cleanup();
		wrapper = render(
			<AutoComplete
				fetchSuggestions={handleAsyncFetchSuggestions}
				onSelect={onSelect}
			/>
		);

		wrapperEl = wrapper.getByTestId('test-auto-complete');
		inputEl = wrapperEl.getElementsByTagName('input')[0];
		await waitKeyDown(key);
		await waitFor(() => {
			expect(suggestionsEl).toBeInTheDocument();
			expect(suggestionsEl.children[0].textContent).toContain(key);
		});
		expect(handleAsyncFetchSuggestions).toBeCalled();
	});
});
