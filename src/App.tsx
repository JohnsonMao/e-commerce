import Menu, { MenuItem, SubMenu } from './components/Menu';

function App() {
	return (
		<>
			<Menu>
				<MenuItem>Menu 1</MenuItem>
				<SubMenu title="Menu 2">
					<MenuItem>Menu 2-1</MenuItem>
					<MenuItem>Menu 2-2</MenuItem>
				</SubMenu>
				<MenuItem>Menu 3</MenuItem>
			</Menu>
			<Menu mode='vertical' defaultOpenSubMenu={['1']}>
				<MenuItem>Menu 4</MenuItem>
				<SubMenu title="Menu 5">
					<MenuItem>Menu 5-1</MenuItem>
					<MenuItem>Menu 5-2</MenuItem>
				</SubMenu>
				<MenuItem>Menu 6</MenuItem>
			</Menu>
		</>
	);
}

export default App;
