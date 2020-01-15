import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaTwitterSquare } from 'react-icons/fa';
//import Link from './link';

let SocialLink = ({ Icon }) => (
    <a href="/" className="mr-2">
        <Icon size={30} />
    </a>
)

// let FooterLink = ({to, children}) => (
//   <li>
//     <Link to={to}>
//       {children}
//     </Link>
//   </li>
// )

export default () => (
    //   <footer className="py-5 bg-light">
    <Container>
        <Row>
            <Col>
                <h5>Email</h5>
                <ul>
                    <a href="mailto:contact@wequotenevada.com?subject=I was on WeQuoteNevada.com and...">contact@WeQuoteNevada.com</a>
                </ul>
            </Col>
            <Col>
                <h5>Phone</h5>
                <ul>
                    <a href="tel:702-344-2400">702-344-2400</a>
                </ul>
            </Col>
            <Col>
                <h5>Address</h5>
                <ul>
                    <a href="https://www.google.com/maps/place/2561+Wigwam+Pkwy,+Henderson,+NV+89074">2561 Wigwam Parkway<br />Henderson, NV 89074</a>
                </ul>
            </Col>
            <Col>
                <h5>Social</h5>
                <SocialLink Icon={FaFacebookSquare} />
                <SocialLink Icon={FaInstagram} />
                <SocialLink Icon={FaTwitterSquare} />
                <SocialLink Icon={FaLinkedin} />
            </Col>
        </Row>
    </Container >
    //   </footer>
)
