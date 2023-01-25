import React, { useState, useContext } from 'react';
import { classNames } from '../../utils';
import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Icon from '../Icon';

export interface SubMenuProps {
	index?: string;
	title: string;
	className?: string;
	children?: React.ReactNode;
}

const SubMenu: React.FC<SubMenuProps> = ({
	index,
	title,
	className,
	children
}) => {
	const context = useContext(MenuContext);
	const isOpen =
		context.mode === 'vertical' &&
		!!context.defaultOpenSubMenu?.includes(index || '');
	const [subMenuOpen, setSubMenuOpen] = useState(isOpen);
	const classes = classNames('menu-item sub-menu-item', className, {
		active: context.index === index,
		opened: subMenuOpen
	});
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setSubMenuOpen(!subMenuOpen);
	};
	const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
		e.preventDefault();
		setSubMenuOpen(toggle);
	};
	const clickEvent =
		context.mode === 'vertical'
			? {
					onClick: handleClick
			  }
			: {};
	const mouseEvent =
		context.mode !== 'vertical'
			? {
					onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
					onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
			  }
			: {};
	const renderChildren = () => {
		const childrenEl = React.Children.map(children, (child, i) => {
			const el = child as React.FunctionComponentElement<MenuItemProps>;

			if (el.type.displayName === 'MenuItem') {
				return React.cloneElement(el, {
					index: `${index}-${i}`
				});
			} else {
				console.error(
					'Warning: SubMenu has a child which is not a MenuItem component.'
				);
			}
		});

		return <ul className="sub-menu">{childrenEl}</ul>;
	};

	return (
		<li className={classes} {...mouseEvent}>
			<div className="sub-menu-title" {...clickEvent}>
				{title}
				<Icon
					icon="FaAngleDown"
					className="sub-menu-title-arrow-icon"
				/>
			</div>
			{renderChildren()}
		</li>
	);
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
