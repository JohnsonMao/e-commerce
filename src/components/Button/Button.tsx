import React from 'react';
import { classNames } from '../../utils';

export enum ButtonSize {
	Default = 'default',
	Large = 'lg',
	Small = 'sm'
}

export enum ButtonVariant {
	Primary = 'primary',
	Secondary = 'secondary',
	Danger = 'danger',
	Link = 'link'
}

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

const Button: React.FC<ButtonProps> = (props) => {
	const { variant, size, disabled, children, className, ...restProps } =
		props;

	const classes = classNames('btn', className, {
		[`btn-${variant}`]: variant,
		[`btn-${size}`]: size,
		disabled
	});

	if (variant === ButtonVariant.Link) {
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
	disabled: false,
	variant: ButtonVariant.Primary
};

export default Button;
