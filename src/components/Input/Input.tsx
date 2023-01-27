import React from 'react';
import { classNames } from '../../utils';

type InputSize = 'default' | 'lg' | 'sm';

interface BaseInputProps {
	className: string;
	disabled: boolean;
	size: InputSize;
	prepand: string | React.ReactNode;
	append: string | React.ReactNode;
	onChange: (e: HTMLInputElement) => void;
}

export type InputProps = Partial<
	BaseInputProps & Omit<React.InputHTMLAttributes<HTMLElement>, 'size'>
>;

const Input: React.FC<InputProps> = ({
	size,
	disabled,
	className,
	append,
	prepand,
	style,
	...restProps
}) => {
	// base className
	const baseClass = (str = '') => `input${str}`;

	const classes = classNames(baseClass('-wrapper'), className, {
		[`input-${size}`]: size,
		'input-group': prepand || append,
		disabled
	});

	if (Object.hasOwn(restProps, 'value')) {
		delete restProps.defaultValue;
		restProps.value = restProps.value ?? ''
	}

	return (
		<div className={classes} style={style}>
			{prepand && <div className={baseClass('-prepand')}>{prepand}</div>}
			<input
				className={baseClass('-inner')}
				disabled={disabled}
				{...restProps}
			/>
			{append && <div className={baseClass('-append')}>{append}</div>}
		</div>
	);
};

Input.defaultProps = {
	disabled: false
};

export default Input;
