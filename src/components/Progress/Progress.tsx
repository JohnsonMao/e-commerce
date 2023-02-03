import React from 'react';
import { ThemeProps } from '../Icon';

export interface ProgressProps {
	percent: number;
	strokeHeight?: number;
	showText?: boolean;
	styles?: React.CSSProperties;
	theme?: ThemeProps;
}

const Progress: React.FC<ProgressProps> = (props) => {
	const { percent, strokeHeight, showText, styles, theme } = props;
	const baseClass = (str = '') => `progress-bar${str}`;

	return (
		<div className={baseClass()} style={styles}>
			<div
				className={baseClass('__outer')}
				style={{ height: `${strokeHeight}px` }}
			>
				<div
					className={`${baseClass('__inner')} bg-${theme}`}
					style={{ width: `${percent}%` }}
				></div>
				{showText && (
					<span
						className={baseClass('__text')}
						style={{
							fontSize: `${(strokeHeight || 16) * 0.75}px`
						}}
					>{`${percent}%`}</span>
				)}
			</div>
		</div>
	);
};

Progress.defaultProps = {
	strokeHeight: 16,
	showText: true,
	theme: 'primary'
};

export default Progress;
