import React, { createContext, useState } from 'react';
import { classNames } from '../../utils';
import { MenuItemProps } from './MenuItem';

type SelectFunction = (selectIndex: number) => void;

interface IMenuContext {
	index: number;
	onSelect?: SelectFunction;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

type MenuMode = 'horizontal' | 'vertical';

export interface MenuProps {
	defaultIndex?: number;
	className?: string;
	mode?: MenuMode;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	onSelect?: SelectFunction;
}

const Menu: React.FC<MenuProps> = ({
	mode,
	defaultIndex,
	className,
	style,
	children,
	onSelect
}) => {
	const [currentActive, setActive] = useState(defaultIndex);
	const classes = classNames('menu', className, {
		'menu-vertical': mode === 'vertical'
	});
	const handleClick = (index: number) => {
		setActive(index);
		if (typeof onSelect === 'function') onSelect(index);
	};
	const menuContext: IMenuContext = {
		index: currentActive ?? 0,
		onSelect: handleClick
	};

	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const el = child as React.FunctionComponentElement<MenuItemProps>;

			if (el.type.displayName === 'MenuItem') {
				return React.cloneElement(el, { index });
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
	defaultIndex: 0,
	mode: 'horizontal'
};

export default Menu;
