import {
	cleanup,
	fireEvent,
	render,
	RenderResult
} from '@testing-library/react';
import Menu, { MenuProps, MenuItem } from '../';

/**
 * @vitest-environment jsdom
 */
const toArray = (classList: DOMTokenList) => Object.values(classList);

const generateMenu = (props: MenuProps) => (
	<Menu {...props}>
		<MenuItem>Default active</MenuItem>
		<MenuItem disabled>Disabled</MenuItem>
		<MenuItem>Test item</MenuItem>
	</Menu>
);

describe('Test Menu & MenuItem component', () => {
	const onSelect = vi.fn();
	let wrapper: RenderResult,
		menuEl: HTMLElement,
		activeEl: HTMLElement,
		disabledEl: HTMLElement;

	beforeEach(() => {
		wrapper = render(
			generateMenu({
				className: 'test',
				onSelect
			})
		);
		menuEl = wrapper.getByTestId('test-menu');
		activeEl = wrapper.getByText('Default active');
		disabledEl = wrapper.getByText('Disabled');
	});

	it('should render correct Menu and MenuItem based on default props', () => {
		expect(menuEl).toBeTruthy();
		expect(toArray(menuEl.classList)).toContain('menu');
		expect(toArray(menuEl.classList)).toContain('test');
		expect(menuEl.getElementsByTagName('li').length).toBe(3);
		expect(toArray(activeEl.classList)).toContain('menu-item');
		expect(toArray(activeEl.classList)).toContain('active');
		expect(toArray(disabledEl.classList)).toContain('menu-item');
		expect(toArray(disabledEl.classList)).toContain('disabled');
	});

	it('should click items change active and call the onSelect', () => {
		const TestItemEl = wrapper.getByText('Test item');
		expect(toArray(TestItemEl.classList)).not.toContain('active');
		fireEvent.click(TestItemEl);
		expect(toArray(TestItemEl.classList)).toContain('active');
		expect(toArray(activeEl.classList)).not.toContain('active');
		expect(onSelect).toHaveBeenCalledWith(2);
		fireEvent.click(disabledEl);
		expect(toArray(TestItemEl.classList)).toContain('active');
		expect(toArray(disabledEl.classList)).not.toContain('active');
		expect(onSelect).not.toHaveBeenCalledWith(1);
	});

	it('should render vertical mode when mode is set to vertical', () => {
		cleanup();
		wrapper = render(
			generateMenu({
				mode: 'vertical'
			})
		);
		menuEl = wrapper.getByTestId('test-menu');
		expect(toArray(menuEl.classList)).toContain('menu-vertical');
	});
});
