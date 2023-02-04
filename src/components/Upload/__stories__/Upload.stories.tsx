import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Upload from '../';
import Button from '../../Button';
import Icon from '../../Icon';

export default {
	title: 'Example/Upload',
	component: Upload
} as ComponentMeta<typeof Upload>;

const ButtonTemplate: ComponentStory<typeof Upload> = (args) => (
	<Upload {...args}>
		<Button>上傳檔案</Button>
	</Upload>
);
const DropFileTemplate: ComponentStory<typeof Upload> = (args) => (
	<Upload {...args}>
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
				padding: '1.5rem 0 1rem',
				gap: '0.5rem'
			}}
		>
			<Icon icon="FaDownload" size="80" theme='gray' />
			<span style={{ color: 'dark' }}>可以將檔案拖曳至此</span>
		</div>
	</Upload>
);

export const Normal = ButtonTemplate.bind({});
Normal.args = {
	action: 'https://run.mocky.io/v3/7ee8a6db-a999-4dfd-99c4-0784f675fd23',
	multiple: true,
	defaultFileList: [
		{ uid: '1', name: 'File 1', status: 'ready' },
		{ uid: '2', name: 'File 2', status: 'uploading', percent: 50 },
		{ uid: '3', name: 'File 3', status: 'success' },
		{ uid: '4', name: 'File 4', status: 'error' }
	]
};

export const DropFile = DropFileTemplate.bind({});
DropFile.args = {
	action: 'https://run.mocky.io/v3/7ee8a6db-a999-4dfd-99c4-0784f675fd23',
	drag: true,
	defaultFileList: [
		{ uid: '1', name: 'File 1', status: 'ready' },
		{ uid: '2', name: 'File 2', status: 'uploading', percent: 50 },
		{ uid: '3', name: 'File 3', status: 'success' },
		{ uid: '4', name: 'File 4', status: 'error' }
	]
};
