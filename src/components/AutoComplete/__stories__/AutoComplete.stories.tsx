import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import AutoComplete, { DataSourceType } from '../';
import {
	IChineseZodiac,
	IGithubUser,
	testFetchSuggestions,
	testAsyncFetchSuggestions
} from '../__tests__/autoComplete.test';

export default {
	title: 'Example/AutoComplete',
	component: AutoComplete
} as ComponentMeta<typeof AutoComplete>;

const FetchSuggestionsTemplate: ComponentStory<
	typeof AutoComplete<IChineseZodiac>
> = (args) => (
	<AutoComplete {...args} />
);

export const FetchSuggestions = FetchSuggestionsTemplate.bind({});
FetchSuggestions.args = {
	fetchSuggestions(str) {
		return testFetchSuggestions(str);
	},
	renderOption(item) {
		return (
			<>
				<b style={{ margin: '0 .5rem' }}>{item.chineseName}</b>
				<span>{item.value}</span>
			</>
		);
	},
	onSelect: action('select')
};

const AsyncFetchTemplate: ComponentStory<
	typeof AutoComplete<IGithubUser & DataSourceType>
> = (args) => (
	<AutoComplete {...args} />
);
export const AsyncFetch = AsyncFetchTemplate.bind({});
AsyncFetch.args = {
	fetchSuggestions(str) {
		return testAsyncFetchSuggestions(str);
	},
	renderOption(item) {
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
					src={item.avatar_url}
					alt={item.value + ' avatar'}
				/>
				<b style={{ margin: '0 .5rem' }}>{item.value}</b>
			</div>
		);
	},
	onSelect: action('select')
};
