import React, { ChangeEvent, useState } from 'react';
import Input, { InputProps } from '../Input';
import Icon from '../Icon';

interface DataSourceObject {
	value: string;
}

export type DataSourceType<T = Record<string, unknown>> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	data?: DataSourceType[];
	fetchSuggestions: (
		str: string,
		data: DataSourceType[]
	) => DataSourceType[] | Promise<DataSourceType[]>;
	onSelect?: (item: DataSourceType) => void;
	renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
	data,
	value,
	renderOption,
	fetchSuggestions,
	onSelect,
	...restProps
}) => {
	const [inputValue, setInputValue] = useState(value);
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value.trim();

		setInputValue(v);
		if (v) {
			const result = fetchSuggestions(v, data || []);

			if (result instanceof Promise) {
				setLoading(true);
				result.then((data) => {
					setLoading(false);
					setSuggestions(data);
				});
			} else {
				setSuggestions(result);
			}
		} else {
			setSuggestions([]);
		}
	};

	const handleSelect = (item: DataSourceType) => {
		setInputValue(item.value);
		setSuggestions([]);
		if (onSelect) onSelect(item);
	};

	const renderTemplate = (item: DataSourceType) => (
		<>{renderOption ? renderOption(item) : item.value}</>
	);

	const generateDropdown = () => (
		<ul>
			{suggestions.map((item, index) => (
				<li key={index} onClick={() => handleSelect(item)}>
					{renderTemplate(item)}
				</li>
			))}
		</ul>
	);

	return (
		<div className="auto-complete">
			<Input value={inputValue} onChange={handleChange} {...restProps} />
			{loading && (
				<div>
					<Icon icon="FaSpinner" theme="primary" spin />
				</div>
			)}
			{suggestions.length > 0 && generateDropdown()}
		</div>
	);
};

export default AutoComplete;
