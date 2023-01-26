import React from 'react';
import { classNames } from '../../utils';

type ButtonSize = 'default' | 'lg' | 'sm';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'link';

interface BaseButtonProps {
	className: string;
	disabled: boolean;
	size: ButtonSize;
	variant: ButtonVariant;
	href: string;
	children: React.ReactNode;
}

export type ButtonProps = Partial<
	BaseButtonProps &
		React.AnchorHTMLAttributes<HTMLElement> &
		React.ButtonHTMLAttributes<HTMLElement>
>;

const Button: React.FC<ButtonProps> = ({
	variant,
	size,
	disabled,
	children,
	className,
	...restProps
}) => {
	const classes = classNames('btn', className, {
		[`btn-${variant}`]: variant,
		[`btn-${size}`]: size,
		disabled
	});

	if (variant === 'link') {
		return (
			<a className={classes} {...restProps}>
				{children}
			</a>
		);
	}
	return (
		<button className={classes} disabled={disabled} {...restProps}>
			{children}
		</button>
	);
};

Button.defaultProps = {
	disabled: false
};

export default Button;
