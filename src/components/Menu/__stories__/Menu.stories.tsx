import { ComponentStory, ComponentMeta } from '@storybook/react';

import Menu, { MenuItem, SubMenu } from '../';

export default {
	title: 'Example/Menu',
	component: Menu
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
	<Menu {...args}>
		<MenuItem>Menu 1</MenuItem>
		<MenuItem>Menu 2</MenuItem>
		<SubMenu title="Menu 3">
			<MenuItem>Menu 3-1</MenuItem>
			<MenuItem>Menu 3-2</MenuItem>
		</SubMenu>
		<MenuItem disabled>Menu 4</MenuItem>
	</Menu>
);

export const HorizontalMenu = Template.bind({});
HorizontalMenu.args = {};

export const VerticalMenu = Template.bind({});
VerticalMenu.args = {
	mode: 'vertical'
};
