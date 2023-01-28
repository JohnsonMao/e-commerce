import React from 'react';
import { classNames } from '../../utils';
import { IconBaseProps } from 'react-icons/lib';
import * as FA from 'react-icons/fa';

export type ThemeProps =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'dark'
	| 'light';

const Icons = FA;

export type IconType = keyof typeof Icons;

export interface IconProps extends IconBaseProps {
    icon: IconType;
	theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = ({ icon, className, theme, ...restProps }) => {
	const classes = classNames('icon', className, {
		[`icon-${theme}`]: theme
	});
    const Icon = Icons[icon];

	return <Icon className={classes} {...restProps} />;
};

export default Icon;
