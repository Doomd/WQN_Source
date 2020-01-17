import React from 'react';
//import logo from './logo.svg';
import logo from './we-quote-nevada-logo-pink.svg';
import 'bootstrap/scss/bootstrap.scss';
import { Container, Row, Col } from 'reactstrap'
import "./App.scss";
import Slider from "./slider";
import Footer from "./footer";
import Box from "./box";
import { FaFingerprint, FaCommentDollar, FaCheckDouble } from 'react-icons/fa';

import { Route, HashRouter } from "react-router-dom";
import { StateMachineProvider, createStore } from "little-state-machine";
import Step1 from "./form1";
import Step2 from "./form2";
import Result from "./result.js";


createStore({
    data: {}
});

function Service(props) {
    //alert(props.ri)
    const Icon = props.ri;
    return (
        <Col>
            <Box>
                <Icon size={30} />
                <h4 className="mt-3">{props.title}</h4>
                <p className="mt-3">{props.desc}</p>
            </Box>
        </Col>
    )
}


function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <header className="header">
                    <div className="nav">
                        <a href="/">
                            <div className="branding">
                                <div className="logo"><img src={logo} alt="We Quote Nevada Logo"></img></div>
                                <div className="site-title"><h1>We Quote Nevada</h1></div>
                            </div>
                        </a>
                        <div className="links">call: <a href="tel:720-344-2400">(702) 344-2400</a></div>
                    </div>
                    <div className="slider">

                    </div>
                </header>
                <main className="main">
                    <Slider />
                    <Container className="py-5 how-it-works">
                        <h2 className="text-center mb-4">How It Works With Us</h2>
                        <Row>
                            <Service title="Build a Profile" desc="Tell Us A Little Bit About Yourself and Your Auto" ri={FaFingerprint} />
                            <Service title="Compare Insurance Providers" desc="We Shop Our Carriers and Provide You With a Quote Based on Your Profile" ri={FaCommentDollar} />
                            <Service title="Compare Quotes" desc="We Can Easily Compare Quotes Over the Phone, Through Email, or in the Office" ri={FaCheckDouble} />
                        </Row>
                    </Container>
                    <div className="py-5 bcform">
                        <Container>
                            <Row className="d-flex justify-content-center">
                                <Col md={12}>
                                    <StateMachineProvider>
                                        <HashRouter basename="/">
                                            <Route exact path="/" component={Step1} />
                                            <Route path="/form2" component={Step2} />
                                            <Route path="/result" component={Result} />
                                        </HashRouter>
                                    </StateMachineProvider>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </main>
                <div className="push">&nbsp;</div>
            </div>
            <footer className="footer">
                <Footer />
            </footer>
        </div>
    );
}

export default App;
