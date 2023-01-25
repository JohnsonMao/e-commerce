import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react';
import Menu, { MenuProps, MenuItem, SubMenu } from '../';

/**
 * @vitest-environment jsdom
 */
const generateMenu = (props: MenuProps) => (
	<Menu {...props}>
		<MenuItem>Default active</MenuItem>
		<MenuItem disabled>Disabled</MenuItem>
		<MenuItem>Test item</MenuItem>
		<SubMenu title="Dropdown">
			<MenuItem>Dropdown-1</MenuItem>
			<MenuItem>Dropdown-2</MenuItem>
		</SubMenu>
	</Menu>
);

const createStyleFile = () => {
	const style = document.createElement('style');
	style.innerHTML = `
		.sub-menu {
			display: none;
		}
		.opened .sub-menu {
			display: block;
		}
	`;
	return style;
};

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
		wrapper.container.append(createStyleFile());
		menuEl = wrapper.getByTestId('test-menu');
		activeEl = wrapper.getByText('Default active');
		disabledEl = wrapper.getByText('Disabled');
	});

	it('should render correct Menu and MenuItem based on default props', () => {
		expect(menuEl).toBeTruthy();
		expect(menuEl).toHaveClass('menu test');
		expect(menuEl.childNodes.length).toBe(4);
		expect(activeEl).toHaveClass('menu-item active');
		expect(disabledEl).toHaveClass('menu-item disabled');
	});

	it('should click items change active and call the onSelect', () => {
		const TestItemEl = wrapper.getByText('Test item');
		expect(TestItemEl).not.toHaveClass('active');
		fireEvent.click(TestItemEl);
		expect(TestItemEl).toHaveClass('active');
		expect(activeEl).not.toHaveClass('active');
		expect(onSelect).toHaveBeenCalledWith('2');
		fireEvent.click(disabledEl);
		expect(TestItemEl).toHaveClass('active');
		expect(disabledEl).not.toHaveClass('active');
		expect(onSelect).not.toHaveBeenCalledWith('1');
	});

	it('should render vertical mode when mode is set to vertical', () => {
		cleanup();
		wrapper = render(
			generateMenu({
				mode: 'vertical'
			})
		);
		menuEl = wrapper.getByTestId('test-menu');
		expect(menuEl).toHaveClass('menu-vertical');
	});

	it('should show dropdown items when hover on horizontal SubMenu', async () => {
		expect(wrapper.queryByText('Dropdown-1')).not.toBeVisible();
		const dropdownEl = wrapper.getByText('Dropdown');
		fireEvent.mouseEnter(dropdownEl);
		await waitFor(() => {
			expect(wrapper.queryByText('Dropdown-1')).toBeVisible();
		});
		fireEvent.click(wrapper.getByText('Dropdown-1'));
		expect(onSelect).toHaveBeenCalledWith('3-0');
		fireEvent.mouseLeave(dropdownEl);
		await waitFor(() => {
			expect(wrapper.queryByText('Dropdown-1')).not.toBeVisible();
		});
	});

	it('should show dropdown items when click on vertical mode SubMenu', () => {
		cleanup();
		wrapper = render(
			generateMenu({
				mode: 'vertical',
				onSelect
			})
		);
		wrapper.container.append(createStyleFile());
		expect(wrapper.queryByText('Dropdown-2')).not.toBeVisible();
		const dropdownEl = wrapper.getByText('Dropdown');
		fireEvent.click(dropdownEl);
		expect(wrapper.queryByText('Dropdown-2')).toBeVisible();
		fireEvent.click(wrapper.getByText('Dropdown-2'));
		expect(onSelect).toHaveBeenCalledWith('3-1');
		fireEvent.click(dropdownEl);
		expect(wrapper.queryByText('Dropdown-2')).not.toBeVisible();
	})

	it('should show dropdown items default opened on vertical mode SubMenu', () => {
		cleanup();
		wrapper = render(
			generateMenu({
				mode: 'vertical',
				defaultOpenSubMenu: ['3']
			})
		);
		wrapper.container.append(createStyleFile());
		expect(wrapper.queryByText('Dropdown-2')).toBeVisible();
		const dropdownEl = wrapper.getByText('Dropdown');
		fireEvent.click(dropdownEl);
		expect(wrapper.queryByText('Dropdown-2')).not.toBeVisible();
	})
});
