import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Upload from '../';

export default {
	title: 'Example/Upload',
	component: Upload
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = (args) => <Upload {...args} />;

export const Vartant = Template.bind({});
Vartant.args = {
	action: 'http://jsonplaceholder.typicode.com/posts',
	defaultFileList: [
		{ uid: '1', name: 'File 1', status: 'ready' },
		{ uid: '2', name: 'File 2', status: 'uploading' },
		{ uid: '3', name: 'File 3', status: 'success' },
		{ uid: '4', name: 'File 4', status: 'error' }
	]
};
