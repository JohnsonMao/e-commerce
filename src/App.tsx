import Button from './components/Button';
import Menu, { MenuItem } from './components/Menu';

function App() {
	return (
		<>
			<Menu>
				{
					[1, 2, 3].map((n, i) => (
						<MenuItem key={i}>Menu {n}</MenuItem>
					))
				}
			</Menu>
			<Menu mode='vertical'>
				{
					[4, 5, 6].map((n, i) => (
						<MenuItem key={i}>Menu {n}</MenuItem>
					))
				}
			</Menu>
			<Button variant="primary" size="lg">
				Hello world
			</Button>
			<Button variant="secondary">
				Hello world
			</Button>
			<Button variant="danger" size="sm">
				Hello world
			</Button>
			<Button disabled={true}>
				Hello world
			</Button>
			<Button variant="link">
				Hello world
			</Button>
			<Button variant="link" disabled={true}>
				Hello world
			</Button>
		</>
	);
}

export default App;
