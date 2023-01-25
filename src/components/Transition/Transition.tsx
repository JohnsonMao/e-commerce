import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

type AnimationName = 'zoom-in-top';

export type TransitionProps = {
	animationName?: AnimationName;
	wrapper?: boolean;
} & CSSTransitionProps;

const Transition: React.FC<TransitionProps> = ({
	animationName,
	classNames,
	children,
	wrapper,
	...restProps
}) => {
	return (
		<CSSTransition classNames={classNames ?? animationName} {...restProps}>
			{wrapper ? (
				<div>{React.isValidElement(children) && children}</div>
			) : (
				children
			)}
		</CSSTransition>
	);
};

Transition.defaultProps = {
	unmountOnExit: true
};

export default Transition;
