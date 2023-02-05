var a=Object.defineProperty;var o=(t,i)=>a(t,"name",{value:i,configurable:!0});import{a as n}from"./index-06ba0146.js";import{B as e}from"./index-ffca8f08.js";import{j as c}from"./jsx-runtime-69008c6b.js";import"./es.object.get-own-property-descriptor-d261b708.js";import"./iframe-0bdcdd7a.js";import"./web.url.constructor-d5d56621.js";import"./es.number.is-integer-1cb564d8.js";import"./make-decorator-3cd8a5d0.js";import"./index-9ad99e66.js";import"./index-a38f3d31.js";const S={parameters:{storySource:{source:`import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button from '../';

export default {
	title: 'Example/Button',
	component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Vartant = Template.bind({});
Vartant.args = {
    children: 'Button',
    onClick: action('click')
};

export const Size = Template.bind({});
Size.args = {
	size: 'sm',
    children: 'Button',
    onClick: action('click')
};
`,locationsMap:{vartant:{startLoc:{col:48,line:11},endLoc:{col:78,line:11},startBody:{col:48,line:11},endBody:{col:78,line:11}},size:{startLoc:{col:48,line:11},endLoc:{col:78,line:11},startBody:{col:48,line:11},endBody:{col:78,line:11}}}}},title:"Example/Button",component:e},r=o(t=>c(e,{...t}),"Template"),l=r.bind({});l.args={children:"Button",onClick:n("click")};const s=r.bind({});s.args={size:"sm",children:"Button",onClick:n("click")};const b=["Vartant","Size"];export{s as Size,l as Vartant,b as __namedExportsOrder,S as default};
//# sourceMappingURL=Button.stories-a8c445b5.js.map
