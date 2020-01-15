import React from 'react';
import logo from './logo.svg';
import './App.css';
//import 'bootstrap/scss/bootstrap.scss';
import { Container, Row, Col } from 'reactstrap'

import { BrowserRouter as Router, Route } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./form1";
import Step2 from "./form2";
import Result from "./result.js";


createStore({
	data: {}
});

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
        		</p>
			</header>
			<main>
				<div className="py-5 bcform">
					<Container>
						<Row className="d-flex justify-content-center">
							<Col md={12}>
								<StateMachineProvider>
									<Router>
										<Route exact path="/" component={Step1} />
										<Route path="/form2" component={Step2} />
										<Route path="/result" component={Result} />
									</Router>
								</StateMachineProvider>
							</Col>
						</Row>
					</Container>
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
