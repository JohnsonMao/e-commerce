import React from 'react';
import { UploadFile } from './Upload';
import Icon from '../Icon';
import Progress from '../Progress';

export interface UploadListProps {
	fileList: UploadFile[];
	onRemove: (file: UploadFile) => void;
}

const UploadList: React.FC<UploadListProps> = (props) => {
	const { fileList, onRemove } = props;

	const baseClass = (...str: string[]) =>
		str.map((s) => `upload-list${s}`).join(' ');

	return (
		<ul className={baseClass()}>
			{fileList.map((item) => (
				<li key={item.uid}>
					<div className={baseClass('__wrapper')}>
						<span
							className={baseClass(
								'__wrapper__name',
								`__wrapper__name--${item.status}`
							)}
						>
							<Icon
								icon="FaFileAlt"
								theme={
									item.status === 'error' ? 'danger' : 'secondary'
								}
							/>
							{item.name}
						</span>
						<span className={baseClass('__wrapper__status')}>
							{item.status === 'uploading' && (
								<Icon icon="FaSpinner" theme="primary" spin />
							)}
							{item.status === 'success' && (
								<Icon icon="FaCheckCircle" theme="success" />
							)}
							{item.status === 'error' && (
								<Icon icon="FaTimesCircle" theme="danger" />
							)}
						</span>
						<span className={baseClass('__wrapper__action')}>
							<Icon icon="FaTimes" onClick={() => onRemove(item)} />
						</span>
					</div>
					{item.status === 'uploading' && (
						<Progress percent={item.percent || 0} />
					)}
				</li>
			))}
		</ul>
	);
};

export default UploadList;
