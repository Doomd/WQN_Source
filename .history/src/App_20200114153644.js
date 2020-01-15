import React from 'react';
import logo from './logo.svg';
import './App.css';

import Step1 from "./form1";
import Step2 from "./form2";
import Result from "./result.js";

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
        </p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
        </a>
			</header>
			<main>
				<div>
					<StateMachineProvider>
						<Router>
							<Route exact path="/" component={Step1} />
							<Route path="/bcform2" component={Step2} />
							<Route path="/result" component={Result} />
						</Router>
					</StateMachineProvider>
				</div>
			</main>
			<footer>
				<div>

				</div>
			</footer>
		</div>
	);
}

export default App;
