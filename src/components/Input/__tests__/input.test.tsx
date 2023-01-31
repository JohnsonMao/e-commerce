import { ChangeEvent } from 'react';
import { render, RenderResult } from '@testing-library/react';
import user from '@testing-library/user-event';
import Input from '../';

/**
 * @vitest-environment jsdom
 */

describe('Test Input component', () => {
	const onChange = vi.fn(
		(e: ChangeEvent<HTMLInputElement>) => e.target.value
	);
	let wrapper: RenderResult,
		wrapperEl: HTMLElement,
		prependEl: HTMLElement,
		appendEl: HTMLElement,
		inputEl: HTMLInputElement;

	const setEl = (type?: 'all') => {
		wrapperEl = wrapper.getByTestId('test-input');
		inputEl = wrapperEl.getElementsByTagName('input')[0];
		if (type === 'all') {
			prependEl = wrapper.getByText('Prepend');
			appendEl = wrapper.getByText('Append');
		}
	};

	it('should render the default input component', () => {
		wrapper = render(<Input />);

		setEl();
		expect(wrapperEl).toBeVisible();
		expect(wrapperEl).toHaveClass('input-wrapper');
		expect(wrapperEl.tagName).toBe('DIV');
		expect(wrapperEl.children.length).toBe(1);
		expect(inputEl).toHaveClass('input-inner');
		expect(inputEl.tagName).toEqual('INPUT');
	});

	it('should render the large input component and className test', async () => {
		const value = 'testValue';

		wrapper = render(
			<Input
				className="test"
				onChange={onChange}
				prepend="Prepend"
				append="Append"
				size="lg"
			/>
		);

		setEl('all');
		expect(wrapperEl).toHaveClass('input-lg test');
		expect(prependEl).toHaveClass('input-prepend');
		expect(appendEl).toHaveClass('input-append');
		expect(prependEl).toHaveTextContent('Prepend');
		expect(appendEl).toHaveTextContent('Append');
		await user.type(inputEl, value);
		expect(onChange).toReturnWith(value);
		expect(inputEl.value).toBe(value);
	});

	it('should render the small input component and disabled is true', async () => {
		wrapper = render(
			<Input onChange={onChange} disabled={true} size="sm" />
		);

		onChange.mockClear();
		setEl();
		expect(wrapperEl).toHaveClass('input-sm disabled');
		expect(inputEl).toBeDisabled();
		await user.type(inputEl, '123');
		expect(onChange).not.toBeCalled();
	});

	it('should show defaultValue and typeing text return correct value', async () => {
		const initValue = 'defaultValue';
		const typeValue = 'Test';
		const resultValue = initValue + typeValue;

		wrapper = render(
			<Input onChange={onChange} defaultValue={initValue} />
		);

		setEl();
		expect(inputEl.value).toBe(initValue);
		await user.type(inputEl, typeValue);
		expect(onChange).toReturnWith(resultValue);
		expect(inputEl.value).toBe(resultValue);
	});
});
