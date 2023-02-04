var r=Object.defineProperty;var o=(n,p)=>r(n,"name",{value:p,configurable:!0});import{I as e}from"./index-ba916d5e.js";import{j as s}from"./jsx-runtime-69008c6b.js";import"./index-2da6b115.js";import"./index-a38f3d31.js";import"./es.object.get-own-property-descriptor-d261b708.js";const I={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Input from '../';

export default {
	title: 'Example/Input',
	component: Input
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Type = Template.bind({});
Type.args = {
    type: 'number',
    prepend: '$'
};

export const Size = Template.bind({});
Size.args = {
    size: 'sm',
    prepend: 'Google',
    append: '.com'
};
`,locationsMap:{type:{startLoc:{col:47,line:11},endLoc:{col:76,line:11},startBody:{col:47,line:11},endBody:{col:76,line:11}},size:{startLoc:{col:47,line:11},endLoc:{col:76,line:11},startBody:{col:47,line:11},endBody:{col:76,line:11}}}}},title:"Example/Input",component:e},t=o(n=>s(e,{...n}),"Template"),a=t.bind({});a.args={type:"number",prepend:"$"};const i=t.bind({});i.args={size:"sm",prepend:"Google",append:".com"};const f=["Type","Size"];export{i as Size,a as Type,f as __namedExportsOrder,I as default};
//# sourceMappingURL=Input.stories-6f2f48d6.js.map
