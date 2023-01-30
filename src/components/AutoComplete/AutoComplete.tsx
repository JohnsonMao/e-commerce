import React, {
	useState,
	useEffect,
	ChangeEvent,
	KeyboardEvent,
	useRef
} from 'react';
import Input, { InputProps } from '../Input';
import Icon from '../Icon';
import { useDebounce, useClickOutside } from '../../hooks';
import { classNames } from '../../utils';
import Transition from '../Transition';

interface DataSourceObject {
	value: string;
}

export type DataSourceType<T = Record<string, unknown>> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
	fetchSuggestions: (
		str: string
	) => DataSourceType[] | Promise<DataSourceType[]>;
	onSelect?: (item: DataSourceType) => void;
	renderOption?: (item: DataSourceType) => React.ReactElement;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
	value,
	renderOption,
	fetchSuggestions,
	onSelect,
	...restProps
}) => {
	const [inputValue, setInputValue] = useState(value as string);
	const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
	const [loading, setLoading] = useState(false);
	const [highlightIndex, setHightlightIndex] = useState(-1);
	const isPromise = useRef(true);
	const debounceValue = useDebounce(inputValue, isPromise.current ? 200 : 0);
	const triggerSearch = useRef(false);
	const componentRef = useRef<HTMLDivElement>(null);
	const nodeRef = useRef(null);

	useClickOutside(componentRef, () => setSuggestions([]));

	useEffect(() => {
		if (debounceValue && triggerSearch.current) {
			const result = fetchSuggestions(debounceValue);

			isPromise.current = result instanceof Promise;
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
		setHightlightIndex(-1);
	}, [debounceValue, fetchSuggestions]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		triggerSearch.current = true;
		setInputValue(e.target.value.trim());
	};

	const highlight = (index: number) => {
		if (index < 0) index = 0;
		if (index >= suggestions.length) index = suggestions.length - 1;
		setHightlightIndex(index);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.key) {
			case 'ArrowUp':
				e.preventDefault();
				highlight(highlightIndex - 1);
				break;
			case 'ArrowDown':
				e.preventDefault();
				highlight(highlightIndex + 1);
				break;
			case 'Escape':
				setSuggestions([]);
				break;
			case 'Enter':
				if (suggestions[highlightIndex]) {
					handleSelect(suggestions[highlightIndex]);
				}
				break;
			default:
		}
	};

	const handleSelect = (item: DataSourceType) => {
		triggerSearch.current = false;
		setInputValue(item.value);
		setSuggestions([]);
		if (onSelect) onSelect(item);
	};

	const handleMouseMove = () => {
		setHightlightIndex(-1);
	};

	const renderTemplate = (item: DataSourceType) => (
		<>{renderOption ? renderOption(item) : item.value}</>
	);

	const generateDropdown = () =>
		suggestions.map((item, index) => {
			const classes = classNames('ac__suggestion__item', {
				'ac__suggestion__item-hightlighted': index === highlightIndex
			});
			return (
				<li
					key={index}
					className={classes}
					onClick={() => handleSelect(item)}
				>
					{renderTemplate(item)}
				</li>
			);
		});

	return (
		<div className="ac" ref={componentRef}>
			<Input
				className="ac__input"
				value={inputValue}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				{...restProps}
			/>
			<Transition
				nodeRef={nodeRef}
				in={suggestions.length > 0}
				timeout={300}
				animationName="zoom-in-top"
			>
				<ul
					ref={nodeRef}
					className="ac__suggestion"
					onMouseMove={handleMouseMove}
				>
					{loading ? (
						<li className="ac__suggestion__loading">
							<Icon icon="FaSpinner" theme="primary" spin />
						</li>
					) : (
						generateDropdown()
					)}
				</ul>
			</Transition>
		</div>
	);
};

export default AutoComplete;
