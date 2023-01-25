import { render } from '@testing-library/react';
import Button from '../';

/**
 * @vitest-environment jsdom
 */

describe('Test Button component', () => {
	it('should render the default button component', () => {
		const btnText = 'Hello world';
		const wrapper = render(<Button>{btnText}</Button>);
		const btn = wrapper.baseElement.children[0].children[0];

		expect(btn).toBeVisible();
		expect(btn.innerHTML).toBe(btnText);
		expect(btn).toHaveClass('btn');
		expect(btn.tagName).toBe('BUTTON');
	});

	it('should render the primary large button component and className test', () => {
		const btnText = 'Primary Button';
		const wrapper = render(
			<Button variant="primary" size="lg" className="test">
				{btnText}
			</Button>
		);
		const btn = wrapper.baseElement.children[0].children[0];

		expect(btn.innerHTML).toBe(btnText);
		expect(btn).toHaveClass('btn btn-primary btn-lg test');
	});

	it('should render the link button component', () => {
		const btnText = "I'm link";
		const href = '#';
		const wrapper = render(
			<Button variant="link" href={href}>
				{btnText}
			</Button>
		);
		const btn = wrapper.baseElement.children[0].children[0];

		expect(btn.innerHTML).toBe(btnText);
		expect(btn.tagName).toBe('A');
		expect(btn.getAttribute('href')).toBe(href);
		expect(btn).toHaveClass('btn btn-link');
	});

	it('should render the secondary small button component and disabled is true', () => {
		const btnText = "I'm disable";
		const wrapper = render(
			<Button variant="secondary" size="sm" disabled={true}>
				{btnText}
			</Button>
		);
		const btn = wrapper.baseElement.children[0].children[0];

		expect(btn.innerHTML).toBe(btnText);
		expect(btn).toBeDisabled();
		expect(btn).toHaveClass('btn btn-secondary btn-sm disabled');
	});
});
