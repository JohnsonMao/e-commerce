import React, { ChangeEvent, useState } from 'react';
import Input, { InputProps } from './Input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	fetchSuggestions: (str: string) => string[];
	onSelect?: (item: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
	fetchSuggestions,
	onSelect,
	value,
	...restProps
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [suggestions, setSuggestions] = useState<string[]>([]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value.trim();

		setInputValue(v);
		if (v) {
			const result = fetchSuggestions(v);

			setSuggestions(result);
		} else {
			setSuggestions([]);
		}
	};

	const handleSelect = (item: string) => {
		setInputValue(item);
		setSuggestions([]);
		if (onSelect) onSelect(item);
	};

	const generateDropdown = () => (
		<ul>
			{suggestions.map((item, index) => (
				<li key={index} onClick={() => handleSelect(item)}>
					{item}
				</li>
			))}
		</ul>
	);

	return (
		<div className="auto-complete">
			<Input value={inputValue} onChange={handleChange} {...restProps} />
			{suggestions.length > 0 && generateDropdown()}
		</div>
	);
};

export default AutoComplete;
