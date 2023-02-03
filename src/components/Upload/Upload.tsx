import { useRef, ChangeEvent, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import UploadList from './UploadList';
import Dragger from './Dragger';
import Progress from '../Progress';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
	uid: string;
	name: string;
	size?: number;
	status?: UploadFileStatus;
	percent?: number;
	raw?: File;
	response?: unknown;
	error?: unknown;
}

export interface UploadProps<T> {
	action: string;
	name?: string;
	accept?: string;
	multiple?: boolean;
	drag?: boolean;
	data?: Record<string, string | Blob>;
	children: React.ReactNode;
	headers?: AxiosRequestConfig<FormData>['headers'];
	withCredentials?: boolean;
	className?: string;
	defaultFileList?: UploadFile[];
	beforeUpload?: (file: File) => boolean | Promise<File>;
	onProgress?: (percentage: number, file: UploadFile) => void;
	onSuccess?: (data: T, file: UploadFile) => void;
	onError?: (error: unknown, file: UploadFile) => void;
	onChange?: (files: FileList | null) => void;
	onRemove?: (file: UploadFile) => void;
}

function Upload<T = unknown>(props: UploadProps<T>) {
	const {
		action,
		accept,
		multiple,
		name,
		data,
		drag,
		headers,
		withCredentials,
		defaultFileList,
		className,
		children,
		beforeUpload,
		onProgress,
		onSuccess,
		onError,
		onChange,
		onRemove
	} = props;

	const [fileList, setFileList] = useState<UploadFile[]>(
		defaultFileList || []
	);
	const updateFileList = (
		updateFile: UploadFile,
		updateObject: Partial<UploadFile>
	) => {
		setFileList((preList) =>
			preList.map((file) => {
				if (file.uid !== updateFile.uid) return file;
				return { ...file, ...updateObject };
			})
		);
	};

	const fileInputRef = useRef<HTMLInputElement>(null);
	const baseClass = (str = '') => `upload${str}`;
	const handleClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const post = async (file: File) => {
		const formData = new FormData();
		const _file: UploadFile = {
			uid: `upload-${Date.now()}-${Math.round(Math.random() * 1000)}`,
			name: file.name,
			size: file.size,
			status: 'ready',
			percent: 0,
			raw: file
		};

		setFileList((preList) => [_file, ...preList]);
		formData.append(name || 'file', file);

		if (data) {
			Object.keys(data).forEach((key) => {
				formData.append(key, data[key]);
			});
		}

		try {
			const response = await axios.post(action, formData, {
				headers: {
					...headers,
					'Content-Type': 'multipart/form-data'
				},
				withCredentials,
				onUploadProgress: (e) => {
					const percentage = Math.round(
						(e.loaded / (e.total || 1)) * 100
					);
					console.log(e);
					if (percentage < 100) {
						updateFileList(_file, {
							percent: percentage,
							status: 'uploading'
						});

						if (onProgress) onProgress(percentage, _file);
					}
				}
			});

			updateFileList(_file, {
				status: 'success',
				percent: 100,
				response: response.data
			});
			if (onSuccess) onSuccess(response.data, _file);
		} catch (error) {
			console.error(error);
			updateFileList(_file, {
				status: 'error',
				percent: 0,
				error
			});
			if (onError) onError(error, _file);
		}
	};

	const uploadFile = (files: FileList) => {
		const postFiles = Array.from(files);

		postFiles.forEach((file) => {
			if (!beforeUpload) {
				post(file);
			} else {
				const result = beforeUpload(file);

				if (result && result instanceof Promise) {
					result.then((processedFile) => {
						post(processedFile);
					});
				} else if (result) {
					post(file);
				}
			}
		});
	};

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;

		if (onChange) onChange(files);
		if (!files) return;

		uploadFile(files);

		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	};

	const handleRemove = (file: UploadFile) => {
		setFileList((preList) =>
			preList.filter((item) => item.uid !== file.uid)
		);
		if (onRemove) onRemove(file);
	};

	return (
		<div className={className} data-testid="test-upload">
			<div className={baseClass('-action')} onClick={handleClick}>
				{drag ? (
					<Dragger onFile={uploadFile}>{children}</Dragger>
				) : (
					children
				)}
				<input
					type="file"
					ref={fileInputRef}
					onChange={handleFileChange}
					className={baseClass('-input')}
					accept={accept}
					multiple={multiple}
				/>
			</div>
			<UploadList fileList={fileList} onRemove={handleRemove} />
		</div>
	);
}

Upload.defaultProps = {
	name: 'file'
};

export default Upload;
