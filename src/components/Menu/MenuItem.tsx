import React, { useContext } from 'react';
import { classNames } from '../../utils';
import { MenuContext } from './Menu';

export interface MenuItemProps {
	index?: number;
	disabled?: boolean;
	className?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	onSelect?: (selectIndex: number) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
	index,
	disabled,
	className,
	style,
	children
}) => {
	const context = useContext(MenuContext);
	const classes = classNames('menu-item', className, {
		disabled,
		active: context.index === index
	});
	const handleClick = () => {
		if (context.onSelect && !disabled && typeof index === 'number') {
			context.onSelect(index);
		}
	};
	return (
		<li className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	);
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;
