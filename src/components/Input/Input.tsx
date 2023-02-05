import React from 'react';
import { classNames, hasOwn } from '../../utils';

type InputSize = 'default' | 'lg' | 'sm';

interface BaseInputProps {
	className: string;
	disabled: boolean;
	size: InputSize;
	prepend: string | React.ReactNode;
	append: string | React.ReactNode;
}

export type InputProps = Partial<
	BaseInputProps & Omit<React.InputHTMLAttributes<HTMLElement>, 'size'>
>;

const Input: React.FC<InputProps> = ({
	size,
	disabled,
	className,
	append,
	prepend,
	style,
	...restProps
}) => {
	// base className
	const baseClass = (str = '') => `input${str}`;

	const classes = classNames(baseClass('-wrapper'), className, {
		[`input-${size}`]: size,
		disabled
	});

	if (hasOwn(restProps, 'value')) {
		delete restProps.defaultValue;
		restProps.value = restProps.value ?? '';
	}

	return (
		<div className={classes} style={style} data-testid="test-input">
			{prepend && <div className={baseClass('-prepend')}>{prepend}</div>}
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
