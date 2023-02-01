export const chineseZodiac = [
	{ value: 'Rat', chineseName: '鼠' },
	{ value: 'Ox', chineseName: '牛' },
	{ value: 'Tiger', chineseName: '虎' },
	{ value: 'Rabbit', chineseName: '兔' },
	{ value: 'Dragon', chineseName: '龍' },
	{ value: 'Snake', chineseName: '蛇' },
	{ value: 'Horse', chineseName: '馬' },
	{ value: 'Goat', chineseName: '羊' },
	{ value: 'Monkey', chineseName: '猴' },
	{ value: 'Rooster', chineseName: '雞' },
	{ value: 'Dog', chineseName: '狗' },
	{ value: 'Pig', chineseName: '豬' }
];

export type IChineseZodiac = typeof chineseZodiac[0];
export type IGithubUser = {
	login: string;
	avatar_url: string;
};

export function testFetchSuggestions(str: string) {
	return chineseZodiac.filter((zodiac) =>
		zodiac.value.toLowerCase().includes(str.toLowerCase())
	);
}
export function testAsyncFetchSuggestions(str: string) {
	return fetch(`https://api.github.com/search/users?q=${str}`)
		.then((res) => res.json())
		.then(({ items }) =>
			Array.isArray(items)
				? items.slice(0, 10).map((item: IGithubUser) => ({
						value: item.login,
						...item
				  }))
				: []
		)
		.catch(() => []);
}
