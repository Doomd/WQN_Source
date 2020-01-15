import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
import Link from './link';

let SocialLink = ({Icon}) => (
  <Link to="/" className="mr-2">
    <Icon size={30}/>
  </Link>
)

let FooterLink = ({to, children}) => (
  <li>
    <Link to={to}>
      {children}
    </Link>
  </li>
)

export default () => (
  <footer className="py-5 bg-light">
    <Container>
      <Row>
        <Col>
          <h5>Email</h5>
          <ul>
            <FooterLink to="/contact">contact@WeQuoteNevada.com</FooterLink>
          </ul>
        </Col>
        <Col>
          <h5>Phone</h5>
          <ul>
            <FooterLink to="/contact">702-344-2400</FooterLink>
          </ul>
        </Col>
        <Col>
          <h5>Address</h5>
          <ul>
            <FooterLink to="/contact">2561 Wigwam Parkway<br />Henderson, NV 89074</FooterLink>
          </ul>
        </Col>
        <Col>
          <h5>Social</h5>
          <SocialLink Icon={FaFacebookSquare}/>
          <SocialLink Icon={FaInstagram}/>
          <SocialLink Icon={FaTwitterSquare}/>
          <SocialLink Icon={FaLinkedin}/>
        </Col>
      </Row>
    </Container>
  </footer>
)
