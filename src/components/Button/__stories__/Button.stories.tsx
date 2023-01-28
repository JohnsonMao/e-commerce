import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../';

export default {
	title: 'Example/Button',
	component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Vartant = Template.bind({});
Vartant.args = {
    children: 'Button',
    onClick: action('click')
};

export const Size = Template.bind({});
Size.args = {
	size: 'sm',
    children: 'Button',
    onClick: action('click')
};
