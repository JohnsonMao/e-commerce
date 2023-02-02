import { useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';
import UploadList from './UploadList';
import Button from '../Button';

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

export interface UploadFile {
	uid: string;
	name: string;
	size?: number;
	status?: UploadFileStatus;
	percent?: number;
	raw?: File;
	response?: unknown;
	error?: Error;
}

export interface UploadProps<T> {
	action: string;
	label?: string;
	defaultFileList?: UploadFile[];
	beforeUpload?: (file: File) => boolean | Promise<File>;
	onProgress?: (percentage: number, file: File) => void;
	onSuccess?: (data: T, file: File) => void;
	onError?: (error: Error, file: File) => void;
	onChange?: (files: FileList | null) => void;
	onRemove?: (file: UploadFile) => void;
}

function Upload<T = unknown>(props: UploadProps<T>) {
	const {
		action,
		label,
		defaultFileList,
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

	const post = (file: File) => {
		const formData = new FormData();
		const _file: UploadFile = {
			uid: `upload-${Date.now()}-${Math.round(Math.random() * 1000)}`,
			name: file.name,
			size: file.size,
			status: 'ready',
			percent: 0,
			raw: file
		};

		setFileList([_file, ...fileList]);
		formData.append(file.name, file);

		// fetch(action, {
		// 	method: 'POST',
		// 	body: formData
		// })
		// 	.then((res) => res.json())
		// 	.then((data) => console.log(data));

		axios
			.post(action, formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress: (e) => {
					const percentage = Math.round(
						(e.loaded / (e.total || 1)) * 100
					);
					if (percentage < 100) {
						updateFileList(_file, {
							percent: percentage,
							status: 'uploading'
						});

						if (onProgress) onProgress(percentage, file);
					}
				}
			})
			.then((res) => {
				updateFileList(_file, {
					status: 'success',
					response: res.data
				});
				if (onSuccess) onSuccess(res.data, file);
			})
			.catch((error: Error) => {
				updateFileList(_file, {
					status: 'error',
					error
				});
				if (onError) onError(error, file);
			});
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
		<div className={baseClass('-wrapper')} data-testid="test-upload">
			<Button onClick={handleClick}>{label}</Button>
			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				className={baseClass('-input')}
			/>
			<UploadList fileList={fileList} onRemove={handleRemove} />
		</div>
	);
}

Upload.defaultProps = {
	label: '上傳檔案'
};

export default Upload;
