import { Mocked } from 'vitest';
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react';
import user from '@testing-library/user-event';
import axios from 'axios';
import Upload from '../';
import { IconProps } from '../../Icon';

/**
 * @vitest-environment jsdom
 */

vi.mock('axios');

const mockedAxios = axios as Mocked<typeof axios>;

vi.mock('../../Icon', () => {
	return {
		default({ icon, onClick }: IconProps) {
			return <svg onClick={onClick}>{icon}</svg>;
		}
	};
});

describe('Test AutoComplete component', () => {
	const successData = 'success';
	const testFile = new File(['test'], 'test.png', { type: 'image/png' });
	const onSuccess = vi.fn();
	const onChange = vi.fn();
	const onError = vi.fn();
	const onProgress = vi.fn();
	const onRemove = vi.fn();
	let wrapper: RenderResult,
		wrapperEl: HTMLElement,
		fileInputEl: HTMLElement,
		uploadAreaEl: HTMLElement;

	const returnUploadFile = expect.objectContaining({
		raw: testFile,
		name: testFile.name,
		size: testFile.size
	});

	const expectSuccessUpload = async () => {
		await waitFor(() => {
			expect(wrapper.queryByText('FaSpinner')).toBeInTheDocument();
			expect(wrapper.queryByText(testFile.name)).toBeInTheDocument();
			expect(wrapper.queryByText('FaCheckCircle')).toBeInTheDocument();
		});
		expect(onSuccess).toBeCalledWith(successData, returnUploadFile);
		expect(onChange).toBeCalledWith(expect.objectContaining([testFile]));
	};
	mockedAxios.post.mockImplementation(() =>
		Promise.resolve({ data: successData })
	);
	beforeEach(() => {
		wrapper = render(
			<Upload
				action="#"
				onSuccess={onSuccess}
				onChange={onChange}
				onError={onError}
				onProgress={onProgress}
				onRemove={onRemove}
				drag
			>
				Click or Drop
			</Upload>
		);

		wrapperEl = wrapper.getByTestId('test-upload');
		fileInputEl = wrapper.container.querySelector(
			'input[type=file]'
		) as HTMLElement;
		uploadAreaEl = wrapper.getByText('Click or Drop');
	});

	it('should render Upload component and correct work', async () => {
		expect(wrapperEl).toBeInTheDocument();
		expect(fileInputEl).not.toBeVisible();
		expect(uploadAreaEl).toBeInTheDocument();
		fireEvent.change(fileInputEl, { target: { files: [testFile] } });
		expectSuccessUpload();
	});

	it('should remove upload file when click FaTimes icon', async () => {
		await user.upload(fileInputEl, testFile);
		expect(wrapper.queryByText('FaTimes')).toBeInTheDocument();
		await user.click(wrapper.getByText('FaTimes'));
		expect(onRemove).toBeCalledWith(returnUploadFile);
	});

	it('should add upload file when drag and drop files', async () => {
		fireEvent.dragOver(uploadAreaEl);
		expect(uploadAreaEl).toHaveClass('is-dragover');
		fireEvent.dragLeave(uploadAreaEl);
		expect(uploadAreaEl).not.toHaveClass('is-dragover');
		fireEvent.drop(uploadAreaEl, {
			dataTransfer: {
				files: [testFile]
			}
		});
		expectSuccessUpload();
	});

	it('should show FaTimesCircle icon when upload reject', async () => {
		const error = Error('Error');

		mockedAxios.post.mockRejectedValueOnce(error);
		await user.upload(fileInputEl, testFile);
		await waitFor(() => {
			expect(wrapper.queryByText('FaTimesCircle')).toBeInTheDocument();
			expect(wrapper.queryByText(testFile.name)).toBeInTheDocument();
		});
		expect(onError).toBeCalledWith(error, returnUploadFile);
	});
});
