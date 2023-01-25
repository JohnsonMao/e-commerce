import React from 'react';
import { classNames } from '../../utils';
import { IconBaseProps } from 'react-icons/lib';
import { FaAngleDown } from 'react-icons/fa';

export type ThemeProps =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'dark'
	| 'light';

const IconType = { FaAngleDown };

export interface IconProps extends IconBaseProps {
    icon: keyof typeof IconType;
	theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = ({ icon, className, theme, ...restProps }) => {
	const classes = classNames('icon', className, {
		[`icon-${theme}`]: theme
	});
    const Icon = IconType[icon];

	return <Icon className={classes} {...restProps} />;
};

export default Icon;
