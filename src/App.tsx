import Button, { ButtonVariant, ButtonSize } from './components/Button';

function App() {
	return (
		<>
			<Button variant={ButtonVariant.Primary} size={ButtonSize.Large}>
				Hello world
			</Button>
			<Button variant={ButtonVariant.Secondary} size={ButtonSize.Default}>
				Hello world
			</Button>
			<Button variant={ButtonVariant.Danger} size={ButtonSize.Small}>
				Hello world
			</Button>
			<Button disabled={true}>
				Hello world
			</Button>
			<Button variant={ButtonVariant.Link}>
				Hello world
			</Button>
			<Button variant={ButtonVariant.Link} disabled={true}>
				Hello world
			</Button>
		</>
	);
}

export default App;
