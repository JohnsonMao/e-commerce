import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutoComplete, { DataSourceType } from '../';

const chineseZodiac = [
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

export default {
	title: 'Example/AutoComplete',
	component: AutoComplete
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => (
	<AutoComplete {...args} />
);

export const FetchSuggestions = Template.bind({});
FetchSuggestions.args = {
	fetchSuggestions(str) {
		return chineseZodiac.filter((zodiac) =>
			zodiac.value.toLocaleLowerCase().includes(str.toLocaleLowerCase())
		);
	},
	renderOption(item) {
		const zodiac = item as unknown as DataSourceType<
			typeof chineseZodiac[0]
		>;
		return (
			<>
				<b style={{ margin: '0 .5rem' }}>{zodiac.chineseName}</b>
				<span>{zodiac.value}</span>
			</>
		);
	},
	onSelect: action('select')
};

interface GithubUser {
	login: string;
	avatar_url: string;
}

export const Promise = Template.bind({});
Promise.args = {
	fetchSuggestions(str) {
		return fetch(`https://api.github.com/search/users?q=${str}`)
			.then((res) => res.json())
			.then(({ items }) =>
				Array.isArray(items)
					? items.slice(0, 10).map((item: GithubUser) => ({
							value: item.login,
							...item
					  }))
					: []
			).catch(() => []);
	},
	renderOption(item) {
		const user = item as unknown as DataSourceType<GithubUser>;
		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					height: '2rem',
					padding: '.25rem'
				}}
			>
				<img
					style={{ height: '100%', borderRadius: '50%' }}
					src={user.avatar_url}
					alt={user.value + ' avatar'}
				/>
				<b style={{ margin: '0 .5rem' }}>{user.value}</b>
			</div>
		);
	},
	onSelect: action('select')
};
