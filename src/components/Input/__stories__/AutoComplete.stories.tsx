import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { AutoComplete } from '../';

export default {
	title: 'Example/AutoComplete',
	component: AutoComplete
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
	<AutoComplete {...args} />
);

export const Type = Template.bind({});
Type.args = {};

export const Size = Template.bind({});
Size.args = {};
