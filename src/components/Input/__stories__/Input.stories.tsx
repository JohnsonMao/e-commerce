import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../';

export default {
	title: 'Example/Input',
	component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Type = Template.bind({});
Type.args = {
    prepend: 'Google',
    append: '.com'
};

export const Size = Template.bind({});
Size.args = {
    size: 'sm',
    prepend: '$'
};
