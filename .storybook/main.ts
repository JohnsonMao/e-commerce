import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
    stories: [
		'../src/**/*.stories.mdx',
		'../src/**/*.stories.@(js|jsx|ts|tsx)'
	],

    addons: [
        '@storybook/preset-scss',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-mdx-gfm'
    ],

    framework: {
        name: '@storybook/react-vite',
        options: {}
    },

    core: {},

    features: {
		storyStoreV7: true
	},

    async viteFinal(config, { configType }) {
		return mergeConfig(config, {
      optimizeDeps: {
        include: ['storybook-dark-mode'],
      },
		});
	},
};

export default config;
