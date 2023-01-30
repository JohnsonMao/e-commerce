import { useEffect, useState } from 'react';

function useDebounce<T = unknown>(value: T, delay = 200) {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);

		return () => clearTimeout(handler);
	}, [value, delay, debounceValue]);

	return debounceValue;
}

export default useDebounce;
