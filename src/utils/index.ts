export const isObject = (thing: unknown): thing is Record<string, unknown> => {
	return typeof thing === 'object' && thing != null && !Array.isArray(thing);
};

export const hasOwn = (obj: Record<string, unknown>, key: string) => {
	return Object.prototype.hasOwnProperty.call(obj, key);
}

export const classNames = (...rest: unknown[]) => {
	return rest
		.reduce((r: string[], c) => {
			if (typeof c === 'string') {
				return r.concat(c);
			}
			if (Array.isArray(c)) {
				return r.concat(c.filter(Boolean));
			}
			if (isObject(c)) {
				return r.concat(Object.keys(c).flatMap((k) => (c[k] ? k : [])));
			}
			return r;
		}, [])
		.join(' ');
};
