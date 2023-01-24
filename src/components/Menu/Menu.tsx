import React, { createContext, useState } from 'react';
import { classNames } from '../../utils';
import { MenuItemProps } from './MenuItem';

export type SelectCallback = (selectIndex: string) => void;

interface IMenuContext {
	index: string;
	mode?: MenuMode;
	defaultOpenSubMenu?: string[];
	onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
	defaultIndex?: string;
	className?: string;
	mode?: MenuMode;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	defaultOpenSubMenu?: string[];
	onSelect?: SelectCallback;
}

const Menu: React.FC<MenuProps> = ({
	mode,
	defaultIndex,
	className,
	style,
	children,
	defaultOpenSubMenu,
	onSelect
}) => {
	const [currentActive, setActive] = useState(defaultIndex);
	const classes = classNames('menu', className, [
		mode === 'vertical' ? 'menu-vertical' : 'menu-horizontal'
	]);
	const handleClick = (index: string) => {
		setActive(index);
		if (typeof onSelect === 'function') onSelect(index);
	};
	const menuContext: IMenuContext = {
		index: currentActive ?? '0',
		mode,
		defaultOpenSubMenu,
		onSelect: handleClick
	};

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const el = child as React.FunctionComponentElement<MenuItemProps>;
			const passedName = ['MenuItem', 'SubMenu'];

			if (passedName.includes(el.type.displayName || '')) {
				return React.cloneElement(el, { index: index.toString() });
			} else {
				console.error(
					'Warning: Menu has a child which is not a MenuItem component.'
				);
			}
		});
	};

	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={menuContext}>
				{renderChildren()}
			</MenuContext.Provider>
		</ul>
	);
};

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
	defaultOpenSubMenu: []
};

export default Menu;
