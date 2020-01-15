import React from 'react';
//import logo from './logo.svg';
import 'bootstrap/scss/bootstrap.scss';
import { Container, Row, Col } from 'reactstrap'
import './App.css';

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
			<div className="wrapper">
				<header className="header">
					<nav className="nav">
						<logo className="logo">

						</logo>
						<links className="links">Home | Contact</links>
					</nav>

				</header>
				<main className="main">
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
				<div className="push">&nbsp;</div>
			</div>
			<footer className="footer">
				<div>

				</div>
			</footer>
		</div>
	);
}

export default App;
